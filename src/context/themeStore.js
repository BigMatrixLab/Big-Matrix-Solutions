import { createContext, useContext } from 'react';

/* --------------------------------------------------------------------------
   Theme store — the non-component half of the theme layer.

   Kept separate from ThemeContext.jsx so that file only exports a component,
   which is what react-refresh needs to hot-reload it reliably.

   These constants must stay in agreement with the inline bootstrap script in
   index.html: same storage key, same attribute values. That script writes
   `data-theme` before first paint; ThemeProvider then reads it back so the
   first React render agrees with the already-painted page.
   -------------------------------------------------------------------------- */

export const STORAGE_KEY = 'bm-theme';
export const LIGHT = 'light';
export const DARK = 'dark';

export const ThemeContext = createContext(null);

export const prefersDark = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

/* Returns the visitor's explicit choice, or null if they have not made one.
   A null result is what lets the OS preference keep driving the theme. */
export const readStoredTheme = () => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === LIGHT || stored === DARK ? stored : null;
    } catch {
        // Private browsing or storage disabled.
        return null;
    }
};

export const writeStoredTheme = (theme) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Non-fatal: the theme still applies for this session.
    }
};

/* Prefers whatever the inline script already put on <html>, so we never
   contradict the painted page on the first render. */
export const getInitialTheme = () => {
    if (typeof document === 'undefined') return LIGHT;

    const fromDom = document.documentElement.getAttribute('data-theme');
    if (fromDom === LIGHT || fromDom === DARK) return fromDom;

    return readStoredTheme() ?? (prefersDark() ? DARK : LIGHT);
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside a ThemeProvider');
    }

    return context;
};
