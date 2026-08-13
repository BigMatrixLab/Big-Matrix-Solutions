import React from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';
import { blogsData } from '../data/content';
import { sortBlogsByDate } from '../utils/blogSort';

const BlogArea = () => {
    const [lead, ...rest] = sortBlogsByDate(blogsData).slice(0, 5);
    if (!lead) return null;

    return (
        <section className="bm-section bm-section--surface">
            <div className="bm-container">
                <SectionHead
                    eyebrow="Insights"
                    title="Notes from the engineering floor"
                    action={{ label: 'All posts', to: '/blog' }}
                />

                <div className="bm-editorial">
                    <article className="bm-lead-post">
                        <div className="bm-lead-post__media">
                            <span className="bm-lead-post__flag">Latest</span>
                            <img src={lead.image} alt="" aria-hidden="true" loading="lazy" />
                        </div>
                        <p className="bm-meta-row">
                            {lead.category && <span>{lead.category}</span>}
                            <span>{lead.date}</span>
                            {lead.author && <span>{lead.author}</span>}
                        </p>
                        <h3 className="bm-lead-post__title">{lead.title}</h3>
                        {lead.desc && <p className="bm-lead-post__excerpt">{lead.desc}</p>}
                        <span className="bm-link">
                            Read the post
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </span>
                        <Link to={`/blog/${lead.slug}`} className="bm-lead-post__link">
                            <span>{lead.title}</span>
                        </Link>
                    </article>

                    <div className="bm-index">
                        {rest.map((post, i) => (
                            <div className="bm-index__item" key={post.id}>
                                <span className="bm-index__num">{String(i + 2).padStart(2, '0')}</span>
                                <div>
                                    <h3 className="bm-index__title">{post.title}</h3>
                                    <p className="bm-index__meta">
                                        {post.category && <span>{post.category}</span>}
                                        <span>{post.date}</span>
                                    </p>
                                </div>
                                <Link to={`/blog/${post.slug}`} className="bm-index__link">
                                    <span>{post.title}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogArea;
