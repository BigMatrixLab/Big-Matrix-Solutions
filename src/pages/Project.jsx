import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

import projectData from '../data/projects.json';

const Project = () => {
    const projects = projectData;

    return (
        <>
            <Breadcrumb pageTitle="Our Project" breadcrumbItem="Project" />

            {/* Project Area */}
            <div className="project-area inner-style">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                <h4>latest works</h4>
                                <h1>Similar Completed Projects</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {projects.map((item, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="single-project-box">
                                    <div className="project-thumb">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="project-content">
                                        <h4>{item.title}</h4>
                                        <Link to={`/project/${item.slug}`}>{item.category}</Link>
                                        <Link className="project-button" to={`/project/${item.slug}`}>View Details<i className="bi bi-arrow-right-short"></i></Link>
                                        <div className="project-shape">
                                            <img src="/assets/images/inner-images/project-shape.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscribe Area */}
            <div className="subscribe-area style-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="section-title left inner-style">
                                <h1>Get Latest Update from Big-Matrix Solutions</h1>
                                <h1>Stay Connected with Us</h1>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                <div className="single-subscribe-box">
                                    <input type="text" name="Email" placeholder="Enter your Email" required />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Area Style Three */}
            <div className="process-area style-three inner">
                <div className="container">
                    <div className="row add-bg">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-1.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Account Register</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-2.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Add New Card</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-3.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Varyfied Account</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default Project;
