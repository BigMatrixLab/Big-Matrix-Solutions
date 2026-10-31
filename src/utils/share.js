import { useState } from 'react';

/**
 * Social sharing for blog posts.
 *
 * What each platform allows a website to prefill:
 *   - X: post text and link, via the intent URL.
 *   - LinkedIn: post text (with the link inside it) via the feed composer. The
 *     older share-offsite URL takes a link only and ignores any text.
 *   - Facebook: nothing in the post body. Its policy forbids prefilling the
 *     user's message; `quote` attaches a quote where it is still honoured. The
 *     caption goes to the clipboard so it can be pasted with Ctrl+V.
 *   - Instagram: no web share target at all, so copy and open.
 *
 * Share URLs are always the production domain, never the current origin, so a
 * post shared from a preview or local build still links to the live site.
 */
const SITE = 'https://big-matrix.com';

const POPUP = 'noopener,noreferrer,width=700,height=640';

/** X shortens every link to 23 characters, whatever its real length. */
const X_LIMIT = 280;
const X_LINK = 23;

export const blogShareUrl = (post) => `${SITE}/blog/${post.slug}`;

/** "AI Agents" -> "#AIAgents". Up to three, taken from the post's tags. */
const hashtags = (post, limit = 3) => {
    const tags = Array.isArray(post.tags) ? post.tags : [];
    return tags
        .map((tag) => String(tag).replace(/[^A-Za-z0-9]+(.)?/g, (_, next) => (next ? next.toUpperCase() : '')))
        .filter((tag) => tag && /[A-Za-z]/.test(tag))
        .slice(0, limit)
        .map((tag) => `#${tag.charAt(0).toUpperCase()}${tag.slice(1)}`);
};

/** The default caption: hook, summary, call to action with the link, tags. */
export const shareCaption = (post) => {
    const parts = [post.title];
    if (post.desc) parts.push(post.desc);
    parts.push(`Read more on our website: ${blogShareUrl(post)}`);
    const tags = hashtags(post).join(' ');
    if (tags) parts.push(tags);
    return parts.filter(Boolean).join('\n\n');
};

/** Clipboard writes fail outside secure contexts; sharing should still work. */
export const copyText = (text) => {
    try {
        navigator.clipboard?.writeText(text);
        return true;
    } catch {
        return false;
    }
};

export const shareOnFacebook = (post, caption = shareCaption(post)) => {
    copyText(caption);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        blogShareUrl(post)
    )}&quote=${encodeURIComponent(caption)}`;
    window.open(url, '_blank', POPUP);
};

export const shareOnLinkedIn = (post, caption = shareCaption(post)) => {
    copyText(caption);
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(caption)}`;
    window.open(url, '_blank', POPUP);
};

/**
 * X gets a short version: the caption's first paragraph (the hook) plus the
 * hashtags, trimmed so the whole post with its link fits in 280 characters.
 * The link is passed separately so X builds the preview card from it.
 */
export const shareOnX = (post, caption = shareCaption(post)) => {
    const link = blogShareUrl(post);
    const paragraphs = caption
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p && !p.includes(link));
    const hook = paragraphs.find((p) => !p.startsWith('#')) || post.title || '';
    const tags = paragraphs.find((p) => p.startsWith('#')) || hashtags(post, 2).join(' ');

    const room = X_LIMIT - X_LINK - 1;
    let text = tags ? `${hook}\n\n${tags}` : hook;
    if (text.length > room) {
        const hookRoom = room - (tags ? tags.length + 2 : 0);
        text = hookRoom > 20 ? `${hook.slice(0, hookRoom - 1).trimEnd()}…${tags ? `\n\n${tags}` : ''}` : `${hook.slice(0, room - 1).trimEnd()}…`;
    }

    const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`;
    window.open(url, '_blank', POPUP);
};

export const shareOnInstagram = (post, caption = shareCaption(post)) => {
    copyText(caption);
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
};

/**
 * Open/close state for the share dialog. Opening it copies the caption straight
 * away, so it is already on the clipboard whichever target is picked.
 */
export const useShareDialog = () => {
    const [post, setPost] = useState(null);

    const open = (target) => {
        copyText(shareCaption(target));
        setPost(target);
    };

    const close = () => setPost(null);

    return { post, open, close };
};
