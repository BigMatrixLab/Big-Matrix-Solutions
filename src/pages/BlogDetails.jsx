import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import MarkdownRenderer from '../components/MarkdownRenderer';
import CtaBand from '../components/CtaBand';
import { blogsData } from '../data/content';
import { stripMarkdownEmoji } from '../utils/docEnrich';
import { sortBlogsByDate } from '../utils/blogSort';
import {
    visibleBlogs,
    isScheduled,
    daysUntilPublish,
    usePreviewMode,
} from '../utils/publishSchedule';

const BlogDetails = () => {
    const { slug } = useParams();
    const preview = usePreviewMode();

    // Resolve against the visible set, so a scheduled post reached by a direct
    // link falls through to the not-found state instead of leaking early.
    const readable = visibleBlogs(blogsData, { includeScheduled: preview });
    const post = readable.find((item) => item.slug === slug);

    if (!post) {
        return (
            <>
                <Breadcrumb pageTitle="Post not found" breadcrumbItem="Insights" />
                <section className="bm-section">
                    <div className="bm-container">
                        <p className="bm-doc__missing">
                            That post does not exist, or the link has changed.
                        </p>
                        <Link to="/blog" className="bm-button">
                            All insights
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </section>
            </>
        );
    }

    // Newest first, not `blogsData` order — `loadContent` sorts by id ascending,
    // so slicing it raw surfaced the five oldest posts on every article.
    const others = sortBlogsByDate(
        readable.filter((item) => item.slug !== post.slug)
    ).slice(0, 5);
    const queued = isScheduled(post);

    const facts = [
        {
            icon: 'bi bi-calendar-event',
            label: queued ? 'Scheduled for' : 'Published',
            value: post.date,
        },
        { icon: 'bi bi-person', label: 'Author', value: post.author || post.admin },
        { icon: 'bi bi-tag', label: 'Category', value: post.category },
    ].filter((fact) => fact.value);

    return (
        <>
            <Breadcrumb pageTitle={post.title} breadcrumbItem="Insights" />

            <section className="bm-section bm-doc">
                <div className="bm-container">
                    {queued && (
                        <p className="bm-preview-note">
                            <i className="bi bi-clock-history" aria-hidden="true"></i>
                            Preview — this post publishes on {post.date}, in {daysUntilPublish(post)} days.
                            Visitors get a not-found page until then.
                        </p>
                    )}

                    <div className="bm-doc__layout">
                        <article className="bm-doc__main">
                            {post.image && (
                                <figure className="bm-doc__hero">
                                    <img src={post.image} alt={post.title} />
                                </figure>
                            )}

                            <div className="bm-doc__body">
                                <MarkdownRenderer
                                    contentFile={post.contentFile}
                                    transform={stripMarkdownEmoji}
                                />
                            </div>

                            {post.tags?.length > 0 && (
                                <footer className="bm-doc__tags">
                                    <span className="bm-doc__tags-label">Tagged</span>
                                    <ul>
                                        {post.tags.map((tag) => (
                                            <li key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                </footer>
                            )}
                        </article>

                        <aside className="bm-doc__aside bm-doc__aside--plain">
                            <div>
                                <p className="bm-doc__index-label">About this post</p>
                                <dl className="bm-doc__facts">
                                    {facts.map((fact) => (
                                        <div key={fact.label}>
                                            <dt>
                                                <i className={fact.icon} aria-hidden="true"></i>
                                                {fact.label}
                                            </dt>
                                            <dd>{fact.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            {others.length > 0 && (
                                <nav className="bm-doc__more" aria-label="More insights">
                                    <p className="bm-doc__index-label">More insights</p>
                                    <ul>
                                        {others.map((item) => (
                                            <li key={item.slug}>
                                                <Link to={`/blog/${item.slug}`}>
                                                    <span className="bm-doc__more-thumb">
                                                        <img src={item.image} alt="" loading="lazy" />
                                                    </span>
                                                    <span>
                                                        <strong>{item.title}</strong>
                                                        {item.date && <small>{item.date}</small>}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}

                            <Link to="/blog" className="bm-doc__back">
                                <i className="bi bi-arrow-left" aria-hidden="true"></i>
                                All insights
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default BlogDetails;
