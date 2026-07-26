import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import careersData from '../data/careers.json';
import NotFound from './NotFound';

const CareerDetails = () => {
    const { slug } = useParams();
    const job = careersData.find((j) => j.slug === slug);

    if (!job) return <NotFound />;

    const isDeadlinePassed = (deadline) => {
        if (!deadline) return false;
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(23, 59, 59, 999);
        return new Date() > deadlineDate;
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        return new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const expired = job.deadline && isDeadlinePassed(job.deadline);

    return (
        <>
            <Breadcrumb pageTitle={job.title} breadcrumbItem="Careers" />

            <div className="career-details-area inner-style">
                <div className="container">
                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="career-details-content">

                                <div className="career-details-header">
                                    <h2 className="career-details-title">{job.title}</h2>
                                    <div className="career-details-meta">
                                        <span className="job-badge">{job.type}</span>
                                        <span className="job-location">
                                            <i className="bi bi-geo-alt"></i> {job.location}
                                        </span>
                                    </div>
                                </div>

                                <p className="career-details-intro">{job.desc}</p>

                                {job.responsibilities && job.responsibilities.length > 0 && (
                                    <div className="career-section">
                                        <h4 className="career-section-title">What You'll Do</h4>
                                        <ul className="career-list">
                                            {job.responsibilities.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {job.requirements && job.requirements.length > 0 && (
                                    <div className="career-section">
                                        <h4 className="career-section-title">What We're Looking For</h4>
                                        <ul className="career-list">
                                            {job.requirements.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {job.niceToHave && job.niceToHave.length > 0 && (
                                    <div className="career-section">
                                        <h4 className="career-section-title">Nice to Have</h4>
                                        <ul className="career-list">
                                            {job.niceToHave.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="career-sidebar">
                                <div className="career-sidebar-card">
                                    <h5 className="sidebar-card-title">Job Overview</h5>

                                    <ul className="sidebar-overview-list">
                                        {job.type && (
                                            <li>
                                                <i className="bi bi-briefcase"></i>
                                                <div>
                                                    <span className="overview-label">Job Type</span>
                                                    <span className="overview-value">{job.type}</span>
                                                </div>
                                            </li>
                                        )}
                                        {job.location && (
                                            <li>
                                                <i className="bi bi-geo-alt"></i>
                                                <div>
                                                    <span className="overview-label">Location</span>
                                                    <span className="overview-value">{job.location}</span>
                                                </div>
                                            </li>
                                        )}
                                        {job.salary && (
                                            <li>
                                                <i className="bi bi-cash-coin"></i>
                                                <div>
                                                    <span className="overview-label">Salary</span>
                                                    <span className="overview-value">{job.salary}</span>
                                                </div>
                                            </li>
                                        )}
                                        {job.workTime && (
                                            <li>
                                                <i className="bi bi-clock"></i>
                                                <div>
                                                    <span className="overview-label">Hours</span>
                                                    <span className="overview-value">{job.workTime}</span>
                                                </div>
                                            </li>
                                        )}
                                        {job.deadline && (
                                            <li>
                                                <i className="bi bi-calendar-event"></i>
                                                <div>
                                                    <span className="overview-label">Deadline</span>
                                                    <span className={`overview-value${expired ? ' text-danger' : ''}`}>
                                                        {formatDeadline(job.deadline)}
                                                        {expired && ' (Closed)'}
                                                    </span>
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    <div className="sidebar-apply">
                                        {expired ? (
                                            <span className="apply-btn apply-btn--disabled w-100 text-center" aria-disabled="true">
                                                Applications Closed
                                            </span>
                                        ) : (
                                            <a
                                                href={job.applyLink || '/contact'}
                                                className="apply-btn w-100 text-center"
                                                target={job.applyLink ? '_blank' : undefined}
                                                rel={job.applyLink ? 'noopener noreferrer' : undefined}
                                            >
                                                Apply Now
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <Link to="/careers" className="back-to-careers">
                                    <i className="bi bi-arrow-left"></i> Back to Careers
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CareerDetails;
