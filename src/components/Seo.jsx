import { Helmet } from 'react-helmet-async';

/**
 * Per-page title, description and canonical URL.
 *
 * Why this exists: `index.html` used to carry a single hard-coded
 * `<link rel="canonical" href="https://big-matrix.com/">`, which told Google
 * that every blog post, service and project page was a duplicate of the
 * homepage. That suppresses indexing of the entire content library. Those two
 * tags now live here instead, one per route.
 *
 * The Open Graph and Twitter tags stay in `index.html` on purpose: social
 * scrapers do not execute JavaScript, so anything Helmet renders is invisible
 * to them. Googlebot does render, which is why canonical and description work
 * from here.
 *
 * Helmet replaces `document.title` outright, so there is no duplicate-title
 * risk. Meta and link tags would duplicate against static ones, which is why
 * the static description and canonical were removed from `index.html`.
 */

const SITE = 'https://big-matrix.com';
const BRAND = 'Big-Matrix Solutions';
const TITLE_MAX = 62;

const DEFAULT_DESCRIPTION =
    'We build advanced software ecosystems: AI-powered medical diagnostics, hospital systems, industrial automation and predictive analytics.';

/** Trim to a length search engines actually display, without cutting mid-word. */
const clamp = (text, max) => {
    if (!text) return text;
    const clean = String(text).replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    const cut = clean.slice(0, max);
    return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/**
 * @param title      Page title without the brand. Omit on the homepage.
 * @param description Meta description. Falls back to the site default.
 * @param path        Route path, e.g. `/blog/my-post`. Defaults to `/`.
 * @param noindex     Set on error pages and anything that should stay out of search.
 * @param schema      JSON-LD object from src/utils/structuredData.js. Rendered
 *                    as one application/ld+json block.
 */
const Seo = ({ title, description, path = '/', noindex = false, schema }) => {
    // ~60 characters is the practical SERP limit. Short titles get the brand
    // suffix for recognition; a long article headline is more useful than the
    // brand, so it stands alone rather than being truncated to make room.
    const room = TITLE_MAX - BRAND.length - 3;
    const pageTitle = !title
        ? `${BRAND} — AI systems for healthcare and industry`
        : title.length <= room
          ? `${title} — ${BRAND}`
          : clamp(title, TITLE_MAX);
    const canonical = `${SITE}${path === '/' ? '/' : path.replace(/\/+$/, '')}`;

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={clamp(description, 158) || DEFAULT_DESCRIPTION} />
            {/* A noindex page declares no canonical: on a not-found route the
                URL does not resolve, so pointing at it would be a claim about
                a page that is not there. */}
            {noindex ? (
                <meta name="robots" content="noindex, follow" />
            ) : (
                <link rel="canonical" href={canonical} />
            )}
            {/* Helmet needs the JSON-LD as a string child, not an object. */}
            {schema && (
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            )}
        </Helmet>
    );
};

export default Seo;
