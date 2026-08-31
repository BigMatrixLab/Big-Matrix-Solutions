import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-lightning-charge', num: '<20s', label: 'Average time to generate an initial segmentation pass from a single upload' },
    { icon: 'bi bi-layers', num: '12+', label: 'Anatomy regions supported with colour-coded mask layers' },
    { icon: 'bi bi-arrow-repeat', num: 'Undo/Redo', label: 'Full edit history for fast iterative refinement without restarting a case' },
    { icon: 'bi bi-box-seam', num: 'ZIP Export', label: 'Portable case package — image, masks, overlays and manifest in one bundle' },
];

const projectFacts = [
    { icon: 'bi bi-building', label: 'Client', value: 'Healthcare Partner' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical AI Tools' },
    { icon: 'bi bi-calendar3', label: 'Year', value: '2026' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'Ongoing' },
    { icon: 'bi bi-globe', label: 'Demo', value: 'segmentation-editor.pages.dev' },
];

const problems = [
    {
        icon: 'bi bi-exclamation-triangle',
        title: 'Manual Masking Is A Bottleneck At Scale',
        desc: 'Pixel-level annotation of anatomy across hundreds of cases is laborious. Without automation, annotation time is linear with case volume — and the volume needed to train reliable diagnostic models is never small.',
    },
    {
        icon: 'bi bi-shuffle',
        title: 'Different Reviewers Produce Different Boundaries',
        desc: 'Without a shared editing workflow, consistency breaks down. One annotator draws the lung boundary to the costal margin; another stops short. One labels it "left_lung"; another uses "lung_L". The dataset trains against contradictory ground truth.',
    },
    {
        icon: 'bi bi-file-earmark-x',
        title: 'Case Packaging Is Fragmented',
        desc: 'Images, masks, overlays and metadata typically live in separate folders linked by naming convention. When conventions drift, handoffs between annotation and engineering teams become error-prone — wrong mask paired with wrong image, manifest out of sync.',
    },
    {
        icon: 'bi bi-people',
        title: 'No Common Interface For Clinical And Research Teams',
        desc: 'Clinical reviewers who can judge segmentation quality are not the same people who export and process dataset files. Without a shared tool, the review loop requires constant translation between roles.',
    },
];

const capabilities = [
    {
        icon: 'bi bi-upload',
        title: 'Upload and Auto-Segment',
        desc: 'Drop in a chest X-ray and the AI engine generates colour-coded anatomy mask layers across 12+ regions in under 20 seconds — a complete starting point, not a blank canvas.',
    },
    {
        icon: 'bi bi-pencil-square',
        title: 'Precision Manual Refinement',
        desc: 'Brush and erase controls with configurable brush size and a full undo/redo stack to correct difficult boundaries without discarding the session. Effort concentrates on what the model gets wrong.',
    },
    {
        icon: 'bi bi-eye',
        title: 'Layered Visual Controls',
        desc: 'Show, hide and reorder individual segments to inspect boundary quality and region separation clearly. Checking the lung mask against the cardiac silhouette, for instance, to verify the interface is correctly assigned.',
    },
    {
        icon: 'bi bi-download',
        title: 'Case Load and Export',
        desc: 'Open existing packages and export validated cases as structured ZIP archives. The manifest makes every package self-contained and reopenable — loading the ZIP restores the complete session with all labels and layer assignments intact.',
    },
];

const workflow = [
    { title: 'Case Upload', desc: 'A chest X-ray is uploaded and prepared for segmentation in the editor workspace.' },
    { title: 'Automated Segmentation', desc: 'The AI engine generates initial mask layers and structured label assignments in under 20 seconds.' },
    { title: 'Reviewer Refinement', desc: 'Clinical or research users apply targeted edits with brush, erase and selection tools using full undo/redo support.' },
    { title: 'Quality Review', desc: 'Masks are inspected through overlay controls and layer visibility checks before sign-off.' },
    { title: 'Package Export', desc: 'Finalised image, masks, overlays and manifest are bundled into a shareable, reopenable ZIP archive.' },
];

const engineering = [
    {
        icon: 'bi bi-arrow-repeat',
        title: 'The Undo/Redo Stack Is Not Optional',
        desc: 'An annotator who takes one step too far with the brush needs to step back without discarding the entire session. The full edit history is maintained in memory throughout the session, so any correction can be reversed to any prior state — the way a professional editing tool should work.',
    },
    {
        icon: 'bi bi-file-earmark-zip',
        title: 'The Manifest Is What Makes Packages Reusable',
        desc: 'Every exported ZIP contains a manifest that records segment metadata — labels, colours, layer order and source image reference. Loading the ZIP back into the editor restores the complete segmentation session exactly. Without the manifest, a ZIP is just files; with it, it is a case that can be reopened, reviewed and corrected months later.',
    },
    {
        icon: 'bi bi-diagram-3',
        title: 'Consistent Format Across Every Session',
        desc: 'Standardised segment naming, consistent colour assignment per anatomy region and a fixed export schema mean that a batch of cases from different annotators on different days can be processed programmatically without case-by-case inspection. Consistency is enforced by the tool, not by convention.',
    },
    {
        icon: 'bi bi-layers',
        title: 'Layer Controls For Clinical Inspection',
        desc: 'Complex segmentations require independent control of each mask layer. Show/hide per segment, reorder layers to resolve visual overlap priority, and inspect boundary quality in context. The layer system is the interface between the annotator\'s work and the clinical reviewer\'s judgement.',
    },
];

const benefits = [
    'Reduces total annotation time by combining auto-segmentation with focused manual corrections.',
    'Improves consistency through standardised segment naming, colour coding and packaging format.',
    'Enables smooth collaboration between clinical reviewers, data teams and AI engineers.',
    'Produces portable case bundles that simplify validation, reprocessing and dataset expansion.',
    'Supports repeatable quality-control workflows for both research and production deployment pipelines.',
];

const futureDirections = [
    'Active-learning loop to prioritise difficult cases and improve model performance over time.',
    'Expanded anatomy library for broader thoracic findings and pathology-focused segment classes.',
    'Integrated reviewer audit trail for traceable edits and quality assurance documentation.',
    'PACS-aligned interoperability to support easier clinical integration and case handoff.',
];

const collaborators = [
    { icon: 'bi bi-hospital', role: 'Clinical Review Team', name: 'Radiology Specialists', desc: 'Validate segmentation quality and ensure clinically meaningful region boundaries.' },
    { icon: 'bi bi-hdd-stack', role: 'Data & Annotation Team', name: 'AI Data Operations', desc: 'Curate training-ready case bundles and manage dataset consistency across cohorts.' },
    { icon: 'bi bi-cpu', role: 'Engineering Team', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Builds the editor workflow, model integration and export pipeline for production use.' },
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

const ProjectXRaySegmentation = () => {
    return (
        <>
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-clipboard2-pulse-fill"></i> Medical AI Tools
                            </span>
                            <h1>X-Ray Segmentation Editor</h1>
                            <p className="bc-hero-sub">
                                An interactive browser-based workspace for reviewing, correcting and packaging
                                chest X-ray segmentations. The AI generates the starting point in under 20 seconds;
                                clinical tools handle the corrections that matter; a structured ZIP export makes
                                every validated case portable and reusable.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <a
                                className="bc-hero-figure__link"
                                href="https://segmentation-editor.pages.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the live X-Ray Segmentation Editor in a new tab"
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
                        <span className="bc-eyebrow">Why it matters</span>
                        <h2>The Problem</h2>
                        <p>
                            Diagnostic AI models for chest X-rays only work as well as the labelled data they
                            were trained on. Building that data is expensive, inconsistent and slow — and
                            those three problems compound each other.
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
                        <h2>Four Core Capabilities</h2>
                        <p>
                            The editor combines AI-assisted segmentation, interactive correction tools and
                            structured export workflows into one interface. The design principle: the AI
                            generates; the expert decides.
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
                        <h2>Workflow Pipeline</h2>
                        <p>
                            From upload to reusable package, each stage is optimised for fast review and
                            dependable output quality.
                        </p>
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

            {/* ── Engineering ── */}
            <section className="bc-section" id="engineering">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Under the hood</span>
                        <h2>Engineering Highlights</h2>
                        <p>
                            Four decisions that make the difference between an annotation tool that works
                            in a demo and one that holds up across a production dataset pipeline.
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
                        <h2>Project Impact</h2>
                        <p>Designed to improve annotation throughput, output consistency and collaboration readiness.</p>
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
                            <div className="bc-pub-label">Live demonstration</div>
                            <h4>Explore the X-Ray Segmentation Editor in the browser</h4>
                            <p>
                                Interactive demo environment for evaluating upload, segmentation, refinement
                                and case export workflows. No install required.
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

            {/* ── Team ── */}
            <section className="bc-section bc-alt" id="team">
                <div className="bc-container">
                    <div className="bc-section-head bc-left">
                        <span className="bc-eyebrow">Collaboration</span>
                        <h2>Cross-Functional Team</h2>
                        <p>Clinical insight, annotation operations and product engineering working in one delivery loop.</p>
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
