import React, { useEffect, useRef, useState } from 'react';
import '../../assets/css/ProjectShowcase.css';

const NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Capabilities' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'impact', label: 'Impact' },
    { id: 'future', label: 'Future' },
    { id: 'team', label: 'Collaboration' },
];

const heroStats = [
    { icon: 'bi bi-window-stack', num: 'All-in-One', label: 'LaTeX, Markdown, whiteboard, PDF, and knowledge graph in one workspace' },
    { icon: 'bi bi-file-earmark-text', num: '6000+', label: 'Built-in LaTeX templates for journals, theses, CVs, and reports' },
    { icon: 'bi bi-lightning-charge', num: 'Real-Time', label: 'Live compilation and rendering for writing and technical workflows' },
    { icon: 'bi bi-globe2', num: 'Public Beta', label: 'Available now at scriptor.space and free to use' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'Scriptor' },
    { icon: 'bi bi-tag', label: 'Category', value: 'SaaS / Research Workspace' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'Public Beta - Free to Use' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-globe', label: 'Live URL', value: 'scriptor.space' },
];

const challenges = [
    { icon: 'bi bi-diagram-3', title: 'Fragmented Toolchain', desc: 'Researchers and writers switch between multiple apps for drafting, sketching, reading, and organizing knowledge.' },
    { icon: 'bi bi-arrow-repeat', title: 'Context Switching Overhead', desc: 'Frequent app hopping interrupts thought flow, slows iteration, and increases cognitive load.' },
    { icon: 'bi bi-folder-x', title: 'Disconnected Knowledge Assets', desc: 'Notes, PDFs, whiteboards, and references remain siloed, making cross-linking and insight discovery difficult.' },
    { icon: 'bi bi-people', title: 'Collaboration Complexity', desc: 'Sharing and permission management across separate tools creates friction for team-based research work.' },
];

const capabilities = [
    { icon: 'bi bi-braces', title: 'Pro-Level LaTeX Editor', desc: 'Browser-native Overleaf-class editing with upload support, template library, and real-time compile feedback.' },
    { icon: 'bi bi-markdown', title: 'Live Markdown Workspace', desc: 'GFM-compatible authoring with instant rendering, math blocks, syntax highlighting, and customizable themes.' },
    { icon: 'bi bi-easel2', title: 'Infinite Whiteboarding', desc: 'Excalidraw-powered visual workspace with freeform canvas and paged mode for structured ideation.' },
    { icon: 'bi bi-file-earmark-pdf', title: 'Smart PDF Annotation', desc: 'Annotate and review PDFs directly with overlay tooling without leaving the active research context.' },
];

const workflow = [
    { title: 'Project Setup', desc: 'Users initialize a workspace with notes, manuscripts, references, and whiteboards.' },
    { title: 'Parallel Authoring', desc: 'LaTeX and Markdown content are drafted with real-time rendering and preview feedback.' },
    { title: 'Visual Thinking', desc: 'Concepts are mapped using an infinite canvas to connect ideas and structure arguments.' },
    { title: 'Document Review', desc: 'PDF sources are annotated and cross-referenced inside the same working environment.' },
    { title: 'Knowledge Linking', desc: 'Graph-based relationships between notes and documents expose deeper research connections.' },
];

const benefits = [
    'Reduces tool fragmentation by unifying core writing and research workflows in one interface.',
    'Improves productivity through keyboard-first navigation and reduced context switching.',
    'Supports deeper insight discovery with linked notes, documents, and visual graph relationships.',
    'Enables smoother collaboration with role-based sharing for editors and viewers.',
    'Improves trust and governance through encrypted sharing and audit-oriented infrastructure.',
];

const futureDirections = [
    'AI-assisted drafting and summarization workflows for faster manuscript development.',
    'Expanded team collaboration primitives for review pipelines and editorial workflows.',
    'Advanced graph analytics to surface emerging themes across large research datasets.',
    'Template and publishing integrations for discipline-specific academic and technical outputs.',
];

const collaborators = [
    { icon: 'bi bi-code-slash', role: 'Platform Engineering', name: 'Core Product Team', desc: 'Builds editor architecture, rendering pipelines, and workspace performance foundations.' },
    { icon: 'bi bi-journal-richtext', role: 'Research UX', name: 'Workflow Design Team', desc: 'Shapes writing, annotation, and ideation experiences for student and professional users.' },
    { icon: 'bi bi-shield-lock', role: 'Security & Reliability', name: 'Infrastructure Team', desc: 'Maintains encrypted sharing, auditability, and operational quality across collaborative workspaces.' },
];

const ProjectScriptor = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const sectionRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        const nodes = Object.values(sectionRefs.current).filter(Boolean);
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    const registerSection = (id) => (el) => {
        sectionRefs.current[id] = el;
    };

    return (
        <div className="bc-showcase" style={{ paddingTop: '32px' }}>
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-journal-code"></i> Research Productivity Platform
                            </span>
                            <h1>Scriptor: Unified Workspace for Note, Code, Research, and Ideation</h1>
                            <p className="bc-hero-sub">
                                Scriptor is a professional all-in-one workspace that unifies LaTeX editing, Markdown,
                                whiteboarding, PDF annotation, and knowledge graph exploration in a single distraction-free environment.
                            </p>
                        </div>

                        <figure className="bc-hero-figure">
                            <img src="/assets/images/projects/Scriptor.png" alt="Scriptor Workspace" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-stars"></i>
                                <span>
                                    <strong>Deep-work environment</strong>
                                    <span>Write, think, annotate, and connect knowledge</span>
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <div className="bc-stats">
                <div className="bc-container">
                    <div className="bc-stats-grid">
                        {heroStats.map((stat) => (
                            <div className="bc-stat-card" key={stat.num + stat.label}>
                                <span className="bc-stat-icon"><i className={stat.icon}></i></span>
                                <div className="bc-stat-num">{stat.num}</div>
                                <div className="bc-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="bc-section bc-alt" id="challenge" ref={registerSection('challenge')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it matters</span>
                        <h2>The Challenge</h2>
                        <p>
                            Modern technical work requires writing, ideation, annotation, and synthesis, yet these
                            workflows are typically fragmented across disconnected tools.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
                        {challenges.map((item) => (
                            <div className="bc-card bc-problem" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bc-section" id="solution" ref={registerSection('solution')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The approach</span>
                        <h2>Core Capabilities</h2>
                        <p>
                            Scriptor combines professional authoring, visual thinking, and knowledge management tools
                            into one coherent workspace.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
                        {capabilities.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bc-section bc-alt" id="workflow" ref={registerSection('workflow')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it works</span>
                        <h2>Workspace Flow</h2>
                        <p>From drafting to insight discovery, every stage is designed to keep users in one continuous creative context.</p>
                    </div>

                    <div className="bc-timeline">
                        {workflow.map((step, index) => (
                            <div className="bc-step" key={step.title}>
                                <div className="bc-step-num">{index + 1}</div>
                                <div className="bc-step-body">
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bc-section" id="impact" ref={registerSection('impact')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Key outcomes</span>
                        <h2>Workspace Experience and Impact</h2>
                        <p>Designed to improve deep-focus productivity, collaboration, and long-form technical thinking.</p>
                    </div>

                    <div className="bc-grid bc-grid-2">
                        {benefits.map((benefit) => (
                            <div className="bc-benefit" key={benefit}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bc-section bc-alt" id="future" ref={registerSection('future')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What&apos;s next</span>
                        <h2>Future Direction</h2>
                        <p>The roadmap expands intelligent assistance, collaboration depth, and advanced research graph capabilities.</p>
                    </div>

                    <div className="bc-grid bc-grid-2" style={{ marginBottom: '40px' }}>
                        {futureDirections.map((item) => (
                            <div className="bc-future-card" key={item}>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bc-pub">
                        <span className="bc-pub-icon"><i className="bi bi-rocket-takeoff"></i></span>
                        <div>
                            <div className="bc-pub-label">Try It Live</div>
                            <h4>Scriptor Public Beta is available now</h4>
                            <p>
                                Experience the integrated research and writing workspace built for technical teams,
                                students, and knowledge professionals.
                            </p>
                            <a className="bc-pub-status" href="https://scriptor.space/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-box-arrow-up-right"></i> scriptor.space
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bc-section" id="team" ref={registerSection('team')}>
                <div className="bc-container">
                    <div className="bc-section-head bc-center">
                        <span className="bc-eyebrow" style={{ justifyContent: 'center' }}>Collaboration</span>
                        <h2>Product and Delivery Teams</h2>
                        <p>Built through close collaboration between platform engineering, research UX, and secure infrastructure teams.</p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {collaborators.map((member) => (
                            <div className="bc-team-card" key={member.name}>
                                <div className="bc-team-avatar"><i className={member.icon}></i></div>
                                <div className="bc-team-role">{member.role}</div>
                                <h4>{member.name}</h4>
                                <p>{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectScriptor;
