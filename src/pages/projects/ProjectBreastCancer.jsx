import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

const heroStats = [
    { icon: 'bi bi-bullseye', num: '90%+', label: 'Segmentation accuracy on regions of interest & BI-RADS classification' },
    { icon: 'bi bi-stopwatch', num: '~45s', label: 'Average automated analysis per case' },
    { icon: 'bi bi-graph-down-arrow', num: '5–7%', label: 'False-positive rate targeted for reduction vs 70–80% for traditional CAD' },
    { icon: 'bi bi-calendar-check', num: '1 Year', label: 'Funded research programme — Grant CTRG-21-SEPS-15' },
];

const projectFacts = [
    { icon: 'bi bi-building', label: 'Client', value: 'North South University' },
    { icon: 'bi bi-tag', label: 'Category', value: 'AI in Healthcare' },
    { icon: 'bi bi-calendar3', label: 'Starting Date', value: 'April 2022' },
    { icon: 'bi bi-hourglass-split', label: 'Duration', value: '1 Year' },
    // { icon: 'bi bi-cash-coin', label: 'Funding', value: 'Grant CTRG-21-SEPS-15' },
];

const problems = [
    {
        icon: 'bi bi-exclamation-triangle',
        title: 'False-Positive Rates Are Punishingly High',
        desc: 'Traditional CAD methods produce false-positive rates of 70–80%, flooding radiologists with unnecessary follow-up cases and generating patient anxiety without clinical benefit.',
    },
    {
        icon: 'bi bi-eye-slash',
        title: 'Early-Stage Lesions Are Missed',
        desc: 'Subtle abnormalities in dense mammographic tissue — the cases where early intervention matters most — are the hardest to detect manually and the most consequential to miss.',
    },
    {
        icon: 'bi bi-people',
        title: 'Interpretation Varies Between Readers',
        desc: 'Inter-observer variability among radiologists reduces the reproducibility and consistency of diagnoses, creating uncertainty in downstream follow-up recommendations.',
    },
    {
        icon: 'bi bi-clock-history',
        title: 'Manual Analysis Is A Throughput Bottleneck',
        desc: 'Reviewing full mammographic sequences by hand is time-intensive. In high-volume settings the result is diagnostic delay — exactly when speed matters most.',
    },
];

const goals = [
    { icon: 'bi bi-bullseye', title: 'Precision Segmentation', desc: 'Identify and isolate regions of interest with 90%+ accuracy across mammographic images, using attention-driven deep learning architectures.' },
    { icon: 'bi bi-file-earmark-medical', title: 'Comprehensive Reporting', desc: 'Generate structured diagnostic reports pre-populated with segmentation findings, BI-RADS classification, region measurements and confidence indicators.' },
    { icon: 'bi bi-activity', title: 'Early Detection', desc: 'Surface lesions at earlier stages than traditional manual review methods, particularly in dense breast tissue where subtle abnormalities are most easily missed.' },
    { icon: 'bi bi-hospital', title: 'Clinical Integration', desc: 'Slot into existing hospital imaging workflows at five stages — from image capture to physician communication — without requiring a system rebuild.' },
];

const technicalApproach = [
    {
        icon: 'bi bi-diagram-3',
        title: 'Multimodal Data Fusion',
        desc: 'The system integrates across mammography, ultrasound, pathology, clinical records, radiology reports and genomic data rather than treating each in isolation. Fusing modalities lets the model draw on context a single-image approach cannot access.',
    },
    {
        icon: 'bi bi-cpu',
        title: 'Attention-Driven Deep Learning',
        desc: 'The core model architecture uses attention mechanisms to focus processing resources on clinically relevant image regions — particularly important in dense breast tissue where lesions can be visually subtle.',
    },
    {
        icon: 'bi bi-card-checklist',
        title: 'BI-RADS Classification',
        desc: 'Segmented regions are classified using the standard BI-RADS framework, so outputs are immediately legible to radiologists without translation or retraining on new terminology.',
    },
    {
        icon: 'bi bi-file-earmark-text',
        title: 'Automated Report Generation',
        desc: 'The system generates a preliminary diagnostic report populated with findings, classification, measurements and confidence indicators. The radiologist inherits a structured starting point rather than a blank page.',
    },
];

const workflow = [
    { title: 'Image Acquisition', desc: 'Mammograms captured from standard FWHM-compliant equipment.' },
    { title: 'Automated Analysis', desc: 'Real-time processing and segmentation, averaging 45 seconds per case.' },
    { title: 'Radiologist Review', desc: 'AI-assisted interpretation with highlighted regions and a preliminary report.' },
    { title: 'Report Finalization', desc: 'Radiologist reviews, edits and approves the final diagnostic report.' },
    { title: 'Patient Communication', desc: 'Structured findings communicated to referring physicians.' },
];

const benefits = [
    'Enhanced accuracy in detecting breast abnormalities using state-of-the-art AI models.',
    'Early identification of potential cancerous lesions through precision segmentation.',
    'Automated comprehensive report generation for medical professionals.',
    'Improved clinical decision-making with actionable diagnostic insights.',
    'Reduced diagnostic time while maintaining high accuracy standards.',
    'Consistent quantification across readers, so the same region is measured the same way each time.',
    ];

const integration = [
    {
        icon: 'bi bi-plug',
        title: 'Built Around The Existing Equipment',
        desc: 'The pipeline consumes studies from standard FWHM-compliant mammography equipment already installed in the department. Nothing in the design assumes a hardware purchase, because a research system that requires new scanners never reaches the patients it was built for.',
    },
    {
        icon: 'bi bi-arrow-left-right',
        title: 'Additive To The Workflow, Not A Detour',
        desc: 'The five stages the system touches are the five stages that already exist. The AI pass sits between acquisition and review, so the radiologist encounters it inside the sequence they already follow rather than in a separate application with a separate login.',
    },
    {
        icon: 'bi bi-eye',
        title: 'Findings Shown On The Image',
        desc: 'Every flagged region is drawn where it was found. A reviewer can accept or dismiss a finding by looking at it, which is the difference between a second opinion and a number that has to be taken on trust.',
    },
    {
        icon: 'bi bi-pencil-square',
        title: 'The Draft Is Editable, Not Final',
        desc: 'The generated report is a starting document. The radiologist edits the narrative, adjusts or removes findings, and signs. The system never produces a clinical document without a human approving it.',
    },
    {
        icon: 'bi bi-hourglass-split',
        title: 'Latency Sized For A Reading Session',
        desc: 'Around 45 seconds per case means the analysis completes while the reader works through the preceding study. A pipeline that took ten minutes would be technically equivalent and practically unusable in a high-volume list.',
    },
    {
        icon: 'bi bi-people',
        title: 'Designed With The Reader In Mind',
        desc: 'The output format follows BI-RADS because that is the vocabulary of the follow-up decision. Fitting the clinician was treated as a design constraint from the start rather than a presentation layer added at the end.',
    },
];

const modalities = [
    {
        icon: 'bi bi-image',
        title: 'Mammography',
        desc: 'The primary signal. Standard views carry the lesion morphology, margin characteristics and calcification patterns that drive a BI-RADS assessment, and they are what the segmentation model operates on directly.',
    }, 
    {
        icon: 'bi bi-clipboard2-pulse',
        title: 'Clinical Records',
        desc: 'Age, history, risk factors and prior findings change how the same image should be read. A model that sees only pixels discards the context a radiologist would never work without.',
    },
    {
        icon: 'bi bi-file-text',
        title: 'Radiology Reports',
        desc: 'Existing narrative reports carry the reasoning behind past assessments, including how the same patient was described over time.',
    },
  
];

const whyMultimodal = [
    {
        icon: 'bi bi-layers',
        title: 'One Modality Is An Incomplete Question',
        desc: 'A suspicious density on a mammogram is a different finding in a 38-year-old with dense tissue and no history than in a 65-year-old with a prior biopsy at the same site. Single-image models cannot make that distinction because the information is not in the image.',
    },
    {
        icon: 'bi bi-funnel',
        title: 'Context Is What Reduces False Positives',
        desc: 'Traditional CAD flags shapes. Most of what it flags is benign, which is how false-positive rates reach 70–80%. Adding clinical and prior-study context is the mechanism by which a system flags fewer things and is right more often about the ones it does flag.',
    },
    {
        icon: 'bi bi-bullseye',
        title: 'Attention Decides Where Capacity Goes',
        desc: 'A mammogram is mostly normal tissue. Attention mechanisms concentrate model capacity on the regions that carry diagnostic signal, which matters most in exactly the dense-tissue cases where lesions are subtle and manual review is hardest.',
    },
    {
        icon: 'bi bi-translate',
        title: 'BI-RADS Keeps The Output Legible',
        desc: 'A model can output any label it was trained on. Producing BI-RADS categories means the result lands in a framework radiologists already use for follow-up decisions, so nothing has to be translated or learned before it is usable.',
    },
];

const reportAnatomy = [
    { icon: 'bi bi-vector-pen', title: 'Segmented Regions', desc: 'Each region of interest delineated on the image, so the reviewer sees exactly what the model responded to rather than a score with no visual basis.' },
    { icon: 'bi bi-card-checklist', title: 'BI-RADS Category', desc: 'The standard assessment category for each finding, carrying its implied follow-up pathway.' },
    { icon: 'bi bi-rulers', title: 'Quantitative Measurements', desc: 'Region dimensions and extent, captured consistently rather than estimated by eye and re-estimated at the next visit.' },
    { icon: 'bi bi-speedometer', title: 'Confidence Indicators', desc: 'How certain the model is about each finding, so a borderline call is visibly borderline and can be treated as such.' },
];

const evidence = [
    {
        icon: 'bi bi-clipboard-data',
        title: 'Where The Accuracy Figure Comes From',
        desc: 'The 90%+ segmentation accuracy is a development-dataset evaluation carried out during the funded programme. It is a research result on the data the system was built against, not a multi-site clinical performance claim.',
    },
    {
        icon: 'bi bi-stopwatch',
        title: 'What The 45 Seconds Measures',
        desc: 'Average automated analysis time per case on the development hardware configuration. It covers the AI pass, not the radiologist review that follows it.',
    },
    {
        icon: 'bi bi-flag',
        title: 'The False-Positive Number Is A Target',
        desc: 'The 5–7% false-positive rate is the design target set against the 70–80% typical of traditional CAD. It is stated here as a target, because that is what it is. Confirming it requires prospective multi-centre evaluation.',
    },
    {
        icon: 'bi bi-journal-text',
        title: 'Publication Status',
        desc: 'The OncoVision paper documenting architecture, training methodology and validation is under review at Nature Communications Medicine. Under review is not published, and we do not describe it as such.',
    },
];

const boundaries = [
    {
        icon: 'bi bi-person-check',
        title: 'The Radiologist Signs',
        desc: 'This is radiologist-in-the-loop AI. The system segments, classifies and drafts. A qualified reader verifies, edits and approves every report before it becomes a clinical document.',
    },
    {
        icon: 'bi bi-shield-exclamation',
        title: 'Not A Cleared Diagnostic Device',
        desc: 'The work was carried out as a funded research programme. It has not been through a regulatory clearance pathway, and nothing here should be read as an approved diagnostic claim.',
    },
    {
        icon: 'bi bi-building',
        title: 'Single-Programme Validation So Far',
        desc: 'Results come from the research dataset assembled for this grant. Performance across other scanners, protocols and patient populations is exactly what the planned multi-centre validation is for.',
    },
    {
        icon: 'bi bi-x-circle',
        title: 'Not A Screening Replacement',
        desc: 'The system supports interpretation of studies already being read. It does not decide who gets imaged, and it does not remove a reader from the pathway.',
    },
];

const futureDirections = [
    { icon: 'bi bi-box', title: '3D Tomosynthesis Integration', desc: 'Full volumetric analysis of digital breast tomosynthesis data.' },
    { icon: 'bi bi-hospital', title: 'Multi-Centre Validation', desc: 'Deployment and validation across multiple hospitals with diverse patient populations.' },
    { icon: 'bi bi-shield-lock', title: 'Federated Learning', desc: 'Privacy-preserving multi-institutional training without centralising patient data.' },
    { icon: 'bi bi-diagram-2', title: 'Molecular Subtype Prediction', desc: 'Extending the model to predict tumour molecular subtypes from imaging data.' },
];

const team = [
    { icon: 'bi bi-person-badge', role: 'Principal Investigator', name: 'Dr. Mohammad Monir Uddin', desc: 'Leads research, methodology and clinical validation of the multimodal AI system.' },
    { icon: 'bi bi-mortarboard', role: 'Research Institution', name: 'North South University', desc: 'Hosts and funds the research programme under grant CTRG-21-SEPS-15.' },
    { icon: 'bi bi-building', role: 'Industry Partner', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Provides engineering, deployment and clinical-integration expertise throughout the programme.' },
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

const ProjectBreastCancer = () => {
    return (
        <>
            <Seo
                title="Multimodal AI for breast cancer"
                description="A multimodal AI system that segments suspicious regions in mammographic images and drafts a preliminary diagnostic report in about 45 seconds per case."
                path="/project/nsu_ctrg_2021_2022_breast_cancer"
            />
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-heart-pulse-fill"></i> AI in Healthcare · NSU Research Grant
                            </span>
                            <h1>Multimodal AI for Breast Cancer Diagnosis</h1>
                            <p className="bc-hero-sub">
                                A multimodal AI system that segments suspicious regions in mammographic images
                                and generates a preliminary diagnostic report in ~45 seconds per case.
                                Radiologist-in-the-loop by design — the AI surfaces the findings; the expert verifies them.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <img fetchpriority="high" src="/assets/images/projects/Rad analysis.webp" alt="Multimodal AI for Breast Cancer Diagnosis" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    <strong>Clinically-aligned AI</strong>
                                    <span>Radiologist-in-the-loop diagnostics</span>
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
                            Breast cancer is the most common cancer in women globally. In Bangladesh and across
                            South Asia, the challenge compounds: high patient volume, limited specialist bandwidth
                            and equipment that varies significantly between institutions.
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

            {/* ── Goals ── */}
            <section className="bc-section" id="solution">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The approach</span>
                        <h2>Four Goals, One System</h2>
                        <p>
                            The platform combines <strong>multimodal AI</strong> — advanced deep learning architectures
                            paired with structured medical domain knowledge — to perform two things that have historically
                            required separate manual workflows: precise segmentation and automated diagnostic reporting.
                        </p>
                    </div>
                    <div className="bc-grid bc-grid-4">
                        {goals.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Technical Approach ── */}
            <section className="bc-section bc-alt" id="technical">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Under the hood</span>
                        <h2>Technical Approach</h2>
                        <p>
                            Four engineering decisions that separate this system from generic image-classification approaches
                            and make the output immediately usable in a clinical workflow.
                        </p>
                    </div>
                    <SpecGrid items={technicalApproach} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-info-circle"></i></span>
                        <div>
                            <div className="bc-pub-label">Design principle</div>
                            <h4>Radiologist-in-the-loop, not radiologist-replaced</h4>
                            <p>
                                The system surfaces findings, quantifies them in a standard clinical framework, and
                                hands the specialist a structured report to verify rather than a blank page to fill.
                                Clinical judgement is applied where it matters; template-filling is automated.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Workflow ── */}
            <section className="bc-section" id="workflow">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it works</span>
                        <h2>Clinical Workflow Integration</h2>
                        <p>
                            From image capture to physician communication, the pipeline slots into the existing
                            radiology workflow at five stages without requiring a system rebuild.
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
                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-stopwatch"></i></span>
                        <div>
                            <div className="bc-pub-label">Why 45 seconds matters</div>
                            <h4>The AI pass reduces time-to-first-finding</h4>
                            <p>
                                A manual full-case read typically takes several minutes and produces no structured
                                output until the radiologist dictates. The automated pass gives the radiologist a
                                structured artefact to work against rather than starting from scratch.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Modalities ── */}
            <section className="bc-section bc-alt" id="modalities">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The data</span>
                        <h2>Three Modalities, One Assessment</h2>
                        <p>What each input contributes, and why the system reads them together rather than one at a time.</p>
                    </div>
                    <SpecGrid items={modalities} />
                </div>
            </section>

            {/* ── Why multimodal ── */}
            <section className="bc-section" id="rationale">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Design rationale</span>
                        <h2>Why Fusion, And Why Attention</h2>
                        <p>The reasoning behind the architecture, stated plainly enough to disagree with.</p>
                    </div>
                    <div className="bc-grid bc-grid-2">
                        {whyMultimodal.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Report anatomy ── */}
            <section className="bc-section bc-alt" id="report">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The output</span>
                        <h2>What Lands On The Radiologist&rsquo;s Screen</h2>
                        <p>The draft report is the deliverable. Every element in it is traceable to something on the image.</p>
                    </div>
                    <SpecGrid items={reportAnatomy} />
                </div>
            </section>

            {/* ── Integration ── */}
            <section className="bc-section" id="integration">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Clinical fit</span>
                        <h2>Fitting A Department That Cannot Stop</h2>
                        <p>Research systems fail at the point of contact with a working radiology list. These were the constraints that shaped the build.</p>
                    </div>
                    <SpecGrid items={integration} />
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="bc-section bc-alt" id="impact">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Key outcomes</span>
                        <h2>Clinical Impact</h2>
                        <p>Tangible improvements delivered across accuracy, speed and clinical decision-making.</p>
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
                        <p>Every number on this page, with the qualification it deserves. Research results and clinical performance are different things, and we would rather say which is which.</p>
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
                        <p>The limits are part of the design, not an omission from it.</p>
                    </div>
                    <div className="bc-grid bc-grid-2">
                        {boundaries.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Publication ── */}
            <section className="bc-section" id="research">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Research output</span>
                        <h2>Future Directions &amp; Publication</h2>
                        <p>The roadmap extends beyond the grant period into multi-site clinical deployment and richer data modalities.</p>
                    </div>
                    <div className="bc-grid bc-grid-2" style={{ marginBottom: '40px' }}>
                        {futureDirections.map((item) => (
                            <div className="bc-future-card" key={item.title}>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                                <p><strong>{item.title}</strong> — {item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bc-pub">
                        <span className="bc-pub-icon"><i className="bi bi-journal-text"></i></span>
                        <div>
                            <div className="bc-pub-label">Publication highlight</div>
                            <h4>
                                OncoVision: Integrating Mammography and Clinical Data through Attention-Driven
                                Multimodal AI for Enhanced Breast Cancer Diagnosis
                            </h4>
                            <p>Ahmed, I. et al. — <em>Nature Communications Medicine</em></p>
                            <span className="bc-pub-status"><i className="bi bi-hourglass-split"></i> Under Review</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="bc-section bc-alt" id="team">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Collaboration</span>
                        <h2>Team &amp; Collaboration</h2>
                        <p>A partnership between academic research leadership and industry engineering.</p>
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

export default ProjectBreastCancer;
