import { useEffect, useState } from 'react';

/**
 * Returns the id of the section the reader is in, for a table of contents
 * that highlights as the page scrolls in either direction.
 *
 * A section is current once its top has passed a line just below the fixed
 * header. At the very bottom of the page the last section wins, so a short
 * final section can still be highlighted.
 */
const useScrollSpy = (ids, offset = 140) => {
    const [active, setActive] = useState(ids[0]);
    const key = ids.join('|');

    useEffect(() => {
        const list = key.split('|');
        let frame = 0;

        const update = () => {
            frame = 0;
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            let current = list[0];

            if (atBottom) {
                current = list[list.length - 1];
            } else {
                list.forEach((id) => {
                    const el = document.getElementById(id);
                    if (el && el.getBoundingClientRect().top <= offset) current = id;
                });
            }
            setActive(current);
        };

        const onScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [key, offset]);

    return active;
};

export default useScrollSpy;
