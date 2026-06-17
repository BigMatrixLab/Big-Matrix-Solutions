import React, { useEffect, useRef, useState } from 'react';
import '../../assets/css/ProjectShowcase.css';

const NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'impact', label: 'Impact' },
    { id: 'future', label: 'Future' },
    { id: 'team', label: 'Team' },
];

const heroStats = [
    { icon: 'bi bi-kanban', num: '1 Hub', label: 'Centralized workspace for projects, tasks, and updates' },
    { icon: 'bi bi-clock-history', num: 'Real-time', label: 'Deadline visibility and progress tracking across teams' },
    { icon: 'bi bi-people', num: 'Cross-Team', label: 'Workload visibility across engineering and product streams' },
    { icon: 'bi bi-graph-up-arrow', num: 'Improved', label: 'Execution consistency through structured project workflows' },
];

const projectFacts = [
    { icon: 'bi bi-building', label: 'Client', value: 'Big-Matrix Solutions (Internal R&D)' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Project Management' },
    { icon: 'bi bi-calendar3', label: 'Timeline', value: 'Feb 2026 - Apr 2026' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'Active Internal Use' },
    { icon: 'bi bi-globe', label: 'Demo', value: 'pm.big-matrix.com' },
];

const challenges = [
    { icon: 'bi bi-diagram-3', title: 'Scattered Task Tracking', desc: 'Work items were managed across multiple disconnected tools, making project visibility fragmented.' },
    { icon: 'bi bi-calendar-x', title: 'Deadline Drift', desc: 'Manual updates made it difficult to keep milestone timelines current and reliable.' },
    { icon: 'bi bi-person-lines-fill', title: 'Ownership Ambiguity', desc: 'Team members lacked a single source of truth for assignment responsibility and progress state.' },
    { icon: 'bi bi-arrow-repeat', title: 'Manual Status Coordination', desc: 'Routine status reporting required repeated follow-ups and cross-channel consolidation.' },
];

const keyCapabilities = [
    { icon: 'bi bi-check2-square', title: 'Task Assignment and Deadlines', desc: 'Create, assign, prioritize, and schedule tasks with clear ownership and due-date accountability.' },
    { icon: 'bi bi-bar-chart-line', title: 'Project Progress Monitoring', desc: 'Track completion health at both task and project levels through structured status indicators.' },
    { icon: 'bi bi-person-workspace', title: 'Workload Visibility', desc: 'View contributor-level workload distribution to identify bottlenecks and rebalance capacity.' },
    { icon: 'bi bi-layout-text-window-reverse', title: 'Unified Project Dashboard', desc: 'Monitor active projects, timelines, and team execution state from one central interface.' },
];

const workflow = [
    { title: 'Project Setup', desc: 'New initiatives are created with owners, timelines, and delivery scope.' },
    { title: 'Task Breakdown', desc: 'Work is decomposed into assignable tasks with priorities and deadlines.' },
    { title: 'Execution Tracking', desc: 'Teams update task status while managers monitor progress in real time.' },
    { title: 'Workload Review', desc: 'Capacity and assignment balance are reviewed across contributors.' },
    { title: 'Reporting and Alignment', desc: 'Centralized dashboards provide shared status visibility for all stakeholders.' },
];

const benefits = [
    'Reduces coordination overhead by consolidating tracking into one internal platform.',
    'Improves timeline adherence through clearer deadline ownership and progress transparency.',
    'Strengthens cross-team accountability by making ownership and status immediately visible.',
    'Supports proactive workload balancing before blockers impact delivery milestones.',
    'Creates a repeatable execution model for internal product and R&D initiatives.',
];

const futureDirections = [
    'Predictive risk alerts for likely deadline slippage based on activity signals.',
    'Automation hooks for reminders, escalation, and dependency-based status updates.',
    'Integrated planning views for roadmap, sprint, and resource capacity in one flow.',
    'Enhanced analytics for throughput, cycle time, and team-level delivery performance.',
];

const team = [
    { icon: 'bi bi-code-square', role: 'Engineering Team', name: 'Platform Development', desc: 'Built core modules for task orchestration, status updates, and dashboard workflows.' },
    { icon: 'bi bi-briefcase', role: 'Product & Operations', name: 'Internal Delivery Leads', desc: 'Defined workflow requirements and operating models for cross-team execution consistency.' },
    { icon: 'bi bi-gear-wide-connected', role: 'R&D Program Office', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Coordinates adoption, process standardization, and ongoing platform enhancement.' },
];

const ProjectManagement = () => {
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
        <div className="bc-showcase" >
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-kanban-fill"></i> Internal Product Platform
                            </span>
                            <h1>Big-Matrix Project Management Platform</h1>
                            <p className="bc-hero-sub">
                                A centralized internal workspace designed to streamline planning, task coordination,
                                deadline management, and execution visibility across multiple ongoing initiatives.
                            </p>
                        </div>

                        <figure className="bc-hero-figure">
                            <img src="/assets/images/projects/PM-Dashboard.jpeg" alt="Big-Matrix Project Management Platform" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    <strong>Execution visibility</strong>
                                    <span>Tasks, deadlines, and ownership in one view</span>
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
                            Internal execution suffered from fragmented tools, manual updates, and limited workload
                            transparency across parallel projects.
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
                        <h2>Our Solution</h2>
                        <p>
                            A unified platform that connects planning, assignments, progress tracking, and team workload
                            visibility in one execution workflow.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
                        {keyCapabilities.map((item) => (
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
                        <h2>Execution Workflow</h2>
                        <p>From project definition to delivery reporting, each phase supports structured team coordination.</p>
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
                        <h2>Operational Impact</h2>
                        <p>The platform improves structure, visibility, and delivery flow across internal programs.</p>
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
                        <h2>Future Development</h2>
                        <p>Upcoming iterations focus on predictive planning, deeper automation, and richer delivery analytics.</p>
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
                        <span className="bc-pub-icon"><i className="bi bi-stack"></i></span>
                        <div>
                            <div className="bc-pub-label">Technology Stack</div>
                            <h4>React frontend with Django APIs and MySQL-backed data workflows</h4>
                            <p>
                                Built for practical internal use with maintainable architecture and scalable project
                                coordination workflows.
                            </p>
                            <a className="bc-pub-status" href="https://pm.big-matrix.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-box-arrow-up-right"></i> pm.big-matrix.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bc-section" id="team" ref={registerSection('team')}>
                <div className="bc-container">
                    <div className="bc-section-head bc-center">
                        <span className="bc-eyebrow" style={{ justifyContent: 'center' }}>Collaboration</span>
                        <h2>Team and Ownership</h2>
                        <p>Designed and iterated collaboratively across engineering, product operations, and R&D leadership.</p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {team.map((member) => (
                            <div className="bc-team-card" key={member.name}>
                                <div className={`bc-team-avatar${member.image ? ' bc-team-avatar-logo' : ''}`}>
                                    {member.image
                                        ? <img src={member.image} alt={member.name} />
                                        : <i className={member.icon}></i>}
                                </div>
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

export default ProjectManagement;
