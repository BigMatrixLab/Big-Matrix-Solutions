import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';
import LEGAL from '../data/legal.json';
import useScrollSpy from '../utils/useScrollSpy';

/**
 * Company documents (about us, privacy, refund, delivery), rendered from
 * data/legal.json. The same file builds the letterhead PDFs in
 * public/documents (scripts/build-legal-pdfs.py), so the website and the
 * documents never drift apart.
 *
 * Layout: section index on the left that follows the scroll, the document in
 * the centre, and the solution-detail rail on the right (related documents
 * and the PDF download).
 */
const { company, documents } = LEGAL;

/** "contact@big-matrix.com" and "+880 …" inside running text become links. */
const linkify = (text) =>
    text.split(/(contact@big-matrix\.com|\+880 1339 870730|https:\/\/big-matrix\.com)/).map((part, i) => {
        if (part === company.email) return <a key={i} href={`mailto:${company.email}`}>{part}</a>;
        if (part === company.phone) return <a key={i} href={company.phoneHref}>{part}</a>;
        if (part === company.website) return <a key={i} href={company.website}>{part}</a>;
        return part;
    });

/** "Lead: rest" list items get a bold lead, as in the documents. */
const ListItem = ({ text }) => {
    const at = text.indexOf(': ');
    if (at > 0 && at < 48) {
        return <li><strong>{text.slice(0, at)}:</strong> {linkify(text.slice(at + 2))}</li>;
    }
    return <li>{linkify(text)}</li>;
};

const ContactRows = () => (
    <dl className="bm-legal__contact">
        <div><dt>Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
        <div><dt>Address</dt><dd>{company.address}</dd></div>
    </dl>
);

const pad = (n) => String(n).padStart(2, '0');
const sectionId = (i) => `s${i + 1}`;

/** Scrolls to a section without the jump, and keeps the hash in the URL. */
const goTo = (event, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
};

const LegalPage = ({ slug }) => {
    const doc = documents.find((item) => item.slug === slug);
    const ids = doc ? doc.sections.map((_, i) => sectionId(i)) : [];
    const active = useScrollSpy(ids);

    const tocRef = useRef(null);
    const activeRef = useRef(null);

    // The index can scroll inside its sticky column on short screens; keep the
    // highlighted entry in view without moving the page.
    useEffect(() => {
        const list = tocRef.current;
        const item = activeRef.current;
        if (!list || !item || list.scrollHeight <= list.clientHeight) return;
        const top = item.offsetTop - list.offsetTop;
        if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = top - list.clientHeight / 2;
        }
    }, [active]);

    if (!doc) return null;
    const pdf = `/documents/big-matrix-solutions-${doc.slug}.pdf`;

    return (
        <>
            <Seo title={doc.title} description={doc.description} path={`/${doc.slug}`} />
            <Breadcrumb pageTitle={doc.title} breadcrumbItem={doc.title} />

            <section className="bm-section">
                <div className="bm-container bm-legal">
                    <nav className="bm-legal__toc-wrap" aria-label="On this page">
                        <p className="bm-legal__label">On this page</p>
                        <ol className="bm-legal__toc" ref={tocRef}>
                            {doc.sections.map((section, i) => {
                                const id = sectionId(i);
                                const current = id === active;
                                return (
                                    <li key={section.heading} ref={current ? activeRef : undefined}>
                                        <a
                                            href={`#${id}`}
                                            onClick={(event) => goTo(event, id)}
                                            className={current ? 'is-current' : undefined}
                                            aria-current={current ? 'location' : undefined}
                                        >
                                            <span>{pad(i + 1)}</span>
                                            {section.heading}
                                        </a>
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>

                    <article className="bm-legal__body">
                        <p className="bm-legal__updated">Last updated: {doc.updated}</p>
                        {doc.intro.map((text) => (
                            <p className="bm-legal__intro" key={text}>{linkify(text)}</p>
                        ))}

                        {doc.sections.map((section, i) => {
                            const List = section.ordered ? 'ol' : 'ul';
                            return (
                                <section className="bm-legal__section" id={sectionId(i)} key={section.heading}>
                                    <h2>
                                        <span className="bm-legal__num">{pad(i + 1)}</span>
                                        {section.heading}
                                    </h2>
                                    {(section.paragraphs || []).map((text) => <p key={text}>{linkify(text)}</p>)}
                                    {section.list && (
                                        <List className={section.ordered ? 'bm-legal__ol' : 'bm-legal__ul'}>
                                            {section.list.map((text) => <ListItem text={text} key={text} />)}
                                        </List>
                                    )}
                                    {section.contact && <ContactRows />}
                                    {(section.after || []).map((text) => <p key={text}>{linkify(text)}</p>)}
                                </section>
                            );
                        })}
                    </article>

                    <aside className="bm-doc__aside bm-legal__rail">
                        <nav className="bm-doc__index" aria-label="Related documents">
                            <p className="bm-doc__index-label">Related documents</p>
                            <ul>
                                {documents.map((item, i) => {
                                    const current = item.slug === doc.slug;
                                    return (
                                        <li key={item.slug}>
                                            <Link
                                                to={`/${item.slug}`}
                                                className={current ? 'is-current' : undefined}
                                                aria-current={current ? 'page' : undefined}
                                            >
                                                <em>{pad(i + 1)}</em>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="bm-doc__contact">
                            <p className="bm-doc__contact-label">Official copy</p>
                            <p className="bm-doc__contact-copy">
                                Download the {doc.title} on Big-Matrix Solutions letterhead, to
                                keep or to share.
                            </p>
                            <a className="bm-doc__contact-line" href={company.phoneHref}>
                                <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                <span>{company.phone}</span>
                            </a>
                            <a className="bm-doc__contact-line" href={`mailto:${company.email}`}>
                                <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                <span>{company.email}</span>
                            </a>
                            <a className="bm-doc__contact-cta" href={pdf} download>
                                <i className="bi bi-file-earmark-pdf" aria-hidden="true"></i>
                                Download PDF
                            </a>
                        </div>

                        <Link to="/contact" className="bm-doc__back">
                            Questions? Contact us
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </aside>
                </div>
            </section>
        </>
    );
};

export default LegalPage;
