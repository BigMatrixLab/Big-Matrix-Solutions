import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-stopwatch', num: '50–70%', label: 'Projected reduction in manual CT reading and reporting time per case' },
    { icon: 'bi bi-bullseye', num: 'High', label: 'Segmentation consistency through standardised AI-assisted delineation' },
    { icon: 'bi bi-shield-check', num: 'QA-Ready', label: 'Automated report verification before final radiologist sign-off' },
    { icon: 'bi bi-diagram-3', num: 'Unified', label: 'Segment, analyse and report in one clinical workflow' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'Lung CT Segmentation & Report Generation' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical AI / Radiology' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'In Development' },
    { icon: 'bi bi-calendar3', label: 'Year', value: '2026' },
];

const problems = [
    {
        icon: 'bi bi-clock-history',
        title: 'Manual Reporting Is A Throughput Bottleneck',
        desc: 'Reading hundreds of CT slices, measuring nodule dimensions and dictating a structured report takes significant time per case. In high-volume imaging centres this creates reporting backlogs that delay treatment decisions.',
    },
    {
        icon: 'bi bi-people',
        title: 'Nodule Measurements Vary Between Readers',
        desc: 'Nodule size, density classification and spiculation assessment are subjective at the margins. Inter-observer variability leads to inconsistencies in follow-up recommendations for the same lesion.',
    },
    {
        icon: 'bi bi-file-earmark-text',
        title: 'Documentation Overhead Is Disproportionate',
        desc: 'A large fraction of reporting time is spent transcribing anatomical findings and cross-referencing guideline thresholds — work that follows a predictable template and does not require clinical judgement.',
    },
    {
        icon: 'bi bi-exclamation-triangle',
        title: 'Errors Surface At The Wrong Stage',
        desc: 'Missed incidental findings, misclassified nodule tracking and omitted guideline references are often discovered at final sign-off, requiring addendums that disrupt downstream care.',
    },
];

const capabilities = [
    {
        icon: 'bi bi-bounding-box',
        title: 'Lung and Lesion Segmentation',
        desc: 'AI models auto-delineate lung lobes, airway trees and suspicious nodules from chest CT with clinically aligned boundaries across the full volumetric scan — not just individual slices.',
    },
    {
        icon: 'bi bi-search',
        title: 'Nodule Characterisation',
        desc: 'Diagnostic intelligence analyses density category (solid, part-solid, ground-glass), shape (lobulated, spiculated), location and malignancy risk score against established screening guidelines.',
    },
    {
        icon: 'bi bi-box',
        title: 'Volumetric Analytics',
        desc: 'Deep learning calculates precise volume, 3D measurements and volume doubling-time metrics — enabling accurate longitudinal tracking without manual prior-study comparison.',
    },
    {
        icon: 'bi bi-file-earmark-medical',
        title: 'Automated Report Generation',
        desc: 'Generates structured, natural-language diagnostic reports with pre-populated findings, precise measurements and guideline-compliant follow-up recommendations ready for radiologist review and sign-off.',
    },
];

const workflow = [
    { title: 'Image Ingestion', desc: 'Chest CT DICOM datasets are automatically imported through secure PACS and RIS pipelines.' },
    { title: 'Auto Segment and Detect', desc: 'The system segments lung anatomy and detects potential nodules or abnormalities across the full CT volume.' },
    { title: 'Clinical Review', desc: 'Radiologists review AI-segmented volumes and AI-generated findings side by side, with full ability to correct and override.' },
    { title: 'Automated Report Draft', desc: 'The system auto-populates a structured reporting template with precise measurements, risk classifications and guideline-referenced recommendations.' },
    { title: 'QA and Export', desc: 'Automated quality checks run before finalised text and structured data are pushed to PACS and HL7 systems.' },
];

const engineering = [
    {
        icon: 'bi bi-box',
        title: 'Volumetric Segmentation, Not Stacked 2D Slices',
        desc: 'The segmentation engine processes the full chest CT volume, giving it spatial continuity across anatomy. This is what makes accurate 3D nodule measurement possible — the system measures the actual three-dimensional object rather than extrapolating from axial slices.',
    },
    {
        icon: 'bi bi-graph-up',
        title: 'Longitudinal Nodule Tracking',
        desc: 'The system associates nodules across prior and current studies, computing volume doubling time and tracking size change against guideline thresholds. This traditionally requires a radiologist to manually retrieve and compare prior reports — it is done automatically with flagging when growth rates cross clinical action thresholds.',
    },
    {
        icon: 'bi bi-file-earmark-text',
        title: 'Natural Language Report Generation',
        desc: 'The report module translates structured segmentation and characterisation outputs into natural-language diagnostic text following the reporting conventions of the deploying institution. The generated text is fully editable — the radiologist is presented with a structured draft, not a locked output.',
    },
    {
        icon: 'bi bi-hdd-network',
        title: 'DICOM and HL7 Integration',
        desc: 'Ingestion is DICOM-native from PACS and RIS pipelines. Finalised reports and structured data are exported back to PACS and pushed to HL7-compatible hospital information systems, closing the workflow without a manual data-entry step.',
    },
];

const benefits = [
    'Significantly lowers dictation effort and speeds patient-specific diagnostic report generation.',
    'Reduces measurement variability and supports standardised adherence to lung screening protocols.',
    'Improves imaging turnaround times for high-volume radiology and emergency departments.',
    'Enables earlier diagnostic intervention through automated critical finding alerts.',
    'Supports seamless integration with standard PACS, RIS and hospital speech-recognition ecosystems.',
];

const futureDirections = [
    'Expand segmentation and reporting coverage for interstitial lung diseases, COPD and cardiac scoring.',
    'Integrate longitudinal prior-exam comparison for automated tracking of disease progression.',
    'Strengthen radiologist-in-the-loop feedback loops to continuously refine model sensitivity and specificity.',
    'Scale multi-centre clinical validation and native integration with major hospital EHR systems.',
];

const collaborators = [
    { icon: 'bi bi-person-workspace', role: 'Clinical Lead Team', name: 'Radiologists & Pulmonologists', desc: 'Provide expert ground-truth validation and ensure clinically safe, accurate diagnostic report structures.' },
    { icon: 'bi bi-camera', role: 'Reporting Team', name: 'Imaging Technologists & Medical Scribes', desc: 'Use automated segmentation and drafting tools to accelerate the clinical imaging pipeline.' },
    { icon: 'bi bi-code-slash', role: 'Engineering Team', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Develops model pipelines, NLP reporting automation and secure PACS integration for radiology workflows.' },
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

const ProjectLungCTReport = () => {
    return (
        <>
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-activity"></i> Medical AI / Radiology
                            </span>
                            <h1>Auto Segmentation &amp; Report Generation for Lung CT</h1>
                            <p className="bc-hero-sub">
                                AI-assisted lung nodule detection, volumetric segmentation and automated diagnostic
                                report generation — handing the radiologist a structured draft to verify
                                rather than a blank dictation to fill.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <img
                                src="/assets/images/projects/lung ct segmentation and report generation.png"
                                alt="Lung CT Segmentation and Report Generation"
                            />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    <strong>Clinically guided automation</strong>
                                    <span>Segment, analyse and report in one flow</span>
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
                            Chest CT reporting fails at scale in predictable ways. The report the radiologist
                            signs should be one they edited, not one they wrote from scratch — but the tooling
                            to make that possible has not existed in the standard workflow.
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
                            The system integrates automated segmentation, nodule characterisation, quantitative
                            analytics and natural language reporting into a single workflow — from DICOM
                            ingestion to a structured report ready for sign-off.
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
                            From image ingestion to signed-off diagnostic reports, the pipeline aligns with
                            standard radiology department operations at five stages.
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
                            Four decisions that make the difference between a model that produces results
                            and a system that integrates into a real radiology workflow.
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
                        <p>Operational and qualitative improvements across imaging interpretation, quantification and reporting.</p>
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
                            The roadmap focuses on broader thoracic pathology coverage, multi-modal insights
                            and deeper enterprise workflow interoperability.
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
                            <h4>Built for clinically reliable lung segmentation and automated diagnostic reporting</h4>
                            <p>
                                Deep learning computer vision models, NLP report generation, DICOM and
                                HL7-compatible I/O and radiologist-driven validation loops.
                            </p>
                            <span className="bc-pub-status"><i className="bi bi-gear"></i> AI + DICOM + HL7 + Clinical QA</span>
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
                        <p>Clinical, radiology and engineering specialists aligned around safe and efficient diagnostic imaging workflows.</p>
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

export default ProjectLungCTReport;
