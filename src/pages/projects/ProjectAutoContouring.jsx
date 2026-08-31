import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-stopwatch', num: '50–70%', label: 'Projected reduction in manual contouring time per case' },
    { icon: 'bi bi-bullseye', num: 'High', label: 'Contour consistency through standardised AI-assisted delineation' },
    { icon: 'bi bi-clipboard2-check', num: 'QA-Ready', label: 'Automated quality checks before clinical plan finalization' },
    { icon: 'bi bi-layers', num: 'DICOM', label: 'Native CT and MRI ingestion with RT Structure Set output' },
];

const projectFacts = [
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical AI / Radiotherapy' },
    { icon: 'bi bi-hospital', label: 'Domain', value: 'Oncology & Radiation Therapy' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'In Development' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-layers', label: 'Data Types', value: 'CT · MRI · DICOM' },
];

const problems = [
    {
        icon: 'bi bi-clock-history',
        title: 'Contouring Is The Pacemaker Of Planning',
        desc: 'A radiation oncologist in a high-volume centre may spend several hours per patient on delineation alone — the rate-limiting constraint between imaging and treatment start.',
    },
    {
        icon: 'bi bi-people',
        title: 'Contours Vary Between Clinicians',
        desc: 'Inter-observer variability in OAR and target volume delineation is well-documented. Different boundaries propagate into dose distributions, DVHs and ultimately treatment quality.',
    },
    {
        icon: 'bi bi-arrow-repeat',
        title: 'Iteration Overhead Slows The Full Cycle',
        desc: 'When contours need revision, the entire downstream loop restarts: dosimetry reruns, physicist review, clinical sign-off. Every revision costs days.',
    },
    {
        icon: 'bi bi-exclamation-triangle',
        title: 'QA Failures Surface Too Late',
        desc: 'Outlier contours and protocol deviations are often caught only at final plan review, after dosimetrists and physicists have already built a plan around them.',
    },
];

const capabilities = [
    {
        icon: 'bi bi-bounding-box',
        title: 'OAR and Tumour Segmentation',
        desc: 'Volumetric deep learning models auto-delineate organs-at-risk and target volumes from CT and MRI with clinically aligned contour boundaries, producing DICOM RT Structure Sets that drop straight into the TPS.',
    },
    {
        icon: 'bi bi-cpu',
        title: 'Treatment Planning Assistance',
        desc: 'Planning intelligence analyses the anatomical context of delineated structures — OAR proximity, dose-gradient constraints, protocol-specific beam restrictions — and provides guidance before dosimetry begins.',
    },
    {
        icon: 'bi bi-graph-up-arrow',
        title: 'Dose Prediction',
        desc: 'Deep learning estimates expected dose distributions from contoured anatomy before a full plan is built, letting teams identify likely protocol violations at the contour-review stage.',
    },
    {
        icon: 'bi bi-clipboard2-check',
        title: 'Automated Quality Assurance',
        desc: 'Rule-based and model-assisted checks flag contour and planning anomalies before final clinical approval — volume plausibility, structure overlap, DVH thresholds, protocol flags — with explanations, not just flags.',
    },
];

const workflow = [
    { title: 'Image Ingestion', desc: 'CT and MRI datasets are imported through DICOM-compatible pipelines from PACS or directly from the scanner.' },
    { title: 'Auto Contour Generation', desc: 'The system generates initial OAR and tumour contours for the selected cancer sites.' },
    { title: 'Clinical Review', desc: 'Radiation oncologists and dosimetrists validate and refine the AI-generated structures in their existing TPS environment.' },
    { title: 'Plan Guidance and Dose Estimation', desc: 'Planning support and dose prediction modules help accelerate treatment strategy refinement before full plan optimisation.' },
    { title: 'QA and Export', desc: 'Automated quality checks run before outputs are finalised for TPS integration and clinical approval.' },
];

const benefits = [
    'Significantly lowers contouring effort and speeds patient-specific planning preparation.',
    'Reduces contour variability and supports more consistent protocol adherence across teams.',
    'Improves plan development throughput for high-volume radiotherapy departments.',
    'Enables earlier quality-control intervention through automated deviation flagging.',
    'Supports integration with standard treatment planning workflows and clinical systems.',
];

const engineering = [
    {
        icon: 'bi bi-bounding-box',
        title: 'Volumetric Models, Not Slice-By-Slice',
        desc: 'The segmentation engine processes full CT and MRI volumes rather than individual axial slices. This gives it spatial continuity across the anatomy — enabling accurate three-dimensional OAR and target boundaries rather than 2D approximations stacked up.',
    },
    {
        icon: 'bi bi-file-earmark-arrow-up',
        title: 'DICOM RT Structure Set Output',
        desc: 'Outputs are DICOM RT Structure Sets — the universal format that treatment planning systems already read — so contours land in the TPS without a conversion step. The pipeline is DICOM-native from ingestion to export.',
    },
    {
        icon: 'bi bi-shield-check',
        title: 'QA That Explains, Not Just Flags',
        desc: 'The QA layer checks volume plausibility, structure overlap constraints, dose-volume histogram thresholds and protocol-specific rules. Anomalies surface with explanations, so the reviewing clinician knows exactly what to look at rather than decoding a cryptic flag.',
    },
    {
        icon: 'bi bi-diagram-3',
        title: 'Protocol-Parameterised By Cancer Site',
        desc: 'Dose prediction and planning guidance logic are defined per cancer site and updatable as clinical guidelines evolve. Adding a new site is a model training and validation exercise, not a software rebuild.',
    },
];

const futureDirections = [
    'Expand contouring coverage for additional disease sites and adaptive radiotherapy pathways.',
    'Integrate longitudinal treatment-response analysis for re-planning decision support.',
    'Strengthen physician-in-the-loop feedback to continuously improve segmentation robustness.',
    'Scale multi-institution validation and interoperability with broader TPS ecosystems.',
];

const collaborators = [
    { icon: 'bi bi-person-workspace', role: 'Clinical Lead Team', name: 'Radiation Oncologists', desc: 'Provide contour validation oversight and ensure clinically safe treatment-structure definition.' },
    { icon: 'bi bi-calculator', role: 'Planning Team', name: 'Dosimetrists & Medical Physicists', desc: 'Use contour and dose guidance outputs to optimise treatment plans with protocol compliance.' },
    { icon: 'bi bi-code-slash', role: 'Engineering Team', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Develops model pipelines, QA automation and system integration for radiotherapy workflows.' },
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

const ProjectAutoContouring = () => {
    return (
        <>
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-activity"></i> Medical AI / Radiotherapy
                            </span>
                            <h1>Auto Contouring Software for Radiotherapy Planning</h1>
                            <p className="bc-hero-sub">
                                AI-assisted contouring and planning support for oncology workflows — reducing
                                manual segmentation time by 50–70%, improving cross-team consistency, and
                                catching QA issues at the right stage rather than after a complete plan has been
                                built around them.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <img src="/assets/images/projects/auto contouring software.png" alt="Auto Contouring Software" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    <strong>Clinically guided automation</strong>
                                    <span>Contour, plan and QA in one flow</span>
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
                            Radiation therapy is only as accurate as its contours. Before any plan can be built,
                            every organ at risk and every tumour volume must be delineated on every relevant scan
                            slice — a process that takes hours per patient, varies between clinicians and
                            bottlenecks the entire treatment timeline.
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
                            The system integrates contour automation, planning guidance, dose intelligence and QA
                            into a unified workflow. The design principle: the AI produces the contours;
                            the clinician owns them.
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
                        <h2>Clinical Workflow Integration</h2>
                        <p>
                            From imaging ingestion to QA-verified outputs, the pipeline aligns with standard
                            radiotherapy planning operations at five stages.
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
                            Four decisions that separate a research-grade model from a system clinicians
                            can actually use in a treatment planning workflow.
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
                        <h2>Clinical Impact</h2>
                        <p>Operational and quality improvements delivered across contouring, planning and QA phases.</p>
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
                        <h2>Future Directions</h2>
                        <p>
                            The roadmap focuses on broader clinical coverage, adaptive workflows and stronger
                            multi-centre interoperability.
                        </p>
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
                        <span className="bc-pub-icon"><i className="bi bi-heart-pulse"></i></span>
                        <div>
                            <div className="bc-pub-label">Technology stack</div>
                            <h4>Built for clinically reliable segmentation and treatment planning acceleration</h4>
                            <p>
                                Deep learning contouring models, volumetric CT/MRI pipelines, DICOM-compatible
                                I/O and expert-driven clinical validation loops.
                            </p>
                            <span className="bc-pub-status"><i className="bi bi-gear"></i> AI + DICOM + Clinical QA</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="bc-section bc-alt" id="team">
                <div className="bc-container">
                    <div className="bc-section-head bc-left">
                        <span className="bc-eyebrow">Collaboration</span>
                        <h2>Cross-Disciplinary Delivery Team</h2>
                        <p>Clinical, planning and engineering specialists aligned around safe and efficient radiotherapy workflows.</p>
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

export default ProjectAutoContouring;
