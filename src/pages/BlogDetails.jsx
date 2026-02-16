import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import MarkdownRenderer from '../components/MarkdownRenderer';
import blogsData from '../data/blogs.json';

const BlogDetails = () => {
    const { slug } = useParams();
    const post = blogsData.find(b => b.slug === slug);

    if (!post) {
        return (
            <>
                <Breadcrumb pageTitle="Blog Post Not Found" breadcrumbItem="Blog" />
                <div className="blog-details-area">
                    <div className="container text-center">
                        <h2>Blog post not found</h2>
                        <Link to="/blog" className="btn btn-primary mt-4">Back to Blog</Link>
                    </div>
                </div>
            </>
        );
    }

    const popularPosts = blogsData.slice(0, 3);
    const categories = [...new Set(blogsData.map(b => b.category))];

    return (
        <>
            <Breadcrumb pageTitle={post.title} breadcrumbItem="Blog" />

            <div className="blog-details-area">
                <div className="container">
                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="blog-details-box">
                                <div className="blog-details-thumb">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="blog-details-content">
                                    <div className="blog-meta">
                                        <span><i className="bi bi-calendar-check"></i> {post.date}</span>
                                        {post.author && <span><i className="bi bi-person"></i> {post.author}</span>}
                                    </div>
                                    
                                    {/* Render markdown content if contentFile exists, otherwise fallback to JSON structure */}
                                    {post.contentFile ? (
                                        <MarkdownRenderer contentFile={post.contentFile} />
                                    ) : (
                                        <>
                                            <h2 className="blog-details-title">{post.title}</h2>
                                            <p className="blog-details-desc">{post.desc}</p>
                                            <p className="blog-details-desc">{post.content}</p>

                                            {/* Quote Section - Optional */}
                                            {post.quote && (
                                                <div className="blog-quote">
                                                    <i className="bi bi-quote"></i>
                                                    <p>{post.quote.text}</p>
                                                    <span>— {post.quote.author}</span>
                                                </div>
                                            )}

                                            {/* Dynamic Sections */}
                                            {post.sections && post.sections.map((section, index) => (
                                                <div key={index}>
                                                    <h3>{section.heading}</h3>
                                                    <p className="blog-details-desc">{section.content}</p>
                                                </div>
                                            ))}

                                            {/* List Items - Optional */}
                                            {post.listItems && post.listItems.length > 0 && (
                                                <ul className="blog-list">
                                                    {post.listItems.map((item, index) => (
                                                        <li key={index}>
                                                            <i className="bi bi-check-circle-fill"></i> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Additional Images - Optional */}
                                            {post.additionalImages && post.additionalImages.length > 0 && (
                                                <div className="row my-4">
                                                    {post.additionalImages.map((img, index) => (
                                                        <div key={index} className={`col-md-${12 / post.additionalImages.length}`}>
                                                            <div className="blog-details-image">
                                                                <img src={img.url} alt={img.alt} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Footer with Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="blog-details-footer">
                                            <div className="blog-tags">
                                                {post.tags.map((tag, index) => (
                                                    <span key={index}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            {/* Search Widget */}
                            <div className="widget-box">
                                <div className="widget-search">
                                    <form>
                                        <input type="text" placeholder="Search Here" />
                                        <button type="submit"><i className="bi bi-search"></i></button>
                                    </form>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="widget-box">
                                <h4 className="widget-title">Categories</h4>
                                <ul className="widget-categories">
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <Link to="/blog">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                                                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                                                </svg>
                                                {cat}
                                                <span>({blogsData.filter(b => b.category === cat).length})</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Popular Posts Widget */}
                            <div className="widget-box">
                                <h4 className="widget-title">Popular Post</h4>
                                <div className="widget-popular-posts">
                                    {popularPosts.map((popularPost) => (
                                        <div className="popular-post-item" key={popularPost.id}>
                                            <div className="popular-post-thumb">
                                                <img src={popularPost.image} alt={popularPost.title} />
                                            </div>
                                            <div className="popular-post-content">
                                                <Link to={`/blog/${popularPost.slug}`}>{popularPost.title}</Link>
                                                <span className="popular-post-date">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                                                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                                                </svg>
                                                {popularPost.date}
                                            </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags Widget */}
                            <div className="widget-box">
                                <h4 className="widget-title">Popular Tags</h4>
                                <div className="widget-tags">
                                    {[...new Set(blogsData.flatMap(b => b.tags || []))].map((tag, idx) => (
                                        <Link to="/blog" key={idx} className="tag-item">{tag}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
