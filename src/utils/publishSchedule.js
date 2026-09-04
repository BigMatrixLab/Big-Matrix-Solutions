/**
 * Editorial schedule gate for blog posts.
 *
 * A post's `date` frontmatter is its publish date, not just a label. The
 * content directory can therefore hold a scheduled backlog: each post stays
 * off the site until its date arrives, then appears on its own, with no
 * deploy and no file edit in between.
 *
 * Two escape hatches:
 *   - `draft: "true"` in frontmatter hides a post regardless of its date.
 *   - `?preview=1` in the URL reveals scheduled posts for review. See
 *     `usePreviewMode`.
 *
 * A missing or malformed date fails *open* (the post shows). A typo in a date
 * should surface as a wrong sort position, not as content that silently
 * disappears from the site.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PREVIEW_KEY = 'bm:blog-preview';

/** "Feb 14, 2026" -> ms timestamp. NaN when absent or unparseable. */
export const publishTimeOf = (post) => Date.parse(post?.date);

/**
 * Midnight local time today. Comparing against the start of the day rather
 * than the current instant means a post dated today is live all day, instead
 * of appearing at some arbitrary hour.
 */
export const startOfToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

const isDraft = (post) => post?.draft === true || post?.draft === 'true';

/** Has this post's publish date arrived? */
export const isPublished = (post, asOf = startOfToday()) => {
    if (isDraft(post)) return false;
    const at = publishTimeOf(post);
    return Number.isNaN(at) ? true : at <= asOf;
};

/** Dated in the future — queued, but not a draft. */
export const isScheduled = (post, asOf = startOfToday()) => {
    if (isDraft(post)) return false;
    const at = publishTimeOf(post);
    return !Number.isNaN(at) && at > asOf;
};

/**
 * The posts a visitor may see. `includeScheduled` is the preview override;
 * drafts stay hidden either way.
 */
export const visibleBlogs = (posts, { includeScheduled = false, asOf } = {}) => {
    const cutoff = asOf ?? startOfToday();
    return posts.filter((post) =>
        includeScheduled ? !isDraft(post) : isPublished(post, cutoff)
    );
};

/** Days until publication; 0 once live. Used for the preview badge. */
export const daysUntilPublish = (post, asOf = startOfToday()) => {
    const at = publishTimeOf(post);
    if (Number.isNaN(at) || at <= asOf) return 0;
    return Math.ceil((at - asOf) / 86400000);
};

const readStoredPreview = () => {
    try {
        return sessionStorage.getItem(PREVIEW_KEY) === '1';
    } catch {
        // Private mode, or site data blocked — preview just stays off.
        return false;
    }
};

const writeStoredPreview = (on) => {
    try {
        if (on) sessionStorage.setItem(PREVIEW_KEY, '1');
        else sessionStorage.removeItem(PREVIEW_KEY);
    } catch {
        // Non-fatal: preview then lasts only as long as the query param.
    }
};

/**
 * Preview mode for reviewing the scheduled queue.
 *
 * `?preview=1` turns it on and remembers it for the tab, so you can browse
 * between the index and a post without re-adding the param. `?preview=0`
 * turns it off. Nothing is persisted beyond the tab session.
 */
export const usePreviewMode = () => {
    const { search } = useLocation();
    const param = useMemo(() => new URLSearchParams(search).get('preview'), [search]);
    const [enabled, setEnabled] = useState(readStoredPreview);

    useEffect(() => {
        if (param === null) return;
        const on = param !== '0' && param !== 'false';
        writeStoredPreview(on);
        setEnabled(on);
    }, [param]);

    return enabled;
};
