import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import careersData from '../data/careers.json';

const Careers = () => {
    const jobs = careersData;

    const isDeadlinePassed = (deadline) => {
        if (!deadline) return false;
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(23, 59, 59, 999);
        return new Date() > deadlineDate;
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        return new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <>
            <Breadcrumb
                pageTitle="Build systems that matter"
                breadcrumbItem="Careers"
            />

            <div className="careers-area inner-style">
                <div className="container">
                    <div className="row career-header align-items-center">
                        <div className="col-lg-6">
                            <h2 className="header-title">Open <span>Positions</span></h2>
                            <p className="header-desc">We're hiring — explore the roles below and find where you fit in.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="job-list-wrapper">
                                {jobs.map((job, index) => {
                                    const expired = job.deadline && isDeadlinePassed(job.deadline);
                                    return (
                                        <div className="job-row-item" key={index}>
                                            <div className="row align-items-start">
                                                <div className="col-lg-3">
                                                    <h4 className="job-title">{job.title}</h4>
                                                    <div className="job-meta">
                                                        <span className="job-badge">{job.type}</span>
                                                        <span className="job-location">{job.location}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <p className="job-description">{job.desc}</p>
                                                    {job.salary && <p className="job-info"><strong>Salary:</strong> {job.salary}</p>}
                                                    {job.workTime && <p className="job-info"><strong>Work Time:</strong> {job.workTime}</p>}
                                                    {job.deadline && (
                                                        <p className="job-deadline">
                                                            <strong>Deadline:</strong> {formatDeadline(job.deadline)}
                                                            {expired && <span className="deadline-passed"> (Closed)</span>}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col-lg-3 text-lg-end">
                                                    {expired ? (
                                                        <span className="view-details-btn view-details-btn--disabled" aria-disabled="true">
                                                            View Details
                                                        </span>
                                                    ) : (
                                                        <Link to={`/careers/${job.slug}`} className="view-details-btn">
                                                            View Details
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Careers;
