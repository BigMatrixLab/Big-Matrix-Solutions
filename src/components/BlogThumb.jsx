import React from 'react';

const PREFIX = '/assets/images/blog/';

/**
 * /assets/images/blog/x.png -> /assets/images/blog/thumbs/x.webp, the 640px
 * copy made by scripts/blog-images.js. Anything else (external URLs, SVGs) is
 * returned unchanged.
 */
const blogThumbSrc = (src) => {
    if (!src || !src.startsWith(PREFIX) || src.endsWith('.svg')) return src;
    const name = src.slice(PREFIX.length).replace(/\.[^.]+$/, '');
    return name.includes('/') ? src : `${PREFIX}thumbs/${name}.webp`;
};

/**
 * Cover image for cards and lists, where it shows at a few hundred pixels.
 * Falls back to the full cover if the thumbnail is missing, e.g. a post added
 * without the image script having run.
 */
const BlogThumb = ({ src, alt = '', ...rest }) => (
    <img
        src={blogThumbSrc(src)}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(event) => {
            if (src && event.currentTarget.getAttribute('src') !== src) event.currentTarget.src = src;
        }}
        {...rest}
    />
);

export default BlogThumb;
