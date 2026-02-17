import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

const MarkdownRenderer = ({ contentFile, className = '' }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndParseMarkdown = async () => {
            try {
                setLoading(true);
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

                // Configure marked options
                marked.setOptions({
                    highlight: function (code, lang) {
                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                return hljs.highlight(code, { language: lang }).value;
                            } catch (err) {
                                console.error('Highlight error:', err);
                            }
                        }
                        return hljs.highlightAuto(code).value;
                    },
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

                setContent(cleanHtml);
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
    }, [contentFile]);

    if (loading) {
        return (
            <div className={`markdown-content ${className}`}>
                <div className="loading-spinner" style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <i className="bi bi-hourglass-split" style={{ fontSize: '2rem', color: '#ED352D' }}></i>
                    <p>Loading content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`markdown-content ${className}`}>
                <div className="error-message" style={{
                    padding: '2rem',
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '8px',
                    color: '#856404'
                }}>
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <p><strong>Error loading content:</strong> {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`markdown-content ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default MarkdownRenderer;
