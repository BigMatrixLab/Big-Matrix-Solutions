/** "Feb 14, 2026" -> comparable timestamp; unparseable dates sort last. */
const timeOf = (post) => {
    const value = Date.parse(post.date);
    return Number.isNaN(value) ? 0 : value;
};

/** Higher id = added later. Used only to break same-day ties. */
const idOf = (post) => {
    const value = Number(post.id);
    return Number.isFinite(value) ? value : -Infinity;
};

/**
 * Newest publish date first. Returns a new array.
 *
 * Off-cadence posts (a release write-up dropped beside a scheduled one) can
 * share a date, so ties fall back to id descending — the most recently added
 * post leads. Without that, `loadContent`'s id-ascending order would surface
 * the older entry first.
 */
export const sortBlogsByDate = (posts) =>
    [...posts].sort((a, b) => timeOf(b) - timeOf(a) || idOf(b) - idOf(a));
