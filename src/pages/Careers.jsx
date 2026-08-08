import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import careersData from '../data/careers.json';
import CtaBand from '../components/CtaBand';

const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const date = new Date(deadline);
    date.setHours(23, 59, 59, 999);
    return new Date() > date;
};

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
        () => careersData.map((job) => ({ ...job, closed: isDeadlinePassed(job.deadline) })),
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

    const reset = () => {
        setType(ALL);
        setOpenOnly(false);
    };

    return (
        <>
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
                        lead="We are a small team shipping software into hospitals, labs and factory floors. If that appeals, take a look."
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

                    {visible.length === 0 ? (
                        <div className="bm-jobs__empty">
                            <p>
                                {jobs.length === 0
                                    ? 'There are no listings right now. We still like hearing from good engineers.'
                                    : 'No roles match that filter.'}
                            </p>
                            {jobs.length > 0 ? (
                                <button type="button" className="bm-button bm-button--ghost" onClick={reset}>
                                    Clear filters
                                </button>
                            ) : (
                                <Link to="/contact" className="bm-button bm-button--ghost">
                                    Get in touch
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </Link>
                            )}
                        </div>
                    ) : (
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
                    )}
                </div>
            </section>
        <CtaBand />
        </>
    );
};

export default Careers;
