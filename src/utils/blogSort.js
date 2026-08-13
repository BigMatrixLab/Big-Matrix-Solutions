/** "Feb 14, 2026" -> comparable timestamp; unparseable dates sort last. */
const timeOf = (post) => {
    const value = Date.parse(post.date);
    return Number.isNaN(value) ? 0 : value;
};

/** Newest publish date first. Returns a new array. */
export const sortBlogsByDate = (posts) =>
    [...posts].sort((a, b) => timeOf(b) - timeOf(a));
