import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-kanban', num: '1 Hub', label: 'Centralised workspace for projects, tasks and updates across every initiative' },
    { icon: 'bi bi-clock-history', num: 'Real-time', label: 'Deadline visibility and progress tracking without manual status requests' },
    { icon: 'bi bi-people', num: 'Cross-Team', label: 'Workload visibility across engineering and product streams' },
    { icon: 'bi bi-calendar3', num: '3 Months', label: 'From first commit to active internal use — Feb to Apr 2026' },
];

const projectFacts = [
    { icon: 'bi bi-building', label: 'Client', value: 'Big-Matrix Solutions (Internal R&D)' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Project Management' },
    { icon: 'bi bi-calendar3', label: 'Timeline', value: 'Feb 2026 – Apr 2026' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'Active Internal Use' },
    { icon: 'bi bi-globe', label: 'Live URL', value: 'pm.big-matrix.com' },
];

const problems = [
    {
        icon: 'bi bi-diagram-3',
        title: 'Tasks Were Tracked In Multiple Places',
        desc: 'Work items lived across chat threads, spreadsheets and individual to-do lists. There was no single view of what was in progress, what was blocked and what was done across the full project portfolio.',
    },
    {
        icon: 'bi bi-calendar-x',
        title: 'Deadlines Drifted Silently',
        desc: 'Without a system that surfaced milestone timelines automatically, updates required manual follow-up. Deadlines were missed not because work wasn\'t being done, but because the shared picture of the schedule was always stale.',
    },
    {
        icon: 'bi bi-person-lines-fill',
        title: 'Ownership Was Ambiguous',
        desc: 'When multiple engineers work across multiple projects, "who is doing what" is a question that shouldn\'t require a meeting to answer. It did.',
    },
    {
        icon: 'bi bi-arrow-repeat',
        title: 'Status Reporting Required Manual Consolidation',
        desc: 'Getting a clear picture of project progress meant asking people for updates and stitching them together. The overhead was routine but persistent — time that belonged to actual work.',
    },
];

const capabilities = [
    {
        icon: 'bi bi-check2-square',
        title: 'Task Assignment and Deadlines',
        desc: 'Create, assign, prioritise and schedule tasks with clear ownership and due-date accountability. Every task has an owner, a deadline and a status — no ambiguity about what needs to happen or who is responsible.',
    },
    {
        icon: 'bi bi-bar-chart-line',
        title: 'Project Progress Monitoring',
        desc: 'Track completion health at task and project level through structured status indicators. The full picture is available without requesting updates from the team.',
    },
    {
        icon: 'bi bi-person-workspace',
        title: 'Workload Visibility',
        desc: 'View contributor-level workload distribution to identify bottlenecks and rebalance capacity before they impact delivery. Overloaded team members and idle capacity both surface in the same view.',
    },
    {
        icon: 'bi bi-layout-text-window-reverse',
        title: 'Unified Project Dashboard',
        desc: 'Monitor active projects, timelines and team execution state from one central interface — the shared source of truth that replaces the scattered tools.',
    },
];

const workflow = [
    { title: 'Project Setup', desc: 'New initiatives are created with owners, timelines and delivery scope defined upfront.' },
    { title: 'Task Breakdown', desc: 'Work is decomposed into assignable tasks with priorities, deadlines and clear owners.' },
    { title: 'Execution Tracking', desc: 'Teams update task status as work progresses. Managers monitor completion health in real time without requesting updates.' },
    { title: 'Workload Review', desc: 'Capacity and assignment balance are reviewed across contributors. Overloads and idle capacity surface before they become blockers.' },
    { title: 'Reporting and Alignment', desc: 'Centralised dashboards give all stakeholders shared visibility into project status without a status meeting.' },
];

const engineering = [
    {
        icon: 'bi bi-bullseye',
        title: 'Scoped To Fix The Actual Failures',
        desc: 'The decision not to adopt an off-the-shelf tool was deliberate. The team had specific needs — multiple concurrent R&D initiatives with non-standard lifecycles, workload visibility across engineers who move between projects. Building it took three months. The scope was kept tight to match exactly what was failing.',
    },
    {
        icon: 'bi bi-recycle',
        title: 'The Team That Builds It Uses It Daily',
        desc: 'Every client engagement and R&D project runs through this platform. The engineering team that builds it is the same team that uses it every day — which means feedback loops are immediate and the product evolves against real operational pressure, not hypothetical requirements.',
    },
    {
        icon: 'bi bi-stack',
        title: 'The Same Stack As Client Products',
        desc: 'React, Django, MySQL — the same stack that underpins several client products. Building internal tooling on it means every capability refined here is validated on production-grade architecture. There is no mismatch between the tools the team preaches and the tools they use.',
    },
    {
        icon: 'bi bi-graph-up-arrow',
        title: 'Built To Extend, Not Just To Ship',
        desc: 'The roadmap reflects gaps the team is actively experiencing — predictive risk alerts, automation hooks, roadmap views, delivery analytics. The architecture supports adding these without a rebuild, because the system was designed as a platform from the start.',
    },
];

const benefits = [
    'Reduces coordination overhead by consolidating tracking into one platform — chat threads and spreadsheets no longer carry the state of the work.',
    'Improves timeline adherence through clearer deadline ownership and progress transparency that doesn\'t require manual prompting.',
    'Strengthens cross-team accountability by making assignment and status immediately visible to everyone on the project.',
    'Supports proactive workload balancing before blockers impact delivery milestones.',
    'Creates a repeatable execution model that applies consistently across all internal product and R&D initiatives.',
];

const futureDirections = [
    'Predictive risk alerts for tasks and milestones likely to slip, based on activity signals rather than current status alone.',
    'Automation hooks for deadline reminders, escalation triggers and dependency-based status updates.',
    'Integrated planning views for roadmap, sprint and resource capacity in one unified flow.',
    'Delivery analytics for throughput, cycle time and team-level performance metrics.',
];

const team = [
    { icon: 'bi bi-code-square', role: 'Engineering Team', name: 'Platform Development', desc: 'Built core modules for task orchestration, status updates and dashboard workflows.' },
    { icon: 'bi bi-briefcase', role: 'Product & Operations', name: 'Internal Delivery Leads', desc: 'Defined workflow requirements and operating models for cross-team execution consistency.' },
    { icon: 'bi bi-gear-wide-connected', role: 'R&D Program Office', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Coordinates adoption, process standardisation and ongoing platform enhancement.' },
];

const SpecGrid = ({ items }) => (
    <div className="bc-specgrid">
        {items.map((item) => (
            <div key={item.title}>
                <span className="bc-spec-label">
                    <i className={item.icon} aria-hidden="true"></i>
                    {item.title}
                </span>
                <p>{item.desc}</p>
            </div>
        ))}
    </div>
);

const ProjectManagement = () => {
    return (
        <>
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-kanban-fill"></i> Internal Product Platform
                            </span>
                            <h1>Big-Matrix Project Management Platform</h1>
                            <p className="bc-hero-sub">
                                Built in three months to fix the coordination failures the team was living with.
                                Task tracking, deadline management and workload visibility across every project
                                in the lab — in active daily use from week one.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <a
                                className="bc-hero-figure__link"
                                href="https://pm.big-matrix.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the live Big-Matrix project management platform in a new tab"
                            >
                                <img src="/assets/images/projects/PM-Dashboard.jpeg" alt="Big-Matrix Project Management Platform" />
                                <span className="bc-hero-figure__cue">
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                    Open live site
                                </span>
                            </a>
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    <strong>Execution visibility</strong>
                                    <span>Tasks, deadlines and ownership in one view</span>
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <div className="bc-stats" id="overview">
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
                    <ShowcaseFacts items={projectFacts} />
                </div>
            </div>

            {/* ── Problem ── */}
            <section className="bc-section bc-alt" id="problem">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it was built</span>
                        <h2>The Problem</h2>
                        <p>
                            Running multiple parallel R&D projects without a shared system produces familiar
                            failures. The team was living with all four.
                        </p>
                    </div>
                    <div className="bc-grid bc-grid-4">
                        {problems.map((item) => (
                            <div className="bc-card bc-problem" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Capabilities ── */}
            <section className="bc-section" id="capabilities">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The approach</span>
                        <h2>Our Solution</h2>
                        <p>
                            A unified platform that connects planning, task assignment, deadline tracking and
                            workload visibility in one execution workflow — with a shared source of truth
                            that replaces the scattered tools.
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

            {/* ── Workflow ── */}
            <section className="bc-section bc-alt" id="workflow">
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

            {/* ── Engineering / Why Internal ── */}
            <section className="bc-section" id="engineering">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it was built internally</span>
                        <h2>Built To Scratch A Real Itch</h2>
                        <p>
                            A 3-month build that the team uses in daily production beats a 12-month build
                            that sits unused. Four things the internal build demonstrates.
                        </p>
                    </div>
                    <div className="bc-grid bc-grid-2">
                        {engineering.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Impact ── */}
            <section className="bc-section bc-alt" id="impact">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Key outcomes</span>
                        <h2>Operational Impact</h2>
                        <p>The platform improves structure, visibility and delivery flow across all internal programmes.</p>
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

            {/* ── Future ── */}
            <section className="bc-section" id="future">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What&apos;s next</span>
                        <h2>Future Development</h2>
                        <p>The roadmap reflects gaps the team is actively experiencing, in priority order.</p>
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
                            <div className="bc-pub-label">Technology stack</div>
                            <h4>React frontend with Django APIs and MySQL-backed data workflows</h4>
                            <p>
                                The same stack that underpins several client products — built for practical
                                internal use with maintainable architecture and scalable project coordination workflows.
                            </p>
                            <a className="bc-pub-status" href="https://pm.big-matrix.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-box-arrow-up-right"></i> pm.big-matrix.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="bc-section bc-alt" id="team">
                <div className="bc-container">
                    <div className="bc-section-head bc-left">
                        <span className="bc-eyebrow">Collaboration</span>
                        <h2>Team and Ownership</h2>
                        <p>Designed and iterated collaboratively across engineering, product operations and R&D leadership.</p>
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

        <CtaBand />
        </>
    );
};

export default ProjectManagement;
