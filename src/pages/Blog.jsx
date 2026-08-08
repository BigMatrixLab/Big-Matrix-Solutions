import { Link } from 'react-router-dom';
import { blogsData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';

/** "Feb 14, 2026" -> comparable timestamp; unparseable dates sort last. */
const timeOf = (post) => {
    const value = Date.parse(post.date);
    return Number.isNaN(value) ? 0 : value;
};

const Blog = () => {
    const posts = [...blogsData].sort((a, b) => timeOf(b) - timeOf(a));
    const [lead, ...rest] = posts;

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

                    {lead && (
                        <article className="bm-post-lead">
                            <Link to={`/blog/${lead.slug}`} className="bm-post-lead__shot">
                                <img src={lead.image} alt={lead.title} loading="lazy" />
                            </Link>

                            <div className="bm-post-lead__body">
                                <p className="bm-post__meta">
                                    <span className="bm-post__badge">Latest</span>
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
