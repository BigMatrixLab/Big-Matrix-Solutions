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

                // Fetch markdown file
                const response = await fetch(`/src/content/${contentFile}`);
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.statusText}`);
                }
                const markdownText = await response.text();

                // Configure marked options
                marked.setOptions({
                    highlight: function(code, lang) {
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
                const rawHtml = marked.parse(markdownText);

                // Process HTML to fix image paths (encode spaces in URLs)
                const processedHtml = rawHtml.replace(
                    /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
                    (match, before, src, after) => {
                        // Only encode local image paths
                        if (src.startsWith('/assets/') || src.startsWith('/src/content/')) {
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
