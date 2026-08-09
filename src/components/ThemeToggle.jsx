import React from 'react';
import { useTheme } from '../context/themeStore';

/* Icon button that flips the theme.

   Both glyphs are always in the DOM and cross-faded in CSS, so the button has
   a fixed width and nothing next to it shifts on toggle. The visible glyph
   shows the theme you will get, which is the convention most sites use.

   `size="lg"` matches the 44px mobile hamburger; the default 38px matches the
   desktop nav CTA. */
const ThemeToggle = ({ size, className = '' }) => {
    const { isDark, toggleTheme } = useTheme();
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    return (
        <button
            type="button"
            className={`bm-theme-toggle${size === 'lg' ? ' bm-theme-toggle--lg' : ''}${className ? ` ${className}` : ''}`}
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            aria-pressed={isDark}
        >
            <span className="bm-theme-toggle__icons" aria-hidden="true">
                <i className="bi bi-moon-stars bm-theme-toggle__moon"></i>
                <i className="bi bi-brightness-high-fill bm-theme-toggle__sun"></i>
            </span>
        </button>
    );
};

export default ThemeToggle;
