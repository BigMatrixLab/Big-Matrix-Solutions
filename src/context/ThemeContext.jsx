import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
        () => ({ theme, isDark: theme === DARK, setTheme, toggleTheme }),
        [theme, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
