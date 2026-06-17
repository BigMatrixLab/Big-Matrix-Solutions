import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const ProjectManagement = () => {
    return (
        <>
            <Breadcrumb pageTitle="Big-Matrix Project Management Platform" breadcrumbItem="Project" />

            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src="/assets/images/projects/PM-Dashboard.jpeg" alt="Big-Matrix Project Management Platform" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h2>Big-Matrix Project Management Platform</h2>

                                <h3>Project Overview</h3>
                                <p>
                                    This is an internal project management platform built by our R&D team to help manage
                                    ongoing development work across multiple internal projects.
                                </p>
                                <p>
                                    The goal is to keep task tracking, deadlines, and team coordination in one place so we
                                    don't rely on scattered tools like spreadsheets, chat threads, and separate trackers.
                                </p>

                                <h3>Problem Statement</h3>
                                <p>Before this system, we faced common internal workflow issues:</p>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-x-circle-fill" style={{ color: '#ED352D' }}></i> Tasks were tracked in multiple places, making it hard to follow progress</li>
                                    <li><i className="bi bi-x-circle-fill" style={{ color: '#ED352D' }}></i> Deadlines were often missed or updated manually</li>
                                    <li><i className="bi bi-x-circle-fill" style={{ color: '#ED352D' }}></i> It was difficult to understand who is working on what</li>
                                    <li><i className="bi bi-x-circle-fill" style={{ color: '#ED352D' }}></i> Project status updates required frequent manual coordination</li>
                                    <li><i className="bi bi-x-circle-fill" style={{ color: '#ED352D' }}></i> Resource workload was not clearly visible across team members</li>
                                </ul>

                                <h3>Our Solution</h3>
                                <p>The platform was designed as a simple system to centralize project work. It provides:</p>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Task creation and assignment with deadlines</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Project and task-level progress tracking</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Team workload visibility</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Centralized updates for ongoing work</li>
                                    <li><i className="bi bi-check-circle-fill"></i> A single place to view active projects and their status</li>
                                </ul>

                                <h3>Technology Stack</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-code-slash"></i> <strong>React</strong> — frontend interface</li>
                                    <li><i className="bi bi-server"></i> <strong>Django</strong> — backend APIs and business logic</li>
                                    <li><i className="bi bi-database"></i> <strong>MySQL</strong> — data storage</li>
                                </ul>

                                <h3>Key Capabilities</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Task and deadline tracking</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Project and task-level organization of work</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Team coordination and clear visibility of workload</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Dashboard for overall progress</li>
                                </ul>

                                <h3>Purpose and Scope</h3>
                                <p>
                                    This platform is designed to reduce manual coordination effort and make project tracking
                                    more structured. It helps centralize ongoing work, improve deadline visibility, and give
                                    teams a clearer understanding of task responsibility and progress across projects. As a
                                    result, overall team efficiency has improved, with smoother collaboration and fewer
                                    delays in day-to-day execution.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="project-details-right">
                                <div className="project-details-info">
                                    <p>Client :</p>
                                    <h6>Big-Matrix Solutions (Internal R&D)</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Category :</p>
                                    <h6>Project Management</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Date :</p>
                                    <h6>February 2026 – April 2026</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Project Demo :</p>
                                    <h6>
                                        <a href="https://pm.big-matrix.com/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                                            pm.big-matrix.com
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

export default ProjectManagement;
