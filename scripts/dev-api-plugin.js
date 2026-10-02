/**
 * Dev-only bridge between Vite's dev server and the Cloudflare Pages Functions
 * in /functions.
 *
 * In production Cloudflare runs those files itself. Vite knows nothing about
 * them, so without this plugin the contact form would 404 during local
 * development and the only way to test it would be to deploy. The plugin wraps
 * each Node request in a standard `Request`, hands it to the same handler
 * Cloudflare will call, and writes the returned `Response` back — so there is
 * one implementation, exercised the same way in both places.
 *
 * Secrets come from `.dev.vars`, the same file Wrangler reads, so
 * `wrangler pages dev` keeps working if you ever prefer that runtime.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/** Pages Function modules to mount, as [url path, module path] pairs. */
const ROUTES = [['/api/contact', '/functions/api/contact.js']];

/**
 * Minimal dotenv reader: `KEY=value`, `#` comments, optional wrapping quotes.
 * Not worth a dependency for a handful of lines.
 */
function readDevVars(root) {
    const file = resolve(root, '.dev.vars');
    if (!existsSync(file)) return {};

    const vars = {};
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const eq = trimmed.indexOf('=');
        if (eq < 1) continue;

        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        vars[key] = value;
    }
    return vars;
}

function readBody(req) {
    return new Promise((done, reject) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => done(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

/** `POST` -> `onRequestPost`, matching the Pages Functions naming convention. */
const handlerName = (method) =>
    `onRequest${method[0].toUpperCase()}${method.slice(1).toLowerCase()}`;

export function devApiPlugin() {
    return {
        name: 'bm-dev-api',
        apply: 'serve',

        configureServer(server) {
            const root = server.config.root;

            for (const [urlPath, modulePath] of ROUTES) {
                server.middlewares.use(urlPath, async (req, res, next) => {
                    const method = (req.method || 'GET').toUpperCase();

                    // Connect strips the mounted prefix from req.url, so rebuild
                    // the absolute URL the handler expects. The host matters:
                    // the function compares it against the Origin header.
                    const url = `http://${req.headers.host || 'localhost'}${urlPath}`;

                    const init = { method, headers: req.headers };
                    if (method !== 'GET' && method !== 'HEAD') {
                        init.body = await readBody(req);
                    }

                    let response;
                    try {
                        // ssrLoadModule re-reads the file on change, so editing
                        // the function needs no dev server restart.
                        const mod = await server.ssrLoadModule(modulePath);
                        const handler = mod[handlerName(method)] || mod.onRequest;

                        if (!handler) {
                            res.statusCode = 405;
                            res.setHeader('content-type', 'application/json');
                            res.end(JSON.stringify({ ok: false, error: 'Method not allowed.' }));
                            return;
                        }

                        response = await handler({
                            request: new Request(url, init),
                            // `.dev.vars` wins over the shell environment, which
                            // mirrors how Wrangler resolves local secrets.
                            env: { ...process.env, ...readDevVars(root) },
                            params: {},
                            waitUntil: () => {},
                            next,
                        });
                    } catch (error) {
                        server.config.logger.error(
                            `[dev-api] ${urlPath} threw: ${error?.stack || error}`
                        );
                        res.statusCode = 500;
                        res.setHeader('content-type', 'application/json');
                        res.end(JSON.stringify({ ok: false, error: 'Internal error.' }));
                        return;
                    }

                    res.statusCode = response.status;
                    response.headers.forEach((value, key) => res.setHeader(key, value));
                    res.end(Buffer.from(await response.arrayBuffer()));
                });
            }

            server.config.logger.info(
                `  \x1b[32m\u279c\x1b[0m  \x1b[1mAPI\x1b[0m:     ${ROUTES.map(([p]) => p).join(', ')} (served from /functions)`
            );
        },
    };
}
