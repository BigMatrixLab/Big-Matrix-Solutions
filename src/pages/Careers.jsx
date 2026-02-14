import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import careersData from '../data/careers.json';

const Careers = () => {
    const jobs = careersData;

    return (
        <>
            <Breadcrumb pageTitle="Careers" breadcrumbItem="Careers" />

            <div className="careers-area inner-style">
                <div className="container">
                    <div className="row career-header align-items-center">
                        <div className="col-lg-6">
                            <h2 className="header-title">Inspire and Get Inspired by <span>Professional Experts</span></h2>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <p className="header-desc">
                                Our platform is tailor-made for developers, providing a
                                powerful and <span>easy-to-use</span> solution. With our tools, you can
                                streamline your process.
                            </p>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-12">
                            <div className="job-list-wrapper">
                                {jobs.map((job, index) => (
                                    <div className="job-row-item" key={index}>
                                        <div className="row align-items-center">
                                            <div className="col-lg-3">
                                                <div className="job-meta">
                                                    <span className="job-badge">{job.type}</span>
                                                    <span className="job-location">{job.location}</span>
                                                </div>
                                                <h4 className="job-title">{job.title}</h4>
                                            </div>
                                            <div className="col-lg-6">
                                                <p className="job-description">{job.desc}</p>
                                                {job.salary && <p className="job-info"><strong>Salary:</strong> {job.salary}</p>}
                                                {job.workTime && <p className="job-info"><strong>Work Time:</strong> {job.workTime}</p>}
                                            </div>
                                            <div className="col-lg-3 text-lg-end">
                                                <a href="/contact" className="apply-btn">Apply Now</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Careers;
