/**
 * Blog image pipeline.
 *
 * Default (runs in `dev` and `build`): makes a 640px WebP thumbnail of every
 * post's cover at public/assets/images/blog/thumbs/<name>.webp. Cards and
 * sidebar lists show covers at a few hundred pixels, so loading the full
 * 1600px original there was most of the blog index's weight. Thumbnails that
 * are already newer than their source are left alone, so this is quick.
 *
 * `--optimise` (run by hand when adding heavy images): re-encodes raster images
 * in public/assets/images/blog to WebP, at most 1600px wide, and rewrites every
 * reference in src/content/blogs. A file is only replaced when the WebP is at
 * least 20% smaller. Animated images and SVG diagrams are skipped.
 *
 *   node scripts/blog-images.js             thumbnails only
 *   node scripts/blog-images.js --optimise  also shrink the originals
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync, unlinkSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const BLOGS = join(root, 'src', 'content', 'blogs');
const IMAGES = join(root, 'public', 'assets', 'images', 'blog');
const THUMBS = join(IMAGES, 'thumbs');
const WEB_PREFIX = '/assets/images/blog/';

// sharp caches open files; on Windows that handle blocks rewriting the same
// path (EBUSY/UNKNOWN). Every input is read into a buffer first as well.
sharp.cache(false);

const THUMB_WIDTH = 640;
const MAX_WIDTH = 1600;
const RASTER = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

/** Same rule the site uses: /assets/images/blog/x.png -> /assets/images/blog/thumbs/x.webp */
export const thumbPathFor = (webPath) =>
    `${WEB_PREFIX}thumbs/${basename(webPath, extname(webPath))}.webp`;

const posts = () =>
    readdirSync(BLOGS)
        .filter((name) => name.endsWith('.md'))
        .map((name) => join(BLOGS, name));

const coverOf = (file) => {
    const match = readFileSync(file, 'utf-8').match(/^image:\s*"([^"]+)"/m);
    return match ? match[1] : null;
};

const isAnimated = async (input) => ((await sharp(input, { animated: true }).metadata()).pages || 1) > 1;

async function makeThumbnails() {
    mkdirSync(THUMBS, { recursive: true });
    let made = 0;
    let kept = 0;
    const seen = new Set();

    for (const file of posts()) {
        const cover = coverOf(file);
        if (!cover || !cover.startsWith(WEB_PREFIX) || !RASTER.has(extname(cover).toLowerCase())) continue;
        if (seen.has(cover)) continue;
        seen.add(cover);

        const source = join(root, 'public', cover);
        if (!existsSync(source)) continue;
        const target = join(root, 'public', thumbPathFor(cover));
        if (existsSync(target) && statSync(target).mtimeMs >= statSync(source).mtimeMs) {
            kept += 1;
            continue;
        }
        // First frame only: a card thumbnail does not need to animate.
        await sharp(readFileSync(source), { pages: 1 })
            .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
            .webp({ quality: 78, effort: 5 })
            .toFile(target);
        made += 1;
    }
    console.log(`blog thumbnails: ${made} made, ${kept} up to date`);
}

/** Rewrites image references in every post, keeping its line endings as they are. */
const rewriteReferences = (renames) => {
    let touched = 0;
    for (const file of posts()) {
        const text = readFileSync(file, 'utf-8');
        let next = text;
        for (const [from, to] of renames) next = next.split(from).join(to);
        if (next !== text) {
            writeFileSync(file, next);
            touched += 1;
        }
    }
    return touched;
};

async function optimiseOriginals() {
    // Pass 1: encode everything in memory. Nothing on disk changes yet.
    const jobs = [];
    for (const name of readdirSync(IMAGES)) {
        const ext = extname(name).toLowerCase();
        const source = join(IMAGES, name);
        if (!RASTER.has(ext) || ext === '.gif' || !statSync(source).isFile()) continue;

        const input = readFileSync(source);
        if (await isAnimated(input)) continue;

        const meta = await sharp(input).metadata();
        // Figures and charts are mostly PNGs with fine text: encode those a
        // notch higher so labels stay crisp.
        const quality = meta.format === 'png' ? 90 : 82;
        const output = await sharp(input)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality, effort: 6, smartSubsample: true })
            .toBuffer();

        if (output.length > input.length * 0.8) continue;
        jobs.push({ name, source, before: input.length, output });
    }

    // Pass 2: write. References are rewritten in `finally`, so even if a write
    // fails partway, every image already renamed is still linked correctly.
    const renames = new Map();
    let before = 0;
    let after = 0;
    try {
        for (const job of jobs) {
            const targetName = `${basename(job.name, extname(job.name))}.webp`;
            writeFileSync(join(IMAGES, targetName), job.output);
            if (targetName !== job.name) {
                renames.set(`${WEB_PREFIX}${job.name}`, `${WEB_PREFIX}${targetName}`);
                unlinkSync(job.source);
            }
            before += job.before;
            after += job.output.length;
        }
    } finally {
        const touched = rewriteReferences(renames);
        const mb = (n) => (n / 1024 / 1024).toFixed(1);
        console.log(`optimised ${jobs.length} images: ${mb(before)} MB -> ${mb(after)} MB; ${renames.size} renamed, ${touched} posts updated`);
    }
}

if (process.argv.includes('--optimise')) await optimiseOriginals();
await makeThumbnails();
