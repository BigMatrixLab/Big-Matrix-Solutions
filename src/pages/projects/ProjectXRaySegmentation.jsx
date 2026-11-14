import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

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

const packageContents = [
    {
        icon: 'bi bi-image',
        title: 'The Source Image',
        desc: 'The original X-ray travels with its masks rather than being referenced by a path that will eventually break. A package that assumes the image is still where it was six months ago is a package that stops working the first time a folder is reorganised.',
    },
    {
        icon: 'bi bi-layers',
        title: 'Mask Files Per Region',
        desc: 'Each anatomy region is stored as its own mask rather than flattened into a single indexed image, so a downstream team can take the lungs and ignore everything else without decoding a colour table to work out which value meant what.',
    },
    {
        icon: 'bi bi-eye',
        title: 'A Rendered Overlay',
        desc: 'A composed view of masks over the image, so a reviewer can judge a case at a glance without loading it into anything. It is the artefact that makes a package reviewable by someone who does not have the editor open.',
    },
    {
        icon: 'bi bi-file-earmark-code',
        title: 'The Manifest',
        desc: 'Labels, colours, layer order and the source image reference. This is the part that turns a folder of files into a session: load the ZIP back and the case reopens exactly as it was left, months later and on someone else\'s machine.',
    },
];

const roles = [
    {
        icon: 'bi bi-person-badge',
        title: 'The Clinical Reviewer',
        desc: 'Judges whether a boundary is anatomically right. They need layer visibility, overlay inspection and a way to correct a mask directly, and they should not need a command line or a Python environment to do any of it.',
    },
    {
        icon: 'bi bi-kanban',
        title: 'The Annotation Team',
        desc: 'Works through volume. They need auto-segmentation to remove the drawing-from-scratch cost, brush and erase for the cases the model gets wrong, and undo so a slip does not cost a session.',
    },
    {
        icon: 'bi bi-cpu',
        title: 'The AI Engineer',
        desc: 'Consumes the output in batches. They need a fixed schema, consistent naming and predictable structure, so a cohort can be processed programmatically without opening cases one at a time to check what is inside.',
    },
    {
        icon: 'bi bi-arrow-left-right',
        title: 'Why One Interface Matters',
        desc: 'These three groups are rarely the same people. When each has its own tooling, every review cycle costs a translation step and a file handoff, and the errors live in the gaps. A shared workspace removes the gap rather than documenting it.',
    },
];

const consistency = [
    {
        icon: 'bi bi-tag',
        title: 'Names Are Assigned, Not Typed',
        desc: 'One annotator writes left_lung and another writes lung_L, and a dataset built from both trains a model against two labels for one structure. Segment names come from the tool rather than from whoever is working, which removes the failure entirely rather than documenting a convention nobody reads.',
    },
    {
        icon: 'bi bi-palette',
        title: 'Colour Means The Same Thing Every Time',
        desc: 'Each anatomy region carries a fixed colour across every case and every session. A reviewer builds an instinct for what they are looking at, and a colour that shifts between cases quietly destroys that.',
    },
    {
        icon: 'bi bi-bounding-box',
        title: 'Boundary Decisions Are Visible',
        desc: 'Whether the lung boundary runs to the costal margin or stops short of it is a real disagreement between annotators. Seeing masks layered against each other in context is what turns that into a decision a team can make once rather than a difference nobody notices until the model behaves oddly.',
    },
    {
        icon: 'bi bi-box-seam',
        title: 'One Structure, Every Export',
        desc: 'Same layout, same naming, same manifest schema on every package. A batch from three annotators across three weeks processes identically, which is the difference between a dataset and a pile of folders.',
    },
];

const evidence = [
    {
        icon: 'bi bi-stopwatch',
        title: 'What The 20 Seconds Covers',
        desc: 'Under 20 seconds is the stated average for the initial automated pass on a single upload. It does not include the manual refinement that follows, and it is an average rather than a guarantee across every image quality, resolution and source device.',
    },
    {
        icon: 'bi bi-layers',
        title: 'Anatomy Coverage',
        desc: 'The editor supports 12 or more colour-coded regions. Lungs, heart silhouette, clavicles and diaphragm are the documented structures; we do not publish a full named list here, because the supported set moves as the tool is developed and a stale list is worse than a count.',
    },
    {
        icon: 'bi bi-hourglass-split',
        title: 'Status Is Ongoing',
        desc: 'This is an actively developed tool rather than a finished product. Everything in the future directions section is planned work and none of it is available today.',
    },
    {
        icon: 'bi bi-shield-lock',
        title: 'The Partner Is Unnamed Deliberately',
        desc: 'The healthcare partner behind this work is not identified here. We name clients only where they have explicitly agreed to be named in published material, and that agreement is theirs to give rather than ours to assume.',
    },
];

const boundaries = [
    {
        icon: 'bi bi-x-circle',
        title: 'It Does Not Diagnose',
        desc: 'This is an annotation and dataset tool. It delineates anatomy so that models can be trained and evaluated. It makes no clinical finding, offers no interpretation, and is not part of a diagnostic pathway.',
    },
    {
        icon: 'bi bi-person-check',
        title: 'The AI Generates, The Expert Decides',
        desc: 'Auto-segmentation produces a starting point on every case. A human reviews and corrects it, and nothing enters a dataset on the model\'s say-so alone. A tool that quietly accepted its own output would industrialise its own mistakes.',
    },
    {
        icon: 'bi bi-file-earmark-x',
        title: 'Not A PACS Or An Archive',
        desc: 'Cases travel as exported packages. Direct PACS integration is planned work rather than a current capability, so today the tool sits beside clinical systems rather than inside them.',
    },
    {
        icon: 'bi bi-graph-up',
        title: 'Annotation Quality Is Still A Human Problem',
        desc: 'Consistent tooling removes the mechanical sources of disagreement: naming, colour, format. It does not settle where a boundary genuinely belongs. That remains a clinical judgment the team has to align on, and the tool makes it visible rather than deciding it.',
    },
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
            <Seo
                title="X-ray segmentation editor"
                description="A browser workspace for reviewing, correcting and packaging chest X-ray segmentations, with an AI starting point generated in under 20 seconds."
                path="/project/x-ray-segmentation-editor"
            />
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
                                <img fetchpriority="high" src="/assets/images/projects/x-ray-segmentation-editor.webp" alt="X-Ray Segmentation Editor workspace" />
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

            {/* ── Package contents ── */}
            <section className="bc-section bc-alt" id="package">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The deliverable</span>
                        <h2>What Travels In A Case Package</h2>
                        <p>Four things, always in the same shape. This is what makes a case reopenable months later and processable in a batch.</p>
                    </div>
                    <SpecGrid items={packageContents} />
                </div>
            </section>

            {/* ── Consistency ── */}
            <section className="bc-section" id="consistency">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Label discipline</span>
                        <h2>Consistency Enforced By The Tool</h2>
                        <p>Annotation conventions written in a document drift. Conventions built into the interface do not.</p>
                    </div>
                    <SpecGrid items={consistency} />
                </div>
            </section>

            {/* ── Roles ── */}
            <section className="bc-section bc-alt" id="roles">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Who uses it</span>
                        <h2>Three Roles, One Interface</h2>
                        <p>The people who can judge a segmentation are rarely the people who process the dataset. The tool has to serve both without either learning the other&rsquo;s tooling.</p>
                    </div>
                    <SpecGrid items={roles} />
                </div>
            </section>

            {/* ── Impact ── */}
            <section className="bc-section" id="impact">
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

            {/* ── Evidence standing ── */}
            <section className="bc-section bc-alt" id="evidence">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Claim discipline</span>
                        <h2>Where The Evidence Actually Stands</h2>
                        <p>Every headline number on this page, with the qualification it deserves.</p>
                    </div>
                    <SpecGrid items={evidence} />
                </div>
            </section>

            {/* ── Boundaries ── */}
            <section className="bc-section" id="boundaries">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Scope</span>
                        <h2>What This Tool Is Not</h2>
                        <p>It builds the data that diagnostic models learn from. It is not one of them.</p>
                    </div>
                    <SpecGrid items={boundaries} />
                </div>
            </section>

            {/* ── Future ── */}
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
            <section className="bc-section" id="team">
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
