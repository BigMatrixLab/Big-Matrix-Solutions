import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { projectData } from '../data/content';

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
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="project-details-content">
                                        {/* Render markdown content if contentFile exists, otherwise fallback to JSON structure */}
                                        {project.contentFile ? (
                                            <MarkdownRenderer contentFile={project.contentFile} />
                                        ) : (
                                            <>
                                                <h4>Intro of the project</h4>
                                                <p className="project-details-desc">{project.desc}</p>
                                                <p className="project-details-desc">{project.longDesc}</p>

                                                {/* Challenge Section - Optional */}
                                                {project.challengeSection && (
                                                    <>
                                                        <h3>{project.challengeSection.heading}</h3>
                                                        <p className="project-details-desc">{project.challengeSection.content}</p>
                                                    </>
                                                )}

                                                {/* Benefits List - Optional */}
                                                {project.benefitsList && project.benefitsList.length > 0 && (
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="project-details-list-item">
                                                                <h4>Project Benefits</h4>
                                                                <ul>
                                                                    {project.benefitsList.map((benefit, index) => (
                                                                        <li key={index}>
                                                                            <i className="bi bi-check-circle-fill"></i>{benefit}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Additional Sections - Optional */}
                                                {project.additionalSections && project.additionalSections.map((section, index) => (
                                                    <div key={index}>
                                                        <h3>{section.heading}</h3>
                                                        <p className="project-details-desc">{section.content}</p>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="project-details-right">
                                        <div className="project-details-info">
                                            <p>Clients :</p>
                                            <h6>{project.client}</h6>
                                        </div>
                                        <div className="project-details-info">
                                            <p>Category :</p>
                                            <h6>{project.category}</h6>
                                        </div>
                                        <div className="project-details-info">
                                            <p>Starting Date :</p>
                                            <h6>{project.date}</h6>
                                        </div>
                                        <div className="project-details-info">
                                            <p>Location :</p>
                                            <h6>{project.location}</h6>
                                        </div>
                                     
                                    </div>
                                    <div className="widget-sidber-contact-box">
                                        <div className="widget-sidber-contact">
                                            <img src="/assets/images/inner-images/sidber-cont-icon.png" alt="" />
                                        </div>
                                        <p className="widget-sidber-contact-text">Call Us Anytime</p>
                                        <h3 className="widget-sidber-contact-number">+880-2-55668200 (Ext: 6212)</h3>
                                        <span className="widget-sidber-contact-gmail"><i className="bi bi-envelope-fill"></i> contact@big-matrix.com</span>
                                        <div className="widget-sidber-contact-btn">
                                            <Link to="/contact">Contact Us <i className="bi bi-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Projects Area
            <div className="project-area inner-style project-details-similar-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                <h4>latest works </h4>
                                <h1>Similar Completed Projects</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {projectData.filter(p => p.slug !== slug).slice(0, 3).map((item, index) => (
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
            </div> */}

        </>
    );
};

export default ProjectDetails;
