import { useRef, useState } from 'react';

/**
 * Social sharing for blog posts, matching the share feature on the R&D Lab
 * site: Facebook, LinkedIn and X open their share pages; Instagram has no web
 * share target, so the caption is copied for pasting into the app instead.
 *
 * Share URLs are always the production domain, never the current origin, so a
 * post shared from a preview or local build still links to the live site.
 */
const SITE = 'https://big-matrix.com';

const POPUP = 'noopener,noreferrer,width=700,height=600';

export const blogShareUrl = (post) => `${SITE}/blog/${post.slug}`;

export const shareCaption = (post) => {
    const summary = post.desc ? `\n\n${post.desc}` : '';
    return `${post.title || ''}${summary}\n\nRead more on Big-Matrix Solutions' website ${blogShareUrl(post)}`;
};

/** Clipboard writes fail outside secure contexts; sharing should still work. */
export const copyShareCaption = (post) => {
    try {
        navigator.clipboard?.writeText(shareCaption(post));
    } catch {
        /* noop */
    }
};

export const shareOnFacebook = (post) => {
    copyShareCaption(post);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        blogShareUrl(post)
    )}&quote=${encodeURIComponent(shareCaption(post))}`;
    window.open(url, '_blank', POPUP);
};

/** LinkedIn's offsite share ignores prefilled text, so the caption is copied. */
export const shareOnLinkedIn = (post) => {
    copyShareCaption(post);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        blogShareUrl(post)
    )}`;
    window.open(url, '_blank', POPUP);
};

export const shareOnX = (post) => {
    const text = `${post.title || ''}${post.desc ? ` — ${post.desc}` : ''}`;
    const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        blogShareUrl(post)
    )}`;
    window.open(url, '_blank', POPUP);
};

export const shareOnInstagram = (post) => {
    copyShareCaption(post);
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
};

/**
 * Open/close state for the share dialog plus the "caption copied" notice.
 * Opening the dialog copies the caption straight away, as on the Lab site.
 */
export const useShareDialog = () => {
    const [post, setPost] = useState(null);
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    const flashCopied = () => {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 4000);
    };

    const open = (target) => {
        copyShareCaption(target);
        flashCopied();
        setPost(target);
    };

    const close = () => setPost(null);

    return { post, copied, open, close };
};
