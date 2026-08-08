import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-stopwatch', num: '50-70%', label: 'Reduction in manual contouring time per case' },
    // { icon: 'bi bi-diagram-3', num: '5+', label: 'Cancer sites supported in the current contouring suite' },
    { icon: 'bi bi-bullseye', num: 'High', label: 'Contour consistency through standardized AI-assisted delineation' },
    { icon: 'bi bi-shield-check', num: 'QA-Ready', label: 'Automated quality checks before clinical plan finalization' },
];

const projectFacts = [
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical AI / Radiotherapy' },
    { icon: 'bi bi-hospital', label: 'Domain', value: 'Oncology & Radiation Therapy' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'In Development' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-layers', label: 'Data Types', value: 'CT / MRI / DICOM' },
];

const challenges = [
    { icon: 'bi bi-clock-history', title: 'Time-Intensive Manual Contouring', desc: 'Manual delineation of OARs and tumors is laborious and slows treatment planning in high-volume centers.' },
    { icon: 'bi bi-people', title: 'Inter-Observer Variability', desc: 'Contours can vary between clinicians, creating inconsistencies in downstream planning and dose evaluation.' },
    { icon: 'bi bi-arrow-repeat', title: 'Planning Iteration Overhead', desc: 'Repeated contour and dose revisions increase planning cycle time between oncology, dosimetry, and physics teams.' },
    { icon: 'bi bi-exclamation-triangle', title: 'Late QA Detection', desc: 'Outlier contours or protocol deviations are often discovered late, increasing correction effort before treatment.' },
];

const capabilities = [
    { icon: 'bi bi-bounding-box', title: 'OAR and Tumor Segmentation', desc: 'AI models auto-delineate organs-at-risk and target volumes from CT and MRI with clinically aligned contour boundaries.' },
    { icon: 'bi bi-cpu', title: 'Treatment Planning Assistance', desc: 'Planning intelligence helps guide beam and dose strategy decisions based on anatomical context and protocol constraints.' },
    { icon: 'bi bi-graph-up-arrow', title: 'Dose Prediction', desc: 'Deep learning predicts expected dose distributions early to support fast plan quality evaluation and optimization.' },
    { icon: 'bi bi-clipboard2-check', title: 'Automated Quality Assurance', desc: 'Rule-based and model-assisted checks flag contour and planning anomalies before final clinical approval.' },
];

const workflow = [
    { title: 'Image Ingestion', desc: 'CT and MRI datasets are imported through DICOM-compatible pipelines.' },
    { title: 'Auto Contour Generation', desc: 'The system generates initial OAR and tumor contours for selected cancer sites.' },
    { title: 'Clinical Review', desc: 'Radiation oncologists and dosimetrists validate and refine AI-generated structures.' },
    { title: 'Plan Guidance and Dose Estimation', desc: 'Planning support and dose prediction modules help accelerate treatment strategy refinement.' },
    { title: 'QA and Export', desc: 'Automated quality checks run before outputs are finalized for treatment planning system integration.' },
];

const benefits = [
    'Significantly lowers contouring effort and speeds patient-specific planning preparation.',
    'Reduces contour variability and supports more consistent protocol adherence across teams.',
    'Improves plan development throughput for high-volume radiotherapy departments.',
    'Enables earlier quality-control intervention through automated deviation flagging.',
    'Supports integration with standard treatment planning workflows and clinical systems.',
];

const futureDirections = [
    'Expand contouring coverage for additional disease sites and adaptive radiotherapy pathways.',
    'Integrate longitudinal treatment-response analysis for re-planning decision support.',
    'Strengthen physician-in-the-loop feedback to continuously improve segmentation robustness.',
    'Scale multi-institution validation and interoperability with broader TPS ecosystems.',
];

const collaborators = [
    { icon: 'bi bi-person-workspace', role: 'Clinical Lead Team', name: 'Radiation Oncologists', desc: 'Provide contour validation oversight and ensure clinically safe treatment-structure definition.' },
    { icon: 'bi bi-calculator', role: 'Planning Team', name: 'Dosimetrists & Medical Physicists', desc: 'Use contour and dose guidance outputs to optimize treatment plans with protocol compliance.' },
    { icon: 'bi bi-code-slash', role: 'Engineering Team', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Develops model pipelines, QA automation, and system integration for radiotherapy workflows.' },
];

const ProjectAutoContouring = () => {

    return (
        <>
        <div className="bc-showcase">
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-activity"></i> Medical AI / Radiotherapy
                            </span>
                            <h1>Auto Contouring Software for Radiotherapy Planning</h1>
                            <p className="bc-hero-sub">
                                AI-assisted contouring and planning support for oncology workflows, designed to
                                reduce manual segmentation time, improve consistency, and streamline treatment
                                planning quality assurance across multiple cancer sites.
                            </p>
                        </div>

                        <figure className="bc-hero-figure">
                            <img
                                src="/assets/images/projects/auto contouring software.png"
                                alt="Auto Contouring Software"
                            />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    <strong>Clinically guided automation</strong>
                                    <span>Contour, plan, and QA in one flow</span>
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
                            Radiotherapy contouring and plan preparation demand speed, precision, and consistency under
                            strict clinical timelines.
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
                        <h2>Core Capabilities</h2>
                        <p>
                            The system integrates contour automation, planning guidance, dose intelligence, and QA into a
                            unified workflow for radiotherapy teams.
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
                        <h2>Clinical Workflow Integration</h2>
                        <p>
                            From imaging ingestion to QA-verified outputs, the pipeline aligns with standard radiotherapy
                            planning operations.
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

            <section className="bc-section" id="impact">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Key outcomes</span>
                        <h2>Clinical Impact</h2>
                        <p>Operational and quality improvements delivered across contouring, planning, and QA phases.</p>
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
                        <h2>Future Directions</h2>
                        <p>
                            The roadmap focuses on broader clinical coverage, adaptive workflows, and stronger
                            multi-center interoperability.
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
                            <div className="bc-pub-label">Technology Stack</div>
                            <h4>Built for clinically reliable segmentation and treatment planning acceleration</h4>
                            <p>
                                Deep learning contouring models, volumetric CT/MRI pipelines, DICOM-compatible I/O,
                                and expert-driven clinical validation loops.
                            </p>
                            <span className="bc-pub-status"><i className="bi bi-gear"></i> AI + DICOM + Clinical QA</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bc-section" id="team">
                <div className="bc-container">
                    <div className="bc-section-head bc-left">
                        <span className="bc-eyebrow">Collaboration</span>
                        <h2>Cross-Disciplinary Delivery Team</h2>
                        <p>Clinical, planning, and engineering specialists aligned around safe and efficient radiotherapy workflows.</p>
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
