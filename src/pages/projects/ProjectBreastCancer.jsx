import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const ProjectBreastCancer = () => {
    return (
        <>
            <Breadcrumb pageTitle="Multimodal AI for Breast Cancer Diagnosis" breadcrumbItem="Project" />

            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src="/assets/images/projects/Rad analysis.png" alt="Multimodal AI for Breast Cancer Diagnosis" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h2>Multimodal AI for Breast Cancer Diagnosis</h2>

                                <h3>Project Overview</h3>
                                <p>
                                    This research project, funded by North South University under project ID <strong>CTRG-21-SEPS-15</strong>,
                                    advances breast cancer diagnosis through cutting-edge techniques for precision segmentation and
                                    comprehensive report generation from mammographic images.
                                </p>
                                <p>
                                    Led by <strong>Dr. Mohammad Monir Uddin</strong>, the project leverages advanced image processing
                                    and machine learning methodologies to enhance the accuracy and efficiency of detecting and
                                    characterizing breast abnormalities in mammograms.
                                </p>

                                <h3>Objective and Impact</h3>
                                <p>
                                    The primary objective is to create a robust system capable of <strong>precise segmentation</strong> of
                                    regions of interest in mammographic images, enabling early and accurate identification of
                                    potential cancerous lesions.
                                </p>

                                <h4>Key Goals</h4>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Precision Segmentation</strong>: Identify and isolate abnormalities with 90%+ accuracy</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Comprehensive Reporting</strong>: Generate detailed diagnostic reports for medical professionals</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Early Detection</strong>: Enable identification of lesions at earlier stages than traditional methods</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Clinical Integration</strong>: Seamless workflow integration with existing hospital systems</li>
                                </ul>

                                <h3>The Challenge</h3>
                                <p>
                                    The primary challenge in breast cancer diagnosis lies in accurately identifying and segmenting
                                    subtle abnormalities in mammographic images while minimizing false positives. Traditional methods
                                    often result in high false positive rates (70–80%), missed early-stage lesions, inter-observer
                                    variability among radiologists, and time-intensive manual analysis.
                                </p>

                                <h3>Our Solution</h3>
                                <p>
                                    Our solution leverages <strong>multimodal AI techniques</strong> combining advanced deep learning
                                    architectures with medical domain knowledge to achieve precise segmentation and generate
                                    comprehensive diagnostic reports that aid radiologists in making informed decisions.
                                </p>

                                <h3>Project Benefits</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Enhanced accuracy in detecting breast abnormalities using state-of-the-art AI models</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Early identification of potential cancerous lesions through precision segmentation</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Automated comprehensive report generation for medical professionals</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Improved clinical decision-making with actionable diagnostic insights</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Reduced diagnostic time while maintaining high accuracy standards</li>
                                </ul>

                                <h3>Clinical Workflow Integration</h3>
                                <ol className="project-details-list">
                                    <li><strong>Image Acquisition</strong> — Mammograms captured from standard FWHM-compliant equipment</li>
                                    <li><strong>Automated Analysis</strong> — Real-time processing and segmentation (avg. 45 seconds per case)</li>
                                    <li><strong>Radiologist Review</strong> — AI-assisted interpretation with highlighted regions and preliminary report</li>
                                    <li><strong>Report Finalization</strong> — Radiologist reviews, edits, and approves the final diagnostic report</li>
                                    <li><strong>Patient Communication</strong> — Structured findings communicated to referring physicians</li>
                                </ol>

                                <h3>Future Directions</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> 3D Tomosynthesis Integration — full volumetric analysis</li>
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> Multi-center Validation — deployment across 5+ hospitals</li>
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> Federated Learning — privacy-preserving multi-institutional training</li>
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> Integration with molecular subtype prediction</li>
                                </ul>

                                <h3>Publications</h3>
                                <p>
                                    <strong>Ahmed, I.</strong> et al. "OncoVision: Integrating Mammography and Clinical Data through
                                    Attention-Driven Multimodal AI for Enhanced Breast Cancer Diagnosis" —{' '}
                                    <em>Nature Communications Medicine</em> (Under Review)
                                </p>

                                <h3>Team and Collaboration</h3>
                                <p>
                                    <strong>Principal Investigator:</strong> Dr. Mohammad Monir Uddin<br />
                                    <strong>Research Institution:</strong> North South University<br />
                                    <strong>Industry Partner:</strong> Big-Matrix Solutions
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="project-details-right">
                                <div className="project-details-info">
                                    <p>Client :</p>
                                    <h6>North South University</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Category :</p>
                                    <h6>AI in Healthcare</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Starting Date :</p>
                                    <h6>April 2022</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Duration :</p>
                                    <h6>1 Year</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Funding :</p>
                                    <h6>Research Grant (CTRG-21-SEPS-15)</h6>
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

export default ProjectBreastCancer;
