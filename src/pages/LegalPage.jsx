import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';
import LEGAL from '../data/legal.json';

/**
 * Policy pages (privacy, refund, delivery), rendered from data/legal.json. The
 * same file builds the letterhead Word/PDF versions, so the website and the
 * documents never drift apart. The PDF of each policy is in public/documents.
 */
const { company, documents } = LEGAL;
const POLICIES = documents.filter((doc) => doc.slug !== 'about');

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

export const ContactRows = () => (
    <dl className="bm-legal__contact">
        <div><dt>Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
        <div><dt>Address</dt><dd>{company.address}</dd></div>
    </dl>
);

const LegalPage = ({ slug }) => {
    const doc = documents.find((item) => item.slug === slug);
    if (!doc) return null;
    const pdf = `/documents/big-matrix-solutions-${doc.slug}.pdf`;

    return (
        <>
            <Seo title={doc.title} description={doc.description} path={`/${doc.slug}`} />
            <Breadcrumb pageTitle={doc.title} breadcrumbItem={doc.title} />

            <section className="bm-section">
                <div className="bm-container bm-legal">
                    <aside className="bm-legal__aside" aria-label="Policy navigation">
                        <p className="bm-legal__label">On this page</p>
                        <ol className="bm-legal__toc">
                            {doc.sections.map((section, i) => (
                                <li key={section.heading}>
                                    <a href={`#s${i + 1}`}>
                                        <span>{String(i + 1).padStart(2, '0')}</span>
                                        {section.heading}
                                    </a>
                                </li>
                            ))}
                        </ol>

                        <a className="bm-button bm-button--ghost bm-legal__pdf" href={pdf} download>
                            <i className="bi bi-file-earmark-pdf" aria-hidden="true"></i>
                            Download PDF
                        </a>

                        <p className="bm-legal__label">Policies</p>
                        <ul className="bm-legal__policies">
                            {POLICIES.map((item) => (
                                <li key={item.slug}>
                                    {item.slug === doc.slug ? (
                                        <span aria-current="page">{item.title}</span>
                                    ) : (
                                        <Link to={`/${item.slug}`}>{item.title}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <article className="bm-legal__body">
                        <p className="bm-legal__updated">Last updated: {doc.updated}</p>
                        {doc.intro.map((text) => (
                            <p className="bm-legal__intro" key={text}>{linkify(text)}</p>
                        ))}

                        {doc.sections.map((section, i) => {
                            const List = section.ordered ? 'ol' : 'ul';
                            return (
                                <section className="bm-legal__section" id={`s${i + 1}`} key={section.heading}>
                                    <h2>
                                        <span className="bm-legal__num">{String(i + 1).padStart(2, '0')}</span>
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
                </div>
            </section>
        </>
    );
};

export default LegalPage;
