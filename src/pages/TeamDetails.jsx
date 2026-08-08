import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaBand from '../components/CtaBand';
import teamData from '../data/team.json';

const SOCIALS = [
    { key: 'linkedin', icon: 'bi-linkedin', label: 'LinkedIn' },
    { key: 'github', icon: 'bi-github', label: 'GitHub' },
    { key: 'scholar', icon: 'bi-mortarboard', label: 'Scholar' },
    { key: 'website', icon: 'bi-globe', label: 'Website' },
];

const pad = (value) => String(value).padStart(2, '0');

/** The data carries "#" placeholders and protocol-less hosts. */
const linkOf = (value) => {
    const url = value?.trim();
    if (!url || url === '#') return null;
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const percentOf = (value) => {
    const reading = Number.parseFloat(String(value).replace('%', ''));
    if (!Number.isFinite(reading)) return null;
    return Math.min(100, Math.max(0, reading));
};

const TeamDetails = () => {
    const { slug } = useParams();
    const index = teamData.findIndex((item) => item.slug === slug);
    const member = index === -1 ? null : teamData[index];

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

    if (!member) {
        return (
            <>
                <Breadcrumb pageTitle="Profile not found" breadcrumbItem="Team" />
                <section className="bm-section">
                    <div className="bm-container">
                        <p className="bm-doc__missing">
                            That profile does not exist, or the link has changed.
                        </p>
                        <Link to="/team" className="bm-button">
                            All team members
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </section>
            </>
        );
    }

    const email = member.email?.trim();
    const phone = member.phone?.trim();

    const links = SOCIALS.map((social) => ({
        ...social,
        href: linkOf(member.social?.[social.key]),
    })).filter((social) => social.href);

    const skills = (member.skills || []).filter((skill) => skill.name);
    const projects = (member.projects || []).filter((project) => project.name);

    return (
        <>
            <Breadcrumb pageTitle={member.name} breadcrumbItem="Team" />

            <section className="bm-section bm-doc">
                <div className="bm-container">
                    <div className="bm-doc__layout">
                        <article className="bm-doc__main">
                            <div className="bm-person">
                                <figure className="bm-person__portrait">
                                    <img src={member.image} alt={member.name} loading="lazy" />
                                </figure>

                                <div className="bm-person__intro">
                                    <p className="bm-person__meta">
                                        <em>Team</em>
                                        <span>
                                            {pad(index + 1)} / {pad(teamData.length)}
                                        </span>
                                        {member.location && <span>{member.location}</span>}
                                    </p>

                                    {member.desc && <p className="bm-person__lede">{member.desc}</p>}

                                    {links.length > 0 && (
                                        <ul className="bm-person__links">
                                            {links.map((social) => (
                                                <li key={social.key}>
                                                    <a
                                                        href={social.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i
                                                            className={`bi ${social.icon}`}
                                                            aria-hidden="true"
                                                        ></i>
                                                        {social.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {(skills.length > 0 || projects.length > 0) && (
                                <div className="bm-doc__body">
                                    {skills.length > 0 && (
                                        <>
                                            <h2>Focus areas</h2>
                                            <ul className="bm-meters">
                                                {skills.map((skill) => {
                                                    const reading = percentOf(skill.value);
                                                    return (
                                                        <li key={skill.name}>
                                                            <span className="bm-meters__label">
                                                                {skill.name}
                                                            </span>
                                                            {reading !== null && (
                                                                <span className="bm-meters__value">
                                                                    {reading}%
                                                                </span>
                                                            )}
                                                            {reading !== null && (
                                                                <span
                                                                    className="bm-meters__track"
                                                                    aria-hidden="true"
                                                                >
                                                                    <span
                                                                        style={{
                                                                            width: `${reading}%`,
                                                                        }}
                                                                    />
                                                                </span>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </>
                                    )}

                                    {projects.length > 0 && (
                                        <>
                                            <h2>Selected work</h2>
                                            <ol className="bm-ledger">
                                                {projects.map((project) => (
                                                    <li key={project.name}>
                                                        <span>{project.name}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </>
                                    )}
                                </div>
                            )}
                        </article>

                        <aside className="bm-doc__aside">
                            <nav className="bm-doc__index" aria-label="Team index">
                                <p className="bm-doc__index-label">Team index</p>
                                <ul ref={listRef}>
                                    {teamData.map((item, position) => {
                                        const current = item.slug === member.slug;
                                        return (
                                            <li
                                                key={item.slug}
                                                ref={current ? currentRef : undefined}
                                            >
                                                <Link
                                                    to={`/team/${item.slug}`}
                                                    className={current ? 'is-current' : undefined}
                                                    aria-current={current ? 'page' : undefined}
                                                >
                                                    <em>{pad(position + 1)}</em>
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            <div className="bm-doc__contact">
                                <p className="bm-doc__contact-label">Get in touch</p>
                                <p className="bm-doc__contact-copy">
                                    Reach out directly about research, collaboration or a project
                                    in this area.
                                </p>
                                {phone && (
                                    <a
                                        className="bm-doc__contact-line"
                                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                                    >
                                        <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                        <span>{phone}</span>
                                    </a>
                                )}
                                {email && (
                                    <a className="bm-doc__contact-line" href={`mailto:${email}`}>
                                        <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                        <span>{email}</span>
                                    </a>
                                )}
                                <Link to="/contact" className="bm-doc__contact-cta">
                                    Start a conversation
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </Link>
                            </div>

                            <Link to="/team" className="bm-doc__back">
                                <i className="bi bi-arrow-left" aria-hidden="true"></i>
                                All team members
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default TeamDetails;
