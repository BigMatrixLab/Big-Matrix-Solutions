import { useEffect } from 'react';

/**
 * Freezes the page behind an open overlay. Without this a touch drag inside a
 * bottom sheet scrolls the document underneath it.
 *
 * Both <html> and <body> are locked, since either can be the scroll container
 * depending on the overflow rules in effect.
 *
 * Nested overlays are counted, so closing an inner one does not unlock the
 * page while an outer one is still up.
 */
let lockCount = 0;
let restore = null;

const useBodyScrollLock = (enabled = true) => {
    useEffect(() => {
        if (!enabled) return undefined;

        const root = document.documentElement;

        if (lockCount === 0) {
            restore = {
                rootOverflow: root.style.overflow,
                bodyOverflow: document.body.style.overflow,
            };
            root.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }

        lockCount += 1;

        return () => {
            lockCount -= 1;
            if (lockCount > 0 || !restore) return;

            root.style.overflow = restore.rootOverflow;
            document.body.style.overflow = restore.bodyOverflow;
            restore = null;
        };
    }, [enabled]);
};

export default useBodyScrollLock;
