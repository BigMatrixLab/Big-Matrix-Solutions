import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const ProjectXRaySegmentation = () => {
    return (
        <>
            <Breadcrumb pageTitle="X-Ray Segmentation Editor" breadcrumbItem="Project" />

            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src="/assets/images/projects/x-ray-segmentation-editor.png" alt="X-Ray Segmentation Editor" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h2>X-Ray Segmentation Editor</h2>

                                <h3>Project Overview</h3>
                                <p>
                                    <strong>X-Ray Segmentation Editor</strong> is an interactive workspace for reviewing,
                                    correcting, and packaging chest X-ray segmentations. It blends automatic anatomy
                                    detection with lightweight manual touch-ups so clinical and research teams can create
                                    reliable mask sets without diving into code.
                                </p>

                                <h3>Key Goals</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Quickly turn a single chest X-ray into labeled anatomy masks with an AI helper</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Standardize how cases are stored and shared (images, masks, overlays, manifest) in one bundle</li>
                                </ul>

                                <h3>Technical Capabilities</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Upload & auto-segment:</strong> Drop in a chest X-ray, get color-coded anatomy layers instantly</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Manual refinement:</strong> Brush/erase tools, segment selection, and undo/redo to fix problem areas</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>View controls:</strong> Show/hide segments and reorder layers for clear overlays</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Case loading and export:</strong> Open a saved ZIP or export your current work as a shareable package</li>
                                </ul>

                                <h3>Impact</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Speed:</strong> Auto-segmentation gives a solid starting point; edits focus only on what needs fixing</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Consistency:</strong> Colors, segment names, and file structure stay uniform across sessions and exports</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Shareability:</strong> Everything needed to reopen a case ships together, avoiding broken links or missing files</li>
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="project-details-right">
                                <div className="project-details-info">
                                    <p>Client :</p>
                                    <h6>Healthcare Partner</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Category :</p>
                                    <h6>Medical AI Tools</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Year :</p>
                                    <h6>2026</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Status :</p>
                                    <h6>Ongoing</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Project Demo :</p>
                                    <h6>
                                        <a href="https://segmentation-editor.pages.dev/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                                            segmentation-editor.pages.dev
                                        </a>
                                    </h6>
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

export default ProjectXRaySegmentation;
