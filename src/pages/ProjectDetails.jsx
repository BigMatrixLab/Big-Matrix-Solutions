import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
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
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="project-details-content">
                                        <h4>Intro of the project</h4>
                                        <p className="project-details-desc">{project.desc}</p>
                                        <p className="project-details-desc">{project.longDesc}</p>

                                        <h3>Challenge and solution</h3>
                                        <p className="project-details-desc">Innovate wireless e-markets for inexpensive e-markets. Monotonectally grow progressive processes before seamless ideas facilitate an expanded array of scenarios rather than backend users.</p>

                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="project-details-item-images">
                                                    <img src="/assets/images/inner-images/project-1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="project-details-list-item">
                                                    <h4>Project Benefits</h4>
                                                    <ul>
                                                        <li><i className="bi bi-check-circle-fill"></i>Innovate wireless market</li>
                                                        <li><i className="bi bi-check-circle-fill"></i>Productivate resource sucking</li>
                                                        <li><i className="bi bi-check-circle-fill"></i>Proactively unleash oriented communities</li>
                                                        <li><i className="bi bi-check-circle-fill"></i>Credibly develop progressive archi</li>
                                                        <li><i className="bi bi-check-circle-fill"></i>Phosfluorescently to customer</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-details-text">
                                            <p>Competently architect intermandated deliverables client niches continually underwhelm</p>
                                        </div>

                                        <p className="project-details-desc">Appropriately communicate economically sound e-commerce after enterprise services. Dramatically target cross-media solutions and error-free platforms.</p>
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
                                        <div className="project-details-info">
                                            <p>Project Value :</p>
                                            <h6>{project.value || "$6,500.00"}</h6>
                                        </div>
                                    </div>
                                    <div className="widget-sidber-contact-box">
                                        <div className="widget-sidber-contact">
                                            <img src="/assets/images/inner-images/sidber-cont-icon.png" alt="" />
                                        </div>
                                        <p className="widget-sidber-contact-text">Call Us Anytime</p>
                                        <h3 className="widget-sidber-contact-number">+123 (4567) 890</h3>
                                        <span className="widget-sidber-contact-gmail"><i className="bi bi-envelope-fill"></i> info@bigmatrix.com</span>
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

            {/* Similar Projects Area */}
            <div className="project-area inner-style">
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
            </div>

        </>
    );
};

export default ProjectDetails;
