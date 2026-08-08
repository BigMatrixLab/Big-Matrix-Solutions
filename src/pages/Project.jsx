import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';
import { projectData } from '../data/content';

/** "February, 2026 - April, 2026" -> "2026" */
const yearOf = (date) => {
    if (!date) return null;
    const match = String(date).match(/\d{4}/);
    return match ? match[0] : String(date);
};

/** Only treat `location` as a live site when it is actually a URL. */
const liveSiteOf = (location) => {
    if (!location || !/^https?:\/\//i.test(location)) return null;
    try {
        return { href: location, label: new URL(location).hostname.replace(/^www\./, '') };
    } catch {
        return null;
    }
};

const WorkRow = ({ item, index }) => {
    const live = liveSiteOf(item.location);
    const year = yearOf(item.date);
    const to = `/project/${item.slug}`;

    return (
        <article className="bm-work__item">
            <div className="bm-show__mat">
                <div className="bm-show__shot">
                    <img src={item.image} alt={item.title} loading="lazy" />
                </div>
            </div>

            <div className="bm-work__body">
                <p className="bm-work__meta">
                    <em>{String(index + 1).padStart(2, '0')}</em>
                    <span>{item.category}</span>
                </p>

                <h3 className="bm-work__title">
                    <Link to={to}>{item.title}</Link>
                </h3>

                {item.desc && <p className="bm-work__text">{item.desc}</p>}

                <dl className="bm-work__facts">
                    {item.client && (
                        <div>
                            <dt>Built for</dt>
                            <dd>{item.client}</dd>
                        </div>
                    )}
                    {year && (
                        <div>
                            <dt>Year</dt>
                            <dd>{year}</dd>
                        </div>
                    )}
                    {live && (
                        <div>
                            <dt>Live</dt>
                            <dd>
                                <a href={live.href} target="_blank" rel="noopener noreferrer">
                                    {live.label}
                                    <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                                </a>
                            </dd>
                        </div>
                    )}
                </dl>

                <Link to={to} className="bm-button bm-button--ghost bm-work__cta">
                    View case study
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
            </div>
        </article>
    );
};

const Project = () => {
    const projects = projectData;

    return (
        <>
            <Breadcrumb pageTitle="Systems we have shipped" breadcrumbItem="Work" />

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Selected work"
                        title={`${projects.length} systems running in clinics, labs and factories`}
                        lead="Diagnostic tooling, hospital platforms and research software — each one built to survive real operating conditions, not a demo."
                    />

                    <div className="bm-work">
                        {projects.map((item, index) => (
                            <WorkRow item={item} index={index} key={item.id} />
                        ))}
                    </div>
                </div>
            </section>

            <CtaBand
                eyebrow="Build with us"
                title="Have a system like this in mind?"
                description="We take projects from research prototype to production deployment, including regulatory and integration work."
                secondary={{ label: 'Our solutions', to: '/service' }}
            />
        </>
    );
};

export default Project;
