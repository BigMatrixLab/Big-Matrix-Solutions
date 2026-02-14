import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

import projectData from '../data/projects.json';

const Project = () => {
    const projects = projectData;

    return (
        <>
            <Breadcrumb pageTitle="Our Project" breadcrumbItem="Project" />

            {/* Project Area */}
            <div className="project-area inner-style" style={{paddingTop: "50px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                 <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Latest Work</h2>
                                <h1>Similar Completed Projects</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {projects.map((item, index) => (
                            <div className="col-lg-4 col-md-6 d-flex" key={index}>
                                <div className="single-project-box w-100">
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

           

        </>
    );
};

export default Project;
