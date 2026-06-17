import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const ProjectScriptor = () => {
    return (
        <>
            <Breadcrumb pageTitle="Scriptor" breadcrumbItem="Project" />

            <div className="project-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src="/assets/images/projects/Scriptor.png" alt="Scriptor Workspace" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h2>Scriptor — Your Ultimate Workspace for Note, Code, Research & Ideation</h2>

                                <h3>Project Overview</h3>
                                <p>
                                    Scriptor is a professional all-in-one research and writing workspace currently in public beta
                                    and free to use. It unifies LaTeX editing, Markdown rendering, infinite whiteboarding, PDF
                                    annotation, and a knowledge graph into a single keyboard-navigable, distraction-free
                                    environment — inspired by VS Code and built for researchers, students, engineers, and writers.
                                </p>
                                <p>
                                    Developed and powered by Big-Matrix Solutions, Scriptor eliminates the need to juggle
                                    Overleaf, Notion, Excalidraw, and a PDF reader by bringing them all under one roof.
                                </p>

                                <h3>Core Features</h3>

                                <h4>Pro-Level LaTeX Editor</h4>
                                <p>
                                    A full Overleaf-class editor running natively in the browser. Users can upload existing
                                    projects, compile in real-time, and choose from over 6,000 built-in templates covering
                                    journal articles, theses, CVs, posters, reports, and more — including formats for IEEE,
                                    ACM, and Nature.
                                </p>

                                <h4>Real-Time Markdown</h4>
                                <p>
                                    Write in Markdown and see a pixel-perfect live render update as you type. Supports GitHub
                                    Flavored Markdown (GFM), math blocks, syntax highlighting, and custom CSS themes.
                                </p>

                                <h4>Best-in-Class Whiteboarding</h4>
                                <p>
                                    Powered by Excalidraw, Scriptor offers an infinite canvas for diagrams and sketches, plus
                                    a paged mode for structured visual notes and presentations.
                                </p>

                                <h4>Smart PDF Annotation</h4>
                                <p>
                                    Open any PDF and annotate directly with an Excalidraw overlay — highlight, comment, and
                                    compare without leaving the workspace.
                                </p>

                                <h4>Knowledge Graph</h4>
                                <p>
                                    Visually map connections between notes, documents, and projects. Discover insights that
                                    are impossible to find in a flat file system.
                                </p>

                                <h3>Workspace Experience</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Split-View Editing</strong> — work on LaTeX, Markdown, and PDFs side-by-side with drag-and-drop panels</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Multi-Project Tabs</strong> — switch between research papers, codebases, and whiteboards instantly</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Tag-Based Organization</strong> — categorize every project with custom tags for instant filtering and search</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Centralized Dashboard</strong> — manage every file, project, and collaborator from one command center</li>
                                </ul>

                                <h3>Collaboration & Security</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Invite collaborators with Editor or Viewer privileges</li>
                                    <li><i className="bi bi-check-circle-fill"></i> All shared projects encrypted in transit and at rest</li>
                                    <li><i className="bi bi-check-circle-fill"></i> SOC 2-ready infrastructure with full audit logs</li>
                                </ul>

                                <h3>Target Users</h3>
                                <p>
                                    Scriptor is built for students, researchers, developers, engineers, and writers who want
                                    to run their full workflow — from drafting and coding to diagramming and publishing —
                                    without switching between multiple tools.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="project-details-right">
                                <div className="project-details-info">
                                    <p>Product :</p>
                                    <h6>Scriptor</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Category :</p>
                                    <h6>SaaS / Research Workspace</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Status :</p>
                                    <h6>Public Beta — Free to Use</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Developed by :</p>
                                    <h6>Big-Matrix Solutions</h6>
                                </div>
                                <div className="project-details-info">
                                    <p>Live at :</p>
                                    <h6>
                                        <a href="https://scriptor.space/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                                            scriptor.space
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

export default ProjectScriptor;
