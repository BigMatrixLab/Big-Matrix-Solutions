import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-lightning-charge', num: '<20s', label: 'Average time to generate an initial segmentation pass' },
    { icon: 'bi bi-layers', num: '12+', label: 'Anatomy regions supported with color-coded mask layers' },
    { icon: 'bi bi-arrow-repeat', num: 'Undo/Redo', label: 'Fast iterative refinement for clinical-grade corrections' },
    { icon: 'bi bi-box-seam', num: 'ZIP Export', label: 'Portable case package with image, masks, overlays, and manifest' },
];

const projectFacts = [
    { icon: 'bi bi-building', label: 'Client', value: 'Healthcare Partner' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical AI Tools' },
    { icon: 'bi bi-calendar3', label: 'Year', value: '2026' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'Ongoing' },
    { icon: 'bi bi-globe', label: 'Demo', value: 'segmentation-editor.pages.dev' },
];

const challenges = [
    { icon: 'bi bi-exclamation-triangle', title: 'Manual Masking Bottlenecks', desc: 'Pixel-level annotation and cleanup are time-consuming, especially when teams handle large case volumes.' },
    { icon: 'bi bi-shuffle', title: 'Inconsistent Labeling', desc: 'Different reviewers often produce different boundaries and naming patterns without a shared editing workflow.' },
    { icon: 'bi bi-file-earmark-x', title: 'Fragmented Case Packaging', desc: 'Images, masks, overlays, and metadata are often spread across folders, making review and handoff error-prone.' },
    { icon: 'bi bi-people', title: 'Cross-Team Collaboration Gaps', desc: 'Research and clinical teams need a common interface for review, correction, and export without coding overhead.' },
];

const capabilities = [
    { icon: 'bi bi-upload', title: 'Upload and Auto-Segment', desc: 'Drop in a chest X-ray and generate color-coded anatomy masks in a single flow.' },
    { icon: 'bi bi-pencil-square', title: 'Precision Manual Refinement', desc: 'Use brush and erase controls with undo and redo to correct difficult boundaries quickly.' },
    { icon: 'bi bi-eye', title: 'Layered Visual Controls', desc: 'Show, hide, and reorder segments to inspect overlap quality and region separation clearly.' },
    { icon: 'bi bi-download', title: 'Case Load and Export', desc: 'Open existing packages and export validated cases into reusable ZIP bundles for downstream use.' },
];

const workflow = [
    { title: 'Case Upload', desc: 'A chest X-ray is uploaded and prepared for segmentation in the editor workspace.' },
    { title: 'Automated Segmentation', desc: 'The AI engine generates initial mask layers and structured label assignments.' },
    { title: 'Reviewer Refinement', desc: 'Clinical or research users apply targeted edits with interactive tools.' },
    { title: 'Quality Review', desc: 'Masks are inspected through overlay controls and layer visibility checks.' },
    { title: 'Package Export', desc: 'Finalized image, masks, overlays, and manifest are bundled into a shareable archive.' },
];

const benefits = [
    'Reduces total annotation time by combining auto-segmentation with focused manual corrections.',
    'Improves consistency through standardized segment naming, color coding, and packaging format.',
    'Enables smooth collaboration between clinical reviewers, data teams, and AI engineers.',
    'Produces portable case bundles that simplify validation, reprocessing, and dataset expansion.',
    'Supports repeatable quality-control workflows for both research and deployment pipelines.',
];

const futureDirections = [
    'Active-learning loop to prioritize difficult cases and improve model performance over time.',
    'Expanded anatomy library for broader thoracic findings and pathology-focused segment classes.',
    'Integrated reviewer audit trail for traceable edits and quality assurance documentation.',
    'PACS-aligned interoperability to support easier clinical integration and handoff.',
];

const collaborators = [
    { icon: 'bi bi-hospital', role: 'Clinical Review Team', name: 'Radiology Specialists', desc: 'Validate segmentation quality and ensure clinically meaningful region boundaries.' },
    { icon: 'bi bi-hdd-stack', role: 'Data & Annotation Team', name: 'AI Data Operations', desc: 'Curate training-ready case bundles and manage dataset consistency across cohorts.' },
    { icon: 'bi bi-cpu', role: 'Engineering Team', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Builds the editor workflow, model integration, and export pipeline for production use.' },
];

const ProjectXRaySegmentation = () => {


    return (
        <>
        <div className="bc-showcase">
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-clipboard2-pulse-fill"></i> Medical AI Tools
                            </span>
                            <h1>X-Ray Segmentation Editor</h1>
                            <p className="bc-hero-sub">
                                An interactive workspace for reviewing, correcting, and packaging chest X-ray segmentations.
                                The platform combines automated anatomy detection with lightweight manual refinement so teams
                                can produce reliable mask sets in a consistent and shareable format.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <a
                                className="bc-hero-figure__link"
                                href="https://segmentation-editor.pages.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the live X-Ray Segmentation Editor at segmentation-editor.pages.dev in a new tab"
                            >
                                <img src="/assets/images/projects/x-ray-segmentation-editor.png" alt="X-Ray Segmentation Editor workspace" />
                                <span className="bc-hero-figure__cue">
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                    Open live demo
                                </span>
                            </a>
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-check2-circle"></i>
                                <span>
                                    <strong>Human-in-the-loop editing</strong>
                                    <span>AI speed with expert correction control</span>
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

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


            <section className="bc-section bc-alt" id="challenge">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it matters</span>
                        <h2>The Challenge</h2>
                        <p>
                            Building accurate segmentation datasets requires speed, consistency, and packaging discipline
                            across large case volumes and multi-role teams.
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

            <section className="bc-section" id="solution">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The approach</span>
                        <h2>Technical Capabilities</h2>
                        <p>
                            The editor combines AI-assisted segmentation, interactive correction tools, and structured
                            export workflows into a single production-ready interface.
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

            <section className="bc-section bc-alt" id="workflow">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it works</span>
                        <h2>Workflow Pipeline</h2>
                        <p>From upload to reusable package, each stage is optimized for fast review and dependable output quality.</p>
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

            <section className="bc-section" id="impact">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Key outcomes</span>
                        <h2>Project Impact</h2>
                        <p>Designed to improve annotation throughput, output consistency, and collaboration readiness.</p>
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

            <section className="bc-section bc-alt" id="future">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What&apos;s next</span>
                        <h2>Future Development</h2>
                        <p>The roadmap extends the platform toward smarter feedback loops and stronger clinical interoperability.</p>
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
                        <span className="bc-pub-icon"><i className="bi bi-display"></i></span>
                        <div>
                            <div className="bc-pub-label">Live Demonstration</div>
                            <h4>Explore the X-Ray Segmentation Editor in the Browser</h4>
                            <p>
                                Interactive demo environment for evaluating upload, segmentation, refinement,
                                and case export workflows.
                            </p>
                            <a
                                className="bc-pub-status"
                                href="https://segmentation-editor.pages.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-box-arrow-up-right"></i> segmentation-editor.pages.dev
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bc-section" id="team">
                <div className="bc-container">
                    <div className="bc-section-head bc-left">
                        <span className="bc-eyebrow">Collaboration</span>
                        <h2>Cross-Functional Team</h2>
                        <p>Clinical insight, annotation operations, and product engineering working in one delivery loop.</p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {collaborators.map((member) => (
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

export default ProjectXRaySegmentation;
