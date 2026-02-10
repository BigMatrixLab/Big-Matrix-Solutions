import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const Careers = () => {
    const jobs = [
        { title: "Software Engineer", location: "New York, USA", type: "Full Time" },
        { title: "UI/UX Designer", location: "Remote", type: "Part Time" },
        { title: "Project Manager", location: "London, UK", type: "Full Time" },
    ];

    return (
        <>
            <Breadcrumb pageTitle="Careers" breadcrumbItem="Careers" />

            <div className="careers-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center">
                                <h4>Join Our Team</h4>
                                <h1>Available Job Openings</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {jobs.map((job, index) => (
                            <div className="col-lg-12" key={index}>
                                <div className="single-job-box d-flex align-items-center justify-content-between">
                                    <div className="job-content">
                                        <h4>{job.title}</h4>
                                        <span><i className="bi bi-geo-alt"></i>{job.location} | <i className="bi bi-clock"></i>{job.type}</span>
                                    </div>
                                    <div className="job-button">
                                        <a href="/contact" className="btn btn-primary">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default Careers;
