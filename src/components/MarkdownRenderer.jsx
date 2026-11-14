import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Build-time render only (scripts/prerender.js). The prerender step puts every
 * markdown file from public/content on `globalThis.__BM_MARKDOWN__`, so the
 * static HTML already carries the article text for crawlers and AI agents
 * that do not run JavaScript. In the browser this returns '' and the fetch
 * below runs exactly as before.
 */
const prerendered = (contentFile, transform) => {
    const raw = typeof window === 'undefined' ? globalThis.__BM_MARKDOWN__?.[contentFile] : undefined;
    if (!raw) return '';
    let text = raw.trimStart();
    if (text.startsWith('---')) {
        const close = text.indexOf('\n---', 3);
        if (close !== -1) text = text.slice(text.indexOf('\n', close + 1) + 1);
    }
    const html = marked.parse(text.trim(), { gfm: true, breaks: true });
    try {
        return transform ? transform(html) : html;
    } catch {
        return html;
    }
};

/**
 * First render. On the server: the pre-rendered article. In the browser, when
 * hydrating a pre-rendered page: the same article, read back from the DOM, so
 * the first client render matches the HTML (otherwise React error #418). On a
 * normal client navigation there is nothing in the DOM yet: ''.
 */
const initialHtml = (contentFile, transform) => {
    if (typeof window === 'undefined') return prerendered(contentFile, transform);
    if (!contentFile) return '';
    const el = document.querySelector(`[data-md="${CSS.escape(contentFile)}"]`);
    return el ? el.innerHTML : '';
};

/**
 * `transform` runs on the sanitised HTML before it is inserted, letting a page
 * restructure the rendered markdown into its own components.
 */
const MarkdownRenderer = ({ contentFile, className = '', transform }) => {
    const [content, setContent] = useState(() => initialHtml(contentFile, transform));
    const [loading, setLoading] = useState(() => !content);
    const [error, setError] = useState(null);
    // The file whose text is on screen, so a refetch of the same article does
    // not flash the loading state over it.
    const shownFile = useRef(content ? contentFile : null);

    useEffect(() => {
        const fetchAndParseMarkdown = async () => {
            try {
                if (shownFile.current !== contentFile) setLoading(true);
                setError(null);

                // Fetch from public/content so markdown is available in production build
                const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
                const response = await fetch(`${base}content/${contentFile}`);
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.statusText}`);
                }
                const markdownRaw = await response.text();

                if (!markdownRaw) {
                    throw new Error('Fetched content is empty');
                }

                // Robust frontmatter stripping
                let markdownText = markdownRaw.trimStart();
                if (markdownText.startsWith('---')) {
                    const firstNewline = markdownText.indexOf('\n');
                    if (firstNewline !== -1) {
                        const secondDashIndex = markdownText.indexOf('---', firstNewline);
                        if (secondDashIndex !== -1) {
                            // Find the end of that line
                            const newlineAfterSecondDash = markdownText.indexOf('\n', secondDashIndex);
                            if (newlineAfterSecondDash !== -1) {
                                markdownText = markdownText.slice(newlineAfterSecondDash).trim();
                            } else {
                                markdownText = markdownText.slice(secondDashIndex + 3).trim();
                            }
                        }
                    }
                } else {
                    markdownText = markdownText.trim();
                }

                // If content is empty after stripping, show something
                if (!markdownText) {
                    setContent('<p><i>No content found in this file.</i></p>');
                    setLoading(false);
                    return;
                }

                // Configure marked options. (marked 17 has no `highlight` option;
                // the highlight.js hook that used to sit here never ran, so it
                // and its 1 MB import were removed.)
                marked.setOptions({
                    breaks: true,
                    gfm: true, // GitHub Flavored Markdown
                    headerIds: true,
                    mangle: false,
                });

                // Parse markdown to HTML
                let rawHtml = '';
                try {
                    rawHtml = marked.parse(markdownText);
                    // Handle sync vs async (v17 is usually sync but just in case)
                    if (rawHtml instanceof Promise) {
                        rawHtml = await rawHtml;
                    }
                } catch (parseErr) {
                    console.error('Marked parse error:', parseErr);
                    throw new Error('Failed to parse markdown content');
                }

                // Process HTML to fix image paths (encode spaces in URLs)
                const processedHtml = rawHtml.replace(
                    /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
                    (match, before, src, after) => {
                        // Only encode local image paths
                        if (src.startsWith('/assets/') || src.startsWith('/src/content/') || src.startsWith('/content/')) {
                            const encodedSrc = src.split('/').map(part => encodeURIComponent(decodeURIComponent(part))).join('/');
                            return `<img${before}src="${encodedSrc}"${after}>`;
                        }
                        // External URLs (http/https) are left untouched
                        return `<img${before}src="${src}"${after}>`;
                    }
                );

                // Sanitize HTML to prevent XSS
                const cleanHtml = DOMPurify.sanitize(processedHtml, {
                    ADD_TAGS: ['iframe'],
                    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
                });

                setContent(transform ? transform(cleanHtml) : cleanHtml);
                shownFile.current = contentFile;
            } catch (err) {
                console.error('Error loading markdown:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (contentFile) {
            fetchAndParseMarkdown();
        }
    }, [contentFile, transform]);

    if (loading) {
        return (
            <div className={`markdown-content ${className}`}>
                <div className="loading-spinner" style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <i className="bi bi-hourglass-split" style={{ fontSize: '2rem', color: 'var(--bm-orange)' }}></i>
                    <p>Loading content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`markdown-content ${className}`}>
                {/* Colours come from the theme tokens via .markdown-callout so
                    the notice stays legible in both light and dark. */}
                <div className="error-message markdown-callout">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <p><strong>Error loading content:</strong> {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`markdown-content ${className}`}
            data-md={contentFile}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default MarkdownRenderer;
