import React, { useEffect, useState } from 'react';

const RADIUS = 49;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;

            setIsVisible(scrolled > 320);
            setProgress(scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            type="button"
            className={`bm-totop${isVisible ? ' is-visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            tabIndex={isVisible ? 0 : -1}
        >
            <svg viewBox="-1 -1 102 102" aria-hidden="true">
                <path
                    d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                    style={{
                        strokeDasharray: CIRCUMFERENCE,
                        strokeDashoffset: CIRCUMFERENCE - progress * CIRCUMFERENCE,
                    }}
                />
            </svg>
            <i className="bi bi-arrow-up" aria-hidden="true"></i>
        </button>
    );
};

export default ScrollToTop;
