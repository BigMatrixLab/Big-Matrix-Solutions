/**
 * Pre-renders every page in the sitemap to static HTML after `vite build`.
 *
 * Why: the site is a single-page app, so without this every URL serves an
 * empty <div id="root"> and a generic <title>. Google renders JavaScript, but
 * AI crawlers and answer engines (GPTBot, ClaudeBot, PerplexityBot and others)
 * mostly do not, so they saw no content at all. Each page now ships its text,
 * its own title, description, canonical, Open Graph tags and JSON-LD in the
 * HTML. The browser still mounts the app from src/main.jsx as before.
 *
 * Output, using Cloudflare Pages "pretty URLs":
 *   /                -> dist/index.html
 *   /about           -> dist/about.html
 *   /blog/some-post  -> dist/blog/some-post.html
 *   anything else    -> dist/404.html (real 404 status, no soft 404s)
 *   dist/app-shell.html is the untouched app, used by functions/blog/[slug].js
 *
 * Any render error fails the build, so Cloudflare keeps the previous deploy
 * instead of publishing pages that would 404.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SSR_OUT = path.join(ROOT, 'dist-ssr');
const SITE = 'https://big-matrix.com';

const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
    });

/** Markdown the app would fetch from /content, keyed the way contentFile is. */
const loadMarkdown = () => {
    const base = path.join(ROOT, 'public', 'content');
    return Object.fromEntries(
        walk(base)
            .filter((file) => file.endsWith('.md'))
            .map((file) => [path.relative(base, file).split(path.sep).join('/'), fs.readFileSync(file, 'utf8')]),
    );
};

const routesFromSitemap = () =>
    [...fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((m) => m[1].replace(SITE, '') || '/');

const attr = (head, pattern) => {
    const match = head.match(pattern);
    return match ? match[1] : null;
};

const setMeta = (html, key, value) => {
    if (!value) return html;
    const re = new RegExp(`(<meta\\s+(?:property|name)="${key}"\\s+content=")[^"]*(")`);
    return html.replace(re, `$1${value}$2`);
};

const page = (template, { html, title, head }) => {
    const description = attr(head, /<meta[^>]*name="description"[^>]*content="([^"]*)"/);
    const canonical = attr(head, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
    const titleText = attr(title, /<title[^>]*>([^<]*)<\/title>/);

    // The content is in the HTML, so the full-screen preloader would only hide
    // it: pre-rendered pages ship without it, with <body> already "loaded".
    const preloaderStart = template.indexOf('<div id="preloader">');
    const rootStart = template.indexOf('<div id="root">');
    const shell = preloaderStart !== -1 && rootStart > preloaderStart
        ? template.slice(0, preloaderStart) + template.slice(rootStart)
        : template;

    let out = shell
        // Its stylesheet only styles the preloader, so it would just block paint.
        .replace(/<link rel="stylesheet"[^>]*href="\/assets\/preloader-[^"]*\.css"[^>]*>/, '')
        .replace('<body>', '<body class="loaded">')
        .replace(/<title>[^<]*<\/title>/, title)
        .replace('</head>', `${head}</head>`)
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    out = setMeta(out, 'og:title', titleText);
    out = setMeta(out, 'twitter:title', titleText);
    out = setMeta(out, 'og:description', description);
    out = setMeta(out, 'twitter:description', description);
    out = setMeta(out, 'og:url', canonical);
    out = setMeta(out, 'twitter:url', canonical);
    return out;
};

const main = async () => {
    // Dependencies are bundled (noExternal) because some, such as
    // react-helmet-async, are CommonJS and cannot be imported by name from Node.
    await build({
        logLevel: 'error',
        ssr: { noExternal: true },
        build: { ssr: 'src/entry-server.jsx', outDir: SSR_OUT, emptyOutDir: true },
    });

    globalThis.__BM_MARKDOWN__ = loadMarkdown();
    const { render } = await import(pathToFileURL(path.join(SSR_OUT, 'entry-server.js')).href);
    const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

    const routes = routesFromSitemap();
    const failed = [];
    for (const route of routes) {
        try {
            const target = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route}.html`);
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, page(template, await render(route)));
        } catch (err) {
            failed.push(`${route}: ${err.message}`);
        }
    }

    // Unknown URLs get the not-found page with a real 404 status.
    fs.writeFileSync(path.join(DIST, '404.html'), page(template, await render('/__not-found__')));
    // The empty app, for blog posts that go live between builds
    // (functions/blog/[slug].js serves it with a 200).
    fs.writeFileSync(path.join(DIST, 'app-shell.html'), template);
    fs.rmSync(SSR_OUT, { recursive: true, force: true });

    if (failed.length) {
        console.error(`prerender: ${failed.length} route(s) failed\n${failed.join('\n')}`);
        process.exit(1);
    }
    console.log(`prerender: ${routes.length} routes + 404.html`);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
