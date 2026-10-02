import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import careersData from '../data/careers.json';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';

const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const date = new Date(deadline);
    date.setHours(23, 59, 59, 999);
    return new Date() > date;
};

/* A closed role stays on the page for a week so anyone following a link still
   sees what happened to it, then drops off on its own. No edit required. */
const HIDE_AFTER_DAYS = 7;

const isRetired = (deadline) => {
    if (!deadline) return false;
    const date = new Date(deadline);
    date.setHours(23, 59, 59, 999);
    return new Date() > new Date(date.getTime() + HIDE_AFTER_DAYS * 86400000);
};

const LINKEDIN = 'https://www.linkedin.com/company/big-matrix-solutions/posts/?viewAsMember=true';

const formatDeadline = (deadline) =>
    deadline
        ? new Date(deadline).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          })
        : null;

const ALL = 'all';

const Careers = () => {
    const [type, setType] = useState(ALL);
    const [openOnly, setOpenOnly] = useState(false);

    const jobs = useMemo(
        () =>
            careersData
                .filter((job) => !isRetired(job.deadline))
                .map((job) => ({ ...job, closed: isDeadlinePassed(job.deadline) })),
        []
    );

    const types = useMemo(
        () => [...new Set(jobs.map((job) => job.type).filter(Boolean))],
        [jobs]
    );

    const openCount = jobs.filter((job) => !job.closed).length;
    const countFor = (value) => jobs.filter((job) => job.type === value).length;

    const visible = jobs.filter(
        (job) => (type === ALL || job.type === type) && (!openOnly || !job.closed)
    );

    // There are listings, but the current filter hides all of them. That is a
    // different message from "nothing is open", and only one of the two ever
    // shows, so the page never stacks two notice cards.
    const filteredOut = jobs.length > 0 && visible.length === 0;

    const reset = () => {
        setType(ALL);
        setOpenOnly(false);
    };

    return (
        <>
            <Seo
                title="Careers"
                description="Open roles at Big-Matrix Solutions. Build AI systems that reach real clinicians, real factories and real patients."
                path="/careers"
            />
            <Breadcrumb pageTitle="Build systems that matter" breadcrumbItem="Careers" />

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Open positions"
                        title={
                            openCount > 0
                                ? `${openCount} role${openCount === 1 ? '' : 's'} open right now`
                                : 'No roles open at the moment'
                        }
                        lead="We are a team shipping software clients. If that sounds like your kind of work, take a look."
                    />

                    {jobs.length > 0 && (
                        <div className="bm-jobs__filter">
                            <div
                                className="bm-jobs__chips"
                                role="group"
                                aria-label="Filter roles by type"
                            >
                                <button
                                    type="button"
                                    className={type === ALL ? 'is-active' : undefined}
                                    aria-pressed={type === ALL}
                                    onClick={() => setType(ALL)}
                                >
                                    All roles <em>{jobs.length}</em>
                                </button>

                                {types.map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        className={type === value ? 'is-active' : undefined}
                                        aria-pressed={type === value}
                                        onClick={() => setType(value)}
                                    >
                                        {value} <em>{countFor(value)}</em>
                                    </button>
                                ))}
                            </div>

                            <label className="bm-jobs__toggle">
                                <input
                                    type="checkbox"
                                    checked={openOnly}
                                    onChange={(event) => setOpenOnly(event.target.checked)}
                                />
                                <span>Open roles only</span>
                                <em>{openCount}</em>
                            </label>
                        </div>
                    )}

                    {filteredOut ? (
                        <div className="bm-jobs__empty">
                            <p>No roles match that filter.</p>
                            <button type="button" className="bm-button bm-button--ghost" onClick={reset}>
                                Clear filters
                            </button>
                        </div>
                    ) : visible.length > 0 ? (
                        <div className="bm-jobs">
                            {visible.map((job) => (
                                <article
                                    className={`bm-job${job.closed ? ' is-closed' : ''}`}
                                    key={job.slug || job.id}
                                >
                                    <div className="bm-job__body">
                                        <p className="bm-job__tags">
                                            <span className="bm-job__status">
                                                {job.closed ? 'Closed' : 'Open'}
                                            </span>
                                            {job.type && <span className="bm-job__type">{job.type}</span>}
                                        </p>

                                        <h3 className="bm-job__title">
                                            {job.closed ? (
                                                job.title
                                            ) : (
                                                <Link to={`/careers/${job.slug}`}>{job.title}</Link>
                                            )}
                                        </h3>

                                        {job.desc && <p className="bm-job__desc">{job.desc}</p>}
                                    </div>

                                    <div className="bm-job__aside">
                                        <dl className="bm-job__facts">
                                            {job.location && (
                                                <div>
                                                    <dt>
                                                        <i className="bi bi-geo-alt" aria-hidden="true"></i>
                                                        Location
                                                    </dt>
                                                    <dd>{job.location}</dd>
                                                </div>
                                            )}
                                            {job.salary && (
                                                <div>
                                                    <dt>
                                                        <i className="bi bi-cash-stack" aria-hidden="true"></i>
                                                        Salary
                                                    </dt>
                                                    <dd>{job.salary}</dd>
                                                </div>
                                            )}
                                            {job.workTime && (
                                                <div>
                                                    <dt>
                                                        <i className="bi bi-clock" aria-hidden="true"></i>
                                                        Hours
                                                    </dt>
                                                    <dd>{job.workTime}</dd>
                                                </div>
                                            )}
                                            {job.deadline && (
                                                <div>
                                                    <dt>
                                                        <i className="bi bi-calendar-event" aria-hidden="true"></i>
                                                        Deadline
                                                    </dt>
                                                    <dd>{formatDeadline(job.deadline)}</dd>
                                                </div>
                                            )}
                                        </dl>

                                        {job.closed ? (
                                            <span className="bm-job__cta is-disabled" aria-disabled="true">
                                                Applications closed
                                            </span>
                                        ) : (
                                            <Link to={`/careers/${job.slug}`} className="bm-job__cta">
                                                View role
                                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                            </Link>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}

                    {/* Nothing to apply for, either because the board is empty or
                        the only listings left are closed. One card carries both
                        the follow prompt and the open invitation, so an empty
                        board never shows two panels saying much the same thing. */}
                    {openCount === 0 && !filteredOut && (
                        <aside className="bm-tuned">
                            <div className="bm-tuned__body">
                                <p className="bm-tuned__eyebrow">Stay tuned</p>
                                <h3 className="bm-tuned__title">New roles go up on LinkedIn first</h3>
                                <p className="bm-tuned__text">
                                    Follow the page and you will see an opening the day it goes
                                    live, before it reaches this board. We still like hearing from
                                    good engineers between postings.
                                </p>
                            </div>

                            <div className="bm-tuned__actions">
                                <a
                                    className="bm-tuned__cta"
                                    href={LINKEDIN}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Follow on LinkedIn
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                </a>
                                <Link to="/contact" className="bm-button bm-button--ghost">
                                    Get in touch
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </aside>
                    )}
                </div>
            </section>
        <CtaBand />
        </>
    );
};

export default Careers;
