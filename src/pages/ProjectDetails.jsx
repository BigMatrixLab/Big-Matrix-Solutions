import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';
import projectData from '../data/projects.json';

const ProjectDetails = () => {
    const { slug } = useParams();
    const project = projectData.find(p => p.slug === slug);

    if (!project) {
        return (
            <>
                <Breadcrumb pageTitle="Project Not Found" breadcrumbItem="Project" />
                <div className="project-details-area">
                    <div className="container text-center">
                        <h2>Project not found</h2>
                        <Link to="/project" className="btn btn-primary mt-4">Back to Projects</Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb pageTitle={project.title} breadcrumbItem="Project" />

            {/* Project Details Area */}
            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src={project.image} alt={project.title} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h4 className="project-details-title">{project.title}</h4>
                                <p className="project-details-desc">{project.desc}</p>
                                <p className="project-details-desc">{project.longDesc}</p>

                                <div className="row mt-4">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="project-details-inner-thumb">
                                            <img src="/assets/images/inner-images/project-1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="project-details-inner-thumb">
                                            <img src="/assets/images/inner-images/project-2.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="project-details-title">What the Benefits?</h4>
                                <p className="project-details-desc">{project.benefits}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="project-details-sidebar">
                                <div className="project-details-sidebar-content">
                                    <h4>Project Information</h4>
                                    <ul>
                                        <li><span>Category :</span> {project.category}</li>
                                        <li><span>Client :</span> {project.client}</li>
                                        <li><span>Date :</span> {project.date}</li>
                                        <li><span>Location :</span> {project.location}</li>
                                        <li><span>Duration :</span> {project.duration}</li>
                                    </ul>
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

export default ProjectDetails;
