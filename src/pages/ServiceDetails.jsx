import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import MarkdownRenderer from '../components/MarkdownRenderer';
import CtaBand from '../components/CtaBand';
import { servicesData } from '../data/content';
import { enrichSolutionHtml } from '../utils/docEnrich';

const PHONE_LABEL = '+880 2 55668200 (6212)';
const PHONE_HREF = 'tel:+880255668200';
const EMAIL = 'contact@big-matrix.com';

const pad = (value) => String(value).padStart(2, '0');

const ServiceDetails = () => {
    const { slug } = useParams();
    const service = servicesData.find((s) => s.slug === slug);

    const listRef = useRef(null);
    const currentRef = useRef(null);

    // The index scrolls inside the rail, so bring the active entry into view
    // without moving the page itself.
    useEffect(() => {
        const list = listRef.current;
        const item = currentRef.current;
        if (!list || !item) return;

        const below = item.offsetTop + item.offsetHeight > list.clientHeight;
        if (below) list.scrollTop = item.offsetTop - 12;
    }, [slug]);

    if (!service) {
        return (
            <>
                <Breadcrumb pageTitle="Solution not found" breadcrumbItem="Solutions" />
                <section className="bm-section">
                    <div className="bm-container">
                        <p className="bm-doc__missing">
                            That solution does not exist, or the link has changed.
                        </p>
                        <Link to="/service" className="bm-button">
                            All solutions
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Breadcrumb pageTitle={service.title} breadcrumbItem="Solutions" />

            <section className="bm-section bm-doc">
                <div className="bm-container">
                    <div className="bm-doc__layout">
                        <article className="bm-doc__main">
                            {service.image && (
                                <figure className="bm-doc__hero">
                                    <img src={service.image} alt={service.title} />
                                </figure>
                            )}

                            <div className="bm-doc__body">
                                <MarkdownRenderer
                                    contentFile={service.contentFile}
                                    transform={enrichSolutionHtml}
                                />
                            </div>
                        </article>

                        <aside className="bm-doc__aside">
                            <nav className="bm-doc__index" aria-label="All solutions">
                                <p className="bm-doc__index-label">Solutions index</p>
                                <ul ref={listRef}>
                                    {servicesData.map((item) => {
                                        const current = item.slug === service.slug;
                                        return (
                                            <li key={item.slug} ref={current ? currentRef : undefined}>
                                                <Link
                                                    to={`/service/${item.slug}`}
                                                    className={current ? 'is-current' : undefined}
                                                    aria-current={current ? 'page' : undefined}
                                                >
                                                    <em>{pad(item.id)}</em>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            <div className="bm-doc__contact">
                                <p className="bm-doc__contact-label">Talk to an engineer</p>
                                <p className="bm-doc__contact-copy">
                                    Scoping something in this area? Tell us the constraints and we
                                    will map it to an architecture.
                                </p>
                                <a className="bm-doc__contact-line" href={PHONE_HREF}>
                                    <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                    <span>{PHONE_LABEL}</span>
                                </a>
                                <a className="bm-doc__contact-line" href={`mailto:${EMAIL}`}>
                                    <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                    <span>{EMAIL}</span>
                                </a>
                                <Link to="/contact" className="bm-doc__contact-cta">
                                    Start a conversation
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </Link>
                            </div>

                            <Link to="/service" className="bm-doc__back">
                                <i className="bi bi-arrow-left" aria-hidden="true"></i>
                                All solutions
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default ServiceDetails;
