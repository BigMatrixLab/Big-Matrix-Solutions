import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { projectData } from '../data/content';
import ProjectCard from '../components/ProjectCard';

const Project = () => {
    const projects = projectData;

    return (
        <>
            <Breadcrumb pageTitle="Our Project" breadcrumbItem="Project" />

            {/* Project Area */}
            <div className="project-area inner-style project-page-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                <h2 style={{ color: "#0C5ADB", paddingBottom: "10px" }}>Latest Work</h2>
                                <h1>Similar Completed Projects</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {projects.map((item, index) => (
                            <div className="col-lg-4 col-md-6 d-flex" key={index}>
                                <ProjectCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>



        </>
    );
};

export default Project;
