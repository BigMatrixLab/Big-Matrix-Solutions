import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';
import { sortBlogsByDate } from '../utils/blogSort';
import { visibleBlogs, isScheduled, daysUntilPublish, usePreviewMode } from '../utils/publishSchedule';
import Seo from '../components/Seo';
import ShareDialog from '../components/ShareDialog';
import { useShareDialog } from '../utils/share';

/* The lead post plus two full rows of three, then three more per click. */
const INITIAL_CARDS = 6;
const CARDS_PER_LOAD = 3;

const Blog = () => {
    const preview = usePreviewMode();
    const posts = sortBlogsByDate(visibleBlogs(blogsData, { includeScheduled: preview }));
    const [lead, ...rest] = posts;
    // Wrapped, not passed bare: filter would supply the index as `asOf`.
    const queued = preview ? posts.filter((post) => isScheduled(post)).length : 0;

    const [shown, setShown] = useState(INITIAL_CARDS);
    const share = useShareDialog();

    // Entering or leaving preview changes how many posts exist, so collapse
    // back to the first page rather than leaving a half-expanded list. Adjusted
    // during render rather than in an effect: React re-runs this component
    // immediately without painting the stale count, where an effect would
    // render the wrong length first and then correct it.
    const [lastPreview, setLastPreview] = useState(preview);
    if (lastPreview !== preview) {
        setLastPreview(preview);
        setShown(INITIAL_CARDS);
    }

    const visible = rest.slice(0, shown);
    const remaining = rest.length - visible.length;

    return (
        <>
            <Seo
                title="Insights"
                description="Research notes and architecture decisions from the engineering floor: AI systems, medical imaging, agentic tooling and the infrastructure underneath."
                path="/blog"
            />
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

                                <div className="bm-post-lead__actions">
                                    <Link to={`/blog/${lead.slug}`} className="bm-button bm-button--ghost">
                                        Read the post
                                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => share.open(lead)}
                                        className="bm-button bm-button--ghost"
                                        aria-label={`Share ${lead.title}`}
                                    >
                                        Share
                                        <i className="bi bi-share" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </article>
                    )}

                    {visible.length > 0 && (
                        <div className="bm-grid bm-posts">
                            {visible.map((post) => (
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
                                        <div className="bm-card__foot bm-card__foot--share">
                                            <Link to={`/blog/${post.slug}`} className="bm-link">
                                                Read post
                                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => share.open(post)}
                                                className="bm-link bm-link--button"
                                                aria-label={`Share ${post.title}`}
                                            >
                                                Share
                                                <i className="bi bi-share" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Hidden once the list is exhausted, so the control never
                        sits there doing nothing. */}
                    {remaining > 0 && (
                        <div className="bm-posts__more">
                            <button
                                type="button"
                                className="bm-button bm-button--ghost"
                                onClick={() => setShown((count) => count + CARDS_PER_LOAD)}
                            >
                                Load more posts
                                <i className="bi bi-arrow-down" aria-hidden="true"></i>
                            </button>
                            <p className="bm-posts__count" aria-live="polite">
                                Showing {visible.length + 1} of {posts.length} posts
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <ShareDialog
                post={share.post}
                copied={share.copied}
                onClose={share.close}
                preview
            />

            <CtaBand />
        </>
    );
};

export default Blog;
