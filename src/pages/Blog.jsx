import { Link } from 'react-router-dom';
import { blogsData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';
import { sortBlogsByDate } from '../utils/blogSort';
import { visibleBlogs, isScheduled, daysUntilPublish, usePreviewMode } from '../utils/publishSchedule';

const Blog = () => {
    const preview = usePreviewMode();
    const posts = sortBlogsByDate(visibleBlogs(blogsData, { includeScheduled: preview }));
    const [lead, ...rest] = posts;
    const queued = preview ? posts.filter(isScheduled).length : 0;

    return (
        <>
            <Breadcrumb pageTitle="Insights from the engineering floor" breadcrumbItem="Insights" />

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Latest posts"
                        title="Research notes and architecture decisions"
                        lead="Field observations from the people building the systems — what worked, what broke, and what we would do differently."
                    />

                    {preview && (
                        <p className="bm-preview-note">
                            <i className="bi bi-eye" aria-hidden="true"></i>
                            Preview mode — showing {queued} scheduled {queued === 1 ? 'post' : 'posts'} that
                            visitors cannot see yet. <Link to="/blog?preview=0">Exit preview</Link>
                        </p>
                    )}

                    {lead && (
                        <article className="bm-post-lead">
                            <Link to={`/blog/${lead.slug}`} className="bm-post-lead__shot">
                                <img src={lead.image} alt={lead.title} loading="lazy" />
                            </Link>

                            <div className="bm-post-lead__body">
                                <p className="bm-post__meta">
                                    {isScheduled(lead) ? (
                                        <span className="bm-post__badge bm-post__badge--queued">
                                            Scheduled &middot; in {daysUntilPublish(lead)}d
                                        </span>
                                    ) : (
                                        <span className="bm-post__badge">Latest</span>
                                    )}
                                    {lead.category && <span>{lead.category}</span>}
                                    {lead.date && <time>{lead.date}</time>}
                                </p>

                                <h3 className="bm-post-lead__title">
                                    <Link to={`/blog/${lead.slug}`}>{lead.title}</Link>
                                </h3>

                                {lead.desc && <p className="bm-post-lead__text">{lead.desc}</p>}

                                <Link to={`/blog/${lead.slug}`} className="bm-button bm-button--ghost">
                                    Read the post
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </article>
                    )}

                    {rest.length > 0 && (
                        <div className="bm-grid bm-posts">
                            {rest.map((post) => (
                                <article className="bm-card" key={post.id}>
                                    <div className="bm-card__media">
                                        <img src={post.image} alt={post.title} loading="lazy" />
                                    </div>
                                    <div className="bm-card__body">
                                        <div className="bm-card__meta">
                                            {isScheduled(post) && (
                                                <span className="bm-post__badge bm-post__badge--queued">
                                                    in {daysUntilPublish(post)}d
                                                </span>
                                            )}
                                            {post.category && <span>{post.category}</span>}
                                            {post.date && <span>{post.date}</span>}
                                        </div>
                                        <h3 className="bm-card__title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        {post.desc && <p className="bm-card__text">{post.desc}</p>}
                                        <div className="bm-card__foot">
                                            <Link to={`/blog/${post.slug}`} className="bm-link">
                                                Read post
                                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default Blog;
