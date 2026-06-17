import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const ProjectAutoContouring = () => {
    return (
        <>
            <Breadcrumb pageTitle="Auto Contouring Software" breadcrumbItem="Project" />

            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img
                                    src="/assets/images/projects/lung ct segmentation and report generation.png"
                                    alt="Auto Contouring Software"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h2>Auto Contouring Software — Automated Radiotherapy Contouring & Treatment Planning</h2>

                                <h3>Project Overview</h3>
                                <p>
                                    This project involves the development of AI systems for automatic organ-at-risk (OAR)
                                    and tumor contour segmentation, treatment planning assistance, dose prediction, and
                                    quality assurance across multiple cancer sites. The system is designed to reduce the
                                    time and variability in manual contouring while maintaining clinical accuracy and
                                    consistency across radiotherapy workflows.
                                </p>

                                <h3>Cancer Sites Covered</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Breast cancer</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Cervix cancer</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Lung cancer</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Brain cancer</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Head and neck cancers</li>
                                </ul>

                                <h3>Core Capabilities</h3>

                                <h4>Organ-at-Risk & Tumor Segmentation</h4>
                                <p>
                                    AI-driven automatic segmentation of organs-at-risk and tumor volumes from CT and MRI
                                    scans, delivering radiologist-level contours in a fraction of the time required for
                                    manual delineation.
                                </p>

                                <h4>Treatment Planning Assistance</h4>
                                <p>
                                    Intelligent planning support that guides dosimetrists and radiation oncologists by
                                    suggesting optimal beam arrangements and dose distributions based on patient anatomy
                                    and clinical protocols.
                                </p>

                                <h4>Dose Prediction</h4>
                                <p>
                                    Deep learning models predict the expected dose distribution for a given plan,
                                    enabling rapid plan quality checks and reducing iteration cycles between planning
                                    and physics review.
                                </p>

                                <h4>Quality Assurance</h4>
                                <p>
                                    Automated QA tools flag deviations from clinical guidelines, detect outlier contours,
                                    and ensure consistency across treatment plans before they reach the patient.
                                </p>

                                <h3>Clinical Impact</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Significant reduction in contouring time per patient</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Reduced inter-observer variability in OAR delineation</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Faster treatment planning cycles for high-volume radiotherapy centers</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Consistent plan quality through automated QA flagging</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Supports integration with standard radiotherapy treatment planning systems (TPS)</li>
                                </ul>

                                <h3>Technology</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-code-slash"></i> Deep learning segmentation models (CNN, Transformer-based architectures)</li>
                                    <li><i className="bi bi-database"></i> CT and MRI volumetric image processing pipelines</li>
                                    <li><i className="bi bi-gear"></i> DICOM-compatible I/O for TPS integration</li>
                                    <li><i className="bi bi-shield-check"></i> Clinical validation against expert oncologist contours</li>
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="project-details-right">
                                <div className="project-details-info">
                                    <p>Category :</p>
                                    <h6>Medical AI / Radiotherapy</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Domain :</p>
                                    <h6>Oncology & Radiation Therapy</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Status :</p>
                                    <h6>In Development</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Developed by :</p>
                                    <h6>Big-Matrix Solutions</h6>
                                </div>
                            </div>

                            <div className="widget-sidber-contact-box">
                                <div className="widget-sidber-contact">
                                    <img src="/assets/images/inner-images/sidber-cont-icon.png" alt="" />
                                </div>
                                <p className="widget-sidber-contact-text">Call Us Anytime</p>
                                <h3 className="widget-sidber-contact-number">+880-2-55668200 (Ext: 6212)</h3>
                                <span className="widget-sidber-contact-gmail">
                                    <i className="bi bi-envelope-fill"></i> contact@big-matrix.com
                                </span>
                                <div className="widget-sidber-contact-btn">
                                    <Link to="/contact">Contact Us <i className="bi bi-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectAutoContouring;
