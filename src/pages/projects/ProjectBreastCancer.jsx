import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

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
    { icon: 'bi bi-cash-coin', label: 'Funding', value: 'Grant CTRG-21-SEPS-15' },
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
                            <img src="/assets/images/projects/Rad analysis.png" alt="Multimodal AI for Breast Cancer Diagnosis" />
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
