/**
 * Builds public/og/blog.json: the title, description and preview image of
 * every blog post, keyed by slug.
 *
 * Why: the site is a single-page app, and the crawlers behind Facebook,
 * LinkedIn and X do not run JavaScript, so they only ever saw the generic tags
 * in index.html. functions/blog/[slug].js reads this file and rewrites those
 * tags per post before the HTML leaves Cloudflare.
 *
 * Every post is listed, scheduled ones included; the function decides at
 * request time whether a post is live yet, so a scheduled post gets its own
 * preview on its publish day without a rebuild. Nothing here is new exposure:
 * the same fields are already public in /content/blogs/*.md.
 *
 * Preview image: public/assets/images/og/<slug>.jpg when it exists (1200x630,
 * made by scripts/make-og-images.py), otherwise the post's cover.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://big-matrix.com';

/** Minimal frontmatter reader: flat `key: value` pairs, quotes stripped. */
const frontmatter = (raw) => {
    const block = raw.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!block) return {};
    const out = {};
    for (const line of block[1].split(/\r?\n/)) {
        const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
        if (pair) out[pair[1]] = pair[2].trim().replace(/^["']|["']$/g, '');
    }
    return out;
};

const TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };

/** Reads width/height from a PNG, JPEG, GIF or WebP header; null if unknown. */
const imageSize = (file) => {
    const b = readFileSync(file);
    if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
    if (b.toString('ascii', 0, 3) === 'GIF') return [b.readUInt16LE(6), b.readUInt16LE(8)];
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
        const kind = b.toString('ascii', 12, 16);
        if (kind === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
        if (kind === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
        if (kind === 'VP8L') {
            const bits = b.readUInt32LE(21);
            return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
        }
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
        let i = 2;
        while (i < b.length) {
            const marker = b[i + 1];
            const length = b.readUInt16BE(i + 2);
            if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
                return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
            }
            i += 2 + length;
        }
    }
    return null;
};

export function generateOgManifest() {
    const dir = join(root, 'src', 'content', 'blogs');
    const posts = {};

    for (const name of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
        const meta = frontmatter(readFileSync(join(dir, name), 'utf-8'));
        if (!meta.slug || meta.draft === 'true') continue;

        const ogPath = `/assets/images/og/${meta.slug}.jpg`;
        const image = existsSync(join(root, 'public', ogPath)) ? ogPath : meta.image;
        const local = image && image.startsWith('/') ? join(root, 'public', image) : null;
        const size = local && existsSync(local) ? imageSize(local) : null;
        const ext = (image || '').split('.').pop().toLowerCase();

        posts[meta.slug] = {
            title: meta.title,
            description: meta.desc || '',
            date: meta.date || '',
            image: image ? (image.startsWith('http') ? image : `${SITE}${image}`) : null,
            imageType: TYPES[ext] || null,
            width: size ? size[0] : null,
            height: size ? size[1] : null,
        };
    }

    const outDir = join(root, 'public', 'og');
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'blog.json'), JSON.stringify(posts));
    console.log(`og manifest: ${Object.keys(posts).length} posts`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    generateOgManifest();
}
