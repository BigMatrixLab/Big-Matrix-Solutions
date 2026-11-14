import React from 'react';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

/**
 * Build-time render of one route, used by scripts/prerender.js.
 *
 * Resolves with the app markup and the head tags Helmet collected (title,
 * description, canonical, JSON-LD), so each page ships as real HTML that
 * search engines and AI agents can read without running JavaScript. The
 * browser then hydrates this markup (src/main.jsx).
 *
 * Streaming render with onAllReady, because pages are lazy-loaded (App.jsx)
 * and renderToString cannot wait for them.
 */
export const render = (url) =>
    new Promise((resolve, reject) => {
        const helmetContext = {};
        let html = '';
        const sink = new Writable({
            write(chunk, _encoding, done) {
                html += chunk.toString();
                done();
            },
        });
        sink.on('finish', () => {
            const { helmet } = helmetContext;
            resolve({
                html,
                title: helmet ? helmet.title.toString() : '',
                head: helmet ? [helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).join('') : '',
            });
        });

        const stream = renderToPipeableStream(
            <HelmetProvider context={helmetContext}>
                <ThemeProvider>
                    <StaticRouter location={url}>
                        <App />
                    </StaticRouter>
                </ThemeProvider>
            </HelmetProvider>,
            {
                onAllReady: () => stream.pipe(sink),
                onShellError: reject,
                onError: reject,
            },
        );
    });
