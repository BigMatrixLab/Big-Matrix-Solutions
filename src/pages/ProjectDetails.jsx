import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const ProjectDetails = () => {
    return (
        <>
            <Breadcrumb pageTitle="Project Details" breadcrumbItem="Project" />

            {/* Project Details Area */}
            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src="/assets/images/inner-images/project-details.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h4 className="project-details-title">Appropriately engage leading-edge</h4>
                                <p className="project-details-desc">Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment. Dramatically architect go forward opportunities before user-centric partnerships. Credibly implement exceptional </p>
                                <p className="project-details-desc">Continually fashion orthogonal leadership skills whereas wireless metrics. Uniquely syndicate exceptional opportunities with interdependent users. Globally enhance fully tested meta-services rather than pandemic solutions. Proactively integrate client-integrate go forward architectures and turnkey meta-services. Interactively harness integrated ROI whereas frictionless products.</p>

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
                                <p className="project-details-desc">Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment. Dramatically architect go forward opportunities </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="project-details-sidebar">
                                <div className="project-details-sidebar-content">
                                    <h4>Project Information</h4>
                                    <ul>
                                        <li><span>Category :</span> IT Solution</li>
                                        <li><span>Client :</span> Big-Matrix Solutions</li>
                                        <li><span>Date :</span> 20 March, 2024</li>
                                        <li><span>Location :</span> New York, USA</li>
                                        <li><span>Duration :</span> 6 Months</li>
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
