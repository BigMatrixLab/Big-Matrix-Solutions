import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaBand from '../components/CtaBand';
import careersData from '../data/careers.json';
import NotFound from './NotFound';

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
              month: 'long',
              year: 'numeric',
          })
        : null;

/** "Ideal for: a final-year student…" -> { label, body } */
const splitLabelled = (text) => {
    if (!text) return null;
    const at = text.indexOf(':');
    if (at === -1) return { label: null, body: text };
    return { label: text.slice(0, at).trim(), body: text.slice(at + 1).trim() };
};

const CareerDetails = () => {
    const { slug } = useParams();
    const job = careersData.find((item) => item.slug === slug);

    if (!job) return <NotFound />;

    const expired = isDeadlinePassed(job.deadline);
    const ideal = splitLabelled(job.roleIdeal);

    const facts = [
        { icon: 'bi bi-briefcase', label: 'Job type', value: job.type },
        { icon: 'bi bi-geo-alt', label: 'Location', value: job.location },
        { icon: 'bi bi-cash-stack', label: 'Pay', value: job.salary },
        { icon: 'bi bi-clock', label: 'Hours', value: job.workTime },
        { icon: 'bi bi-laptop', label: 'Arrangement', value: job.arrangement },
        {
            icon: 'bi bi-calendar-event',
            label: 'Deadline',
            value: job.deadline
                ? `${formatDeadline(job.deadline)}${expired ? ' (closed)' : ''}`
                : null,
            expired,
        },
    ].filter((fact) => fact.value);

    return (
        <>
            <Breadcrumb pageTitle={job.title} breadcrumbItem="Careers" />

            <section className="bm-section bm-doc">
                <div className="bm-container">
                    <div className="bm-doc__layout">
                        <article className="bm-doc__main">
                            <div className="bm-doc__body">
                                {job.aboutUs && (
                                    <>
                                        <h2>About us</h2>
                                        <p>{job.aboutUs}</p>
                                    </>
                                )}

                                {(job.roleIntro || ideal) && (
                                    <>
                                        <h2>The role</h2>
                                        {job.roleIntro && <p>{job.roleIntro}</p>}
                                        {ideal && (
                                            <p className="bm-md-note">
                                                {ideal.label && <strong>{ideal.label}</strong>}
                                                {ideal.body}
                                            </p>
                                        )}
                                    </>
                                )}

                                {job.responsibilities?.length > 0 && (
                                    <>
                                        <h2>What you will do</h2>
                                        <ul>
                                            {job.responsibilities.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {job.requirements?.length > 0 && (
                                    <>
                                        <h2>What we are looking for</h2>
                                        <ul>
                                            {job.requirements.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {job.niceToHave?.length > 0 && (
                                    <>
                                        <h2>Nice to have</h2>
                                        <p className="bm-md-kicker">Not required</p>
                                        <ul>
                                            {job.niceToHave.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {(job.salary || job.workTime || job.arrangement) && (
                                    <>
                                        <h2>Compensation and logistics</h2>
                                        <dl className="bm-md-specs">
                                            {job.salary && (
                                                <div>
                                                    <dt>Pay</dt>
                                                    <dd>{job.salary}</dd>
                                                </div>
                                            )}
                                            {job.workTime && (
                                                <div>
                                                    <dt>Hours</dt>
                                                    <dd>{job.workTime}</dd>
                                                </div>
                                            )}
                                            {job.arrangement && (
                                                <div>
                                                    <dt>Arrangement</dt>
                                                    <dd>{job.arrangement}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </>
                                )}

                                {job.whyJoin && (
                                    <>
                                        <h2>Why join us now</h2>
                                        {job.whyJoin.split('\n\n').map((para) => (
                                            <p key={para.slice(0, 40)}>{para}</p>
                                        ))}
                                    </>
                                )}

                                {job.howToApply && (
                                    <>
                                        <h2>How to apply</h2>
                                        <p>
                                            {job.howToApply.intro}{' '}
                                            <a
                                                href={job.howToApply.formLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {job.howToApply.formLink}
                                            </a>
                                        </p>
                                        {job.howToApply.items?.length > 0 && (
                                            <>
                                                <p className="bm-md-kicker">We will ask you to share</p>
                                                <ul>
                                                    {job.howToApply.items.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </article>

                        <aside className="bm-doc__aside bm-doc__aside--plain">
                            <div>
                                <p className="bm-doc__index-label">Role at a glance</p>
                                <dl className="bm-doc__facts">
                                    {facts.map((fact) => (
                                        <div key={fact.label}>
                                            <dt>
                                                <i className={fact.icon} aria-hidden="true"></i>
                                                {fact.label}
                                            </dt>
                                            <dd className={fact.expired ? 'is-expired' : undefined}>
                                                {fact.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="bm-doc__contact">
                                <p className="bm-doc__contact-label">
                                    {expired ? 'Applications closed' : 'Ready to apply?'}
                                </p>
                                <p className="bm-doc__contact-copy">
                                    {expired
                                        ? 'This role is no longer accepting applications. Other openings are listed on the careers page.'
                                        : 'Send a short intro, your CV and a couple of work samples. We read every application ourselves.'}
                                </p>

                                {expired ? (
                                    <span className="bm-doc__contact-cta is-disabled" aria-disabled="true">
                                        Applications closed
                                    </span>
                                ) : (
                                    <a
                                        className="bm-doc__contact-cta"
                                        href={job.applyLink || '/contact'}
                                        target={job.applyLink ? '_blank' : undefined}
                                        rel={job.applyLink ? 'noopener noreferrer' : undefined}
                                    >
                                        Apply for this role
                                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                    </a>
                                )}
                            </div>

                            <Link to="/careers" className="bm-doc__back">
                                <i className="bi bi-arrow-left" aria-hidden="true"></i>
                                All open roles
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default CareerDetails;
