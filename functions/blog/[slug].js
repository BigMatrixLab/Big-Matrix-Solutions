/**
 * GET /blog/:slug — per-post link previews.
 *
 * The page itself is the normal single-page app; this only rewrites the
 * Open Graph and Twitter tags in index.html so a link shared on Facebook,
 * LinkedIn or X shows the post's title, summary and cover instead of the
 * site-wide card. Those crawlers do not run JavaScript, so the tags React sets
 * in the browser never reach them.
 *
 * Post data comes from /og/blog.json, built by scripts/generate-og-manifest.js.
 * A post dated in the future keeps the generic card until its publish date, the
 * same rule the browser applies, so scheduled titles are not previewed early.
 * Anything unexpected falls back to the untouched page.
 */

/* global HTMLRewriter */

const SITE = 'https://big-matrix.com';

const isLive = (post) => {
    const at = Date.parse(post.date);
    return Number.isNaN(at) || at <= Date.now();
};

export async function onRequestGet({ request, params, env, next }) {
    const response = await next();
    const type = response.headers.get('content-type') || '';
    if (!response.ok || !type.includes('text/html')) return response;

    let post;
    try {
        const manifest = await env.ASSETS.fetch(new URL('/og/blog.json', request.url));
        if (!manifest.ok) return response;
        post = (await manifest.json())[params.slug];
    } catch {
        return response;
    }
    if (!post || !post.title || !isLive(post)) return response;

    const url = `${SITE}/blog/${params.slug}`;
    const title = `${post.title} | Big-Matrix Solutions`;
    const values = {
        'og:type': 'article',
        'og:url': url,
        'og:title': post.title,
        'og:description': post.description,
        'og:image': post.image,
        'og:image:secure_url': post.image,
        'og:image:type': post.imageType,
        'og:image:width': post.width,
        'og:image:height': post.height,
        'og:image:alt': post.title,
        'twitter:url': url,
        'twitter:title': post.title,
        'twitter:description': post.description,
        'twitter:image': post.image,
        'twitter:image:alt': post.title,
    };

    const set = (key) => ({
        element(el) {
            const value = values[key];
            if (value === null || value === undefined || value === '') el.remove();
            else el.setAttribute('content', String(value));
        },
    });

    // No <meta name="description"> here: Seo.jsx adds one in the browser, and a
    // second copy would duplicate it for search engines that render JavaScript.
    let rewriter = new HTMLRewriter().on('title', { element: (el) => el.setInnerContent(title) });

    for (const key of Object.keys(values)) {
        const attr = key.startsWith('twitter:') ? 'name' : 'property';
        rewriter = rewriter.on(`meta[${attr}="${key}"]`, set(key));
    }

    const rewritten = rewriter.transform(response);
    const headers = new Headers(rewritten.headers);
    // Previews are cached by the platforms anyway; keep the edge copy short so
    // a post going live, or a corrected cover, shows up within minutes.
    headers.set('cache-control', 'public, max-age=0, s-maxage=300');
    return new Response(rewritten.body, { status: rewritten.status, headers });
}
