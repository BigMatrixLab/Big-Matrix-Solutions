/**
 * Builds public/sitemap.xml, public/robots.txt and public/llms.txt.
 *
 * llms.txt (https://llmstxt.org) is a Markdown map of the site for AI
 * assistants and answer engines: who the company is, its key facts, and links
 * to every product, solution, policy and live article with a one-line summary.
 *
 * Runs at build time, before `vite build`, so both files land in dist as
 * ordinary public assets.
 *
 * One thing to know about the blog: the publication gate in
 * src/utils/publishSchedule.js runs in the browser, comparing each post's
 * `date` against the visitor's clock. This script has to make the same call at
 * build time, so a scheduled post is written into the sitemap only once its
 * date has arrived *as of the build*. A post that goes live on its own next
 * Friday will not be in the sitemap until the site is rebuilt after that date.
 *
 * Rebuilding on a schedule (a weekly CI job is enough, matching the editorial
 * cadence) keeps the two in step. Without a rebuild the post is still live and
 * still reachable by link — it is just not advertised in the sitemap yet.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://big-matrix.com';

/** Minimal frontmatter reader: flat `key: value` pairs, quotes stripped. */
const frontmatter = (raw) => {
    // Some content files carry a UTF-8 BOM; without stripping it the opening
    // `---` does not match and the whole file is silently skipped.
    const block = raw.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!block) return {};
    const out = {};
    for (const line of block[1].split(/\r?\n/)) {
        const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
        if (pair) out[pair[1]] = pair[2].trim().replace(/^["']|["']$/g, '');
    }
    return out;
};

const readContent = (dir) => {
    const full = join(root, 'src', 'content', dir);
    if (!existsSync(full)) return [];
    return readdirSync(full)
        .filter((name) => name.endsWith('.md'))
        .map((name) => frontmatter(readFileSync(join(full, name), 'utf-8')))
        .filter((meta) => meta.slug);
};

/** Same rule as publishSchedule.isPublished: drafts out, future dates out,
 *  unparseable dates fail open. */
const startOfToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

const isLive = (post, asOf) => {
    if (post.draft === 'true' || post.draft === true) return false;
    const at = Date.parse(post.date);
    return Number.isNaN(at) ? true : at <= asOf;
};

/** ISO date, or null when the source date is not parseable. */
const isoDay = (value) => {
    const at = Date.parse(value);
    return Number.isNaN(at) ? null : new Date(at).toISOString().slice(0, 10);
};

const line = (title, path, summary) => `- [${title}](${SITE}${path})${summary ? `: ${summary}` : ''}`;

/** llms.txt: H1, summary blockquote, key facts, then linked sections. */
const llmsTxt = ({ projects, services, posts }) => {
    const { company, documents } = JSON.parse(readFileSync(join(root, 'src', 'data', 'legal.json'), 'utf-8'));
    const about = documents.find((doc) => doc.slug === 'about-us');
    const policies = documents.filter((doc) => doc.slug !== 'about-us');
    const byTitle = (a, b) => a.title.localeCompare(b.title);

    return `# ${company.name}

> ${about.intro[0]}

Key facts:

- Legal name: ${company.legalName}
- Trade licence: ${company.tradeLicenseNo} (${company.tradeLicenseAuthority})
- Registered office: ${company.address}
- Email: ${company.email}
- Phone: ${company.phone}
- Website: ${company.website}
- What we do: AI diagnostics, hospital systems, SaaS platforms, industrial automation and software development services, sold and delivered online.
- Refunds: approved refunds are completed within 7 to 10 working days.

## Company

${line('About Big-Matrix Solutions', '/about', 'who we are, what we offer and company details')}
${line('Frequently asked questions', '/faqs', 'short answers about our products, payments, refunds, delivery and support')}
${line('Contact', '/contact', 'email, phone and registered office')}
${line('Careers', '/careers', 'open roles')}

## Products

${projects.slice().sort(byTitle).map((p) => line(p.title, `/project/${p.slug}`, p.desc)).join('\n')}

## Solutions

${services.slice().sort(byTitle).map((s) => line(s.title, `/service/${s.slug}`, s.desc)).join('\n')}

## Policies

${policies.map((doc) => line(doc.title, `/${doc.slug}`, doc.description)).join('\n')}

## Optional

${posts.map((p) => line(p.title, `/blog/${p.slug}`, p.desc)).join('\n')}
`;
};

export function generateSitemap() {
    const asOf = startOfToday();
    const urls = [];
    const add = (path, lastmod) => urls.push({ path, lastmod: lastmod || null });

    // Static routes. /403, /500 and the 404 handler are noindex and stay out.
    //
    // /mission is also withheld: it is an unfinished page left over from the
    // purchased template, with placeholder copy and seven images that are not in
    // the repository. Add it back once it carries real content, and drop
    // `noindex` from the page.
    ['/', '/about', '/service', '/project', '/blog', '/careers', '/contact', '/faqs', '/terms-and-conditions', '/privacy-policy', '/refund-policy', '/delivery-policy']
        .forEach((path) => add(path));

    const services = readContent('services');
    const projects = readContent('projects');
    services.forEach((s) => add(`/service/${s.slug}`));
    projects.forEach((p) => add(`/project/${p.slug}`));

    const posts = readContent('blogs');
    const live = posts.filter((post) => isLive(post, asOf));
    live.forEach((post) => add(`/blog/${post.slug}`, isoDay(post.date)));

    // Careers: an expired listing is set to noindex by the page, so it is
    // excluded here too.
    const careersFile = join(root, 'src', 'data', 'careers.json');
    let openRoles = 0;
    if (existsSync(careersFile)) {
        const jobs = JSON.parse(readFileSync(careersFile, 'utf-8'));
        jobs.forEach((job) => {
            const deadline = Date.parse(job.deadline);
            const expired = !Number.isNaN(deadline) && deadline < asOf;
            if (job.slug && !expired) {
                add(`/careers/${job.slug}`);
                openRoles += 1;
            }
        });
    }

    const body = urls
        .map(({ path, lastmod }) => {
            const loc = `${SITE}${path}`;
            const stamp = lastmod ? `\n        <lastmod>${lastmod}</lastmod>` : '';
            return `    <url>\n        <loc>${loc}</loc>${stamp}\n    </url>`;
        })
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.js. Do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

    // AI crawlers are named explicitly so it is clear they are welcome; the
    // rules are the same as for everyone else.
    const AI_BOTS = [
        'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
        'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot',
    ];
    const robots = `# Generated by scripts/generate-sitemap.js. Do not edit by hand.
User-agent: *
${AI_BOTS.map((bot) => `User-agent: ${bot}`).join('\n')}
Allow: /

# Preview mode reveals scheduled posts before their publish date.
Disallow: /*?preview=

Sitemap: ${SITE}/sitemap.xml
`;

    writeFileSync(join(root, 'public', 'sitemap.xml'), xml, 'utf-8');
    writeFileSync(join(root, 'public', 'robots.txt'), robots, 'utf-8');
    writeFileSync(join(root, 'public', 'llms.txt'), llmsTxt({ projects, services, posts: live }), 'utf-8');

    const queued = posts.length - live.length;
    console.log(
        `Sitemap: ${urls.length} URLs (${live.length} posts live, ${queued} scheduled and withheld, ${openRoles} open roles)`
    );
}

generateSitemap();
