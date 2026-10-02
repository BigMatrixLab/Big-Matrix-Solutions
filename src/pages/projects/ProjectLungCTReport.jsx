import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

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

const characterisation = [
    {
        icon: 'bi bi-circle-half',
        title: 'Density Category',
        desc: 'Solid, part-solid or ground-glass. This is the first branch in almost every follow-up decision, because the three categories carry different growth behaviour and different surveillance intervals, and a part-solid nodule is not a solid one with less contrast.',
    },
    {
        icon: 'bi bi-bounding-box-circles',
        title: 'Shape Characteristics',
        desc: 'Round, lobulated or spiculated. Margin morphology is one of the stronger visual predictors available from the image alone, and describing it consistently is exactly the kind of judgment that drifts between readers and between sessions.',
    },
    {
        icon: 'bi bi-geo',
        title: 'Anatomical Location',
        desc: 'Lobe and segment, plus the relationship to pleura and airways. Location changes both the differential and the practicality of biopsy, and it is tedious enough to state precisely that it is often stated loosely.',
    },
    {
        icon: 'bi bi-speedometer2',
        title: 'Malignancy Risk Score',
        desc: 'A risk score computed from the characterisation above, following established screening guidance so the output lands in a decision pathway the clinician already follows rather than a private scale that has to be interpreted.',
    },
];

const reportAnatomy = [
    {
        icon: 'bi bi-rulers',
        title: 'Volumetric Measurements',
        desc: 'Measured from the three-dimensional object rather than estimated from a single axial slice, which is what makes the number comparable to the same nodule measured on a different study by a different reader.',
    },
    {
        icon: 'bi bi-list-check',
        title: 'Structured Findings Per Nodule',
        desc: 'Each detected nodule carries its density, shape, location and risk in a consistent structure, so a report reads the same way whoever signs it and whatever week it was produced.',
    },
    {
        icon: 'bi bi-arrow-left-right',
        title: 'Comparison Against Priors',
        desc: 'Size change and volume doubling time computed against previous studies, with cases flagged where growth crosses a clinical action threshold. This is the part radiologists currently do by retrieving old reports by hand.',
    },
    {
        icon: 'bi bi-pencil',
        title: 'An Editable Narrative',
        desc: 'The natural-language draft follows the reporting conventions of the deploying institution and stays fully editable. The radiologist is handed a starting document, never a locked output, and the signature remains theirs.',
    },
];

const evidence = [
    {
        icon: 'bi bi-graph-down-arrow',
        title: 'The Time Saving Is Projected',
        desc: 'The 50–70% reduction in reporting time is a projection consistent with the AI-assisted radiology literature. It is not a measured result from clinical validation of this system, and it will be replaced with measured data once that validation produces some.',
    },
    {
        icon: 'bi bi-hammer',
        title: 'Status Is In Development',
        desc: 'The system is in development and moving through validation. It is not in routine clinical use, and nothing here describes a tool currently reporting on patients outside a validation setting.',
    },
    {
        icon: 'bi bi-shield-exclamation',
        title: 'QA-Ready Is Not A Clearance',
        desc: 'The automated quality layer describes how the software is built. It carries no implication of FDA 510(k) clearance, CE marking or any other regulatory approval, and we do not present it as one.',
    },
    {
        icon: 'bi bi-clipboard-data',
        title: 'Guideline Conformance Is Not Yet Claimed',
        desc: 'Risk scoring is designed around established screening guidance, but we do not assert conformance with any named guideline framework. That is a validation question for the clinical team, and stating it before it is confirmed would be the easiest claim on this page to get wrong.',
    },
];

const boundaries = [
    {
        icon: 'bi bi-person-check',
        title: 'The Radiologist Reports',
        desc: 'The system detects, measures, characterises and drafts. A qualified reader reviews every finding and signs the report. Nothing becomes a clinical document without that step.',
    },
    {
        icon: 'bi bi-x-circle',
        title: 'Not A Screening Programme',
        desc: 'It supports interpretation of chest CT studies that are already being acquired and read. It does not decide who is scanned, and it does not replace a reader in the pathway.',
    },
    {
        icon: 'bi bi-eye',
        title: 'Detection Is Not Diagnosis',
        desc: 'A risk score is a prioritisation aid computed from imaging features. It is not a tissue diagnosis, and the distinction matters most exactly where the score is highest.',
    },
    {
        icon: 'bi bi-buildings',
        title: 'Cross-Site Behaviour Is Open',
        desc: 'Chest CT varies by scanner, reconstruction kernel and acquisition protocol, and that variation is the usual cause of degradation when imaging models move between departments. Multi-site validation is planned work, not finished work.',
    },
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
            <Seo
                title="Lung CT report generation"
                description="AI-assisted lung nodule detection, volumetric segmentation and automated report generation, handing the radiologist a structured draft to verify."
                path="/project/lung-ct-report-generation"
            />
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

            {/* ── Characterisation ── */}
            <section className="bc-section bc-alt" id="characterisation">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Nodule characterisation</span>
                        <h2>Four Axes Per Nodule</h2>
                        <p>Detection is the easy half. What a nodule is, and what should happen next, comes from describing it consistently.</p>
                    </div>
                    <SpecGrid items={characterisation} />
                </div>
            </section>

            {/* ── Report anatomy ── */}
            <section className="bc-section" id="report">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The output</span>
                        <h2>What Lands On The Radiologist&rsquo;s Screen</h2>
                        <p>The draft report is the deliverable, and every element in it traces back to something measured on the volume.</p>
                    </div>
                    <SpecGrid items={reportAnatomy} />
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

            {/* ── Evidence standing ── */}
            <section className="bc-section" id="evidence">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Claim discipline</span>
                        <h2>Where The Evidence Actually Stands</h2>
                        <p>Every headline number on this page, with the qualification it deserves. A projection and a measured result are different things.</p>
                    </div>
                    <SpecGrid items={evidence} />
                </div>
            </section>

            {/* ── Boundaries ── */}
            <section className="bc-section bc-alt" id="boundaries">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Scope</span>
                        <h2>What This System Is Not</h2>
                        <p>The limits are part of the design rather than an omission from it.</p>
                    </div>
                    <SpecGrid items={boundaries} />
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
