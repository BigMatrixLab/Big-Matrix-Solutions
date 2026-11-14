/**
 * JSON-LD builders for the schema.org markup in <Seo>.
 *
 * These are what let Google show an article's date and image in the results,
 * and render a breadcrumb trail under a URL instead of the raw path. Plain
 * objects here, serialised by the Seo component, so the shape stays testable
 * and no JSX escaping is involved.
 *
 * On authorship: posts deliberately carry no byline, so the organisation is
 * the author. Article rich results require an `author`, and naming the lab is
 * both accurate and consistent with how the posts sign their own quotes.
 */

const SITE = 'https://big-matrix.com';
const BRAND = 'Big-Matrix Solutions';
const LOGO = `${SITE}/assets/images/big_matrix_cube.png`;

/** `#org` is a stable node id, so every other block can reference the same
 *  organisation instead of restating it. */
export const ORG_ID = `${SITE}/#org`;

const absolute = (url) => {
    if (!url) return undefined;
    return /^https?:\/\//i.test(url) ? url : `${SITE}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * ISO date, or undefined when the source value will not parse.
 *
 * Deliberately date-only. Posts are scheduled by day, not by time, and a full
 * timestamp would be built from local midnight — which converts to the
 * *previous* day in UTC for anywhere east of Greenwich, so "Oct 06" would be
 * published to Google as Oct 05. schema.org accepts a bare date.
 */
const isoDate = (value) => {
    const at = Date.parse(value);
    if (Number.isNaN(at)) return undefined;
    const d = new Date(at);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** Drops undefined values so they never reach the serialised output. */
const compact = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null));

export const organisation = () => ({
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND,
    legalName: 'Big-Matrix Solutions Ltd.',
    url: SITE,
    logo: LOGO,
    description:
        'Research and development lab building production AI systems for healthcare, industry and public infrastructure.',
    // Kept in step with SOCIAL_LINKS in src/components/FooterArea.jsx.
    sameAs: [
        'https://www.linkedin.com/company/big-matrix-solutions/',
        'https://www.facebook.com/BigMatrix.Solutions',
    ],
});

export const website = () => ({
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: BRAND,
    publisher: { '@id': ORG_ID },
});

/**
 * Breadcrumb trail. `trail` is an array of `{ name, path }` from the top of
 * the hierarchy down; the last entry is the current page.
 */
export const breadcrumbs = (trail) => ({
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        item: `${SITE}${path}`,
    })),
});

export const blogPosting = (post) =>
    compact({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.desc,
        image: absolute(post.image),
        datePublished: isoDate(post.date),
        dateModified: isoDate(post.date),
        keywords: post.tags?.length ? post.tags.join(', ') : undefined,
        articleSection: post.category,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    });

export const service = (item) =>
    compact({
        '@type': 'Service',
        name: item.title,
        description: item.desc,
        image: absolute(item.image),
        serviceType: item.category,
        provider: { '@id': ORG_ID },
        url: `${SITE}/service/${item.slug}`,
    });

/** Wraps blocks into one `@graph` document, which is how multiple entities
 *  share node references on a single page. */
export const graph = (...blocks) => ({
    '@context': 'https://schema.org',
    '@graph': blocks.flat().filter(Boolean),
});
