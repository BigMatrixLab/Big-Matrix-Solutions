import React, { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import {
    DARK,
    LIGHT,
    ThemeContext,
    getInitialTheme,
    readStoredTheme,
    writeStoredTheme,
} from './themeStore';

/* --------------------------------------------------------------------------
   ThemeProvider

   Owns the light/dark decision and does nothing else. The theme is expressed
   as a `data-theme` attribute on <html>, so CSS does all the colour work via
   the token layer in bm-tokens.css; React only decides which word goes in the
   attribute.

   Constants, the context object and the useTheme hook live in themeStore.js.
   -------------------------------------------------------------------------- */

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);
    // Pages are pre-rendered in light mode (scripts/prerender.js) and then
    // hydrated, so the first browser render must match that. Colours are
    // already right before this, because CSS reads the `data-theme` attribute
    // set by the inline script in index.html; only markup that branches on
    // `isDark` (toggle icon, dot-field colours) waits one frame.
    // Flipped in a transition: a normal update here would reach the lazy page
    // while it is still hydrating and make React throw the pre-rendered HTML
    // away (React error #421). A transition waits until hydration is done.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        startTransition(() => setMounted(true));
    }, []);

    // Mirror onto <html>. `data-bs-theme` is what Bootstrap 5.3 reads for its
    // own dark variables, so the two are kept in lockstep.
    useEffect(() => {
        const root = document.documentElement;

        root.setAttribute('data-theme', theme);
        root.setAttribute('data-bs-theme', theme);
        writeStoredTheme(theme);

        // Keeps mobile browser chrome (address bar) in step with the page.
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === DARK ? '#0f1011' : '#ffffff');
    }, [theme]);

    // Follow the OS preference until the visitor makes an explicit choice.
    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return undefined;

        const query = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (event) => {
            if (readStoredTheme()) return;
            setTheme(event.matches ? DARK : LIGHT);
        };

        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === DARK ? LIGHT : DARK));
    }, []);

    const value = useMemo(
        () => ({ theme, isDark: mounted && theme === DARK, setTheme, toggleTheme }),
        [theme, mounted, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
