import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { projectData } from '../data/content';
import ProjectCard from '../components/ProjectCard';
import CtaBand from '../components/CtaBand';

const Project = () => {
    const projects = projectData;

    return (
        <>
            <Breadcrumb
                pageTitle="Systems we have shipped"
                breadcrumbItem="Work"
                description="Diagnostic tooling, hospital platforms and research software running in real clinical and industrial settings."
            />

            {/* Project Area */}
            <div className="project-area inner-style project-page-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-title left inner-style">
                                <h2>Latest work</h2>
                                <h1>Completed projects</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bm-grid">
                        {projects.map((item) => (
                            <ProjectCard item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>

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
