import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';

const heroStats = [
    { icon: 'bi bi-stopwatch', num: '50-70%', label: 'Reduction in manual CT reading and reporting time per case' },
    { icon: 'bi bi-bullseye', num: 'High', label: 'Segmentation consistency through standardized AI-assisted delineation' },
    { icon: 'bi bi-shield-check', num: 'QA-Ready', label: 'Automated report verification before final radiologist sign-off' },
    { icon: 'bi bi-diagram-3', num: 'Unified', label: 'Segment, analyze, and report in one clinical workflow' },
];

const challenges = [
    { icon: 'bi bi-clock-history', title: 'Time-Intensive Manual Reporting', desc: 'Reviewing hundreds of slices and drafting detailed structural narratives slows diagnostic throughput in high-volume imaging centers.' },
    { icon: 'bi bi-people', title: 'Inter-Observer Variability', desc: 'Nodule measurements and classification can vary between radiologists, leading to inconsistencies in follow-up recommendations.' },
    { icon: 'bi bi-file-earmark-text', title: 'Reporting Documentation Overhead', desc: 'Manually transcribing anatomical findings, lesion tracking, and guideline references increases reporting cycle times.' },
    { icon: 'bi bi-exclamation-triangle', title: 'Late Error Detection', desc: 'Omitted incidental findings or misclassified nodule tracking are often discovered late, requiring stressful addendums after final sign-off.' },
];

const capabilities = [
    { icon: 'bi bi-bounding-box', title: 'Lung and Lesion Segmentation', desc: 'AI models auto-delineate lung lobes, airway trees, and suspicious nodules from chest CT scans with clinically aligned boundaries.' },
    { icon: 'bi bi-search', title: 'Nodule Characterization', desc: 'Diagnostic intelligence analyzes density, shape, and spiculation to assess malignancy risk profiles across solid, sub-solid, and ground-glass lesions.' },
    { icon: 'bi bi-box', title: 'Volumetric Analytics', desc: 'Deep learning calculates precise volume, 3D measurements, and doubling-time metrics to support accurate longitudinal tracking.' },
    { icon: 'bi bi-file-earmark-medical', title: 'Automated Report Generation', desc: 'Generates structured, natural-language diagnostic reports with pre-populated findings and guideline-compliant recommendations.' },
];

const workflow = [
    { title: 'Image Ingestion', desc: 'Chest CT DICOM datasets are automatically imported through secure PACS and RIS pipelines.' },
    { title: 'Auto Segment and Detect', desc: 'The system segments lung anatomy and detects potential nodules or abnormalities.' },
    { title: 'Clinical Review', desc: 'Radiologists review AI-segmented volumes and AI-generated findings side by side.' },
    { title: 'Automated Report Draft', desc: 'The system auto-populates a structured reporting template with precise measurements and metrics.' },
    { title: 'QA and Export', desc: 'Automated quality checks run before finalized text and structured data are pushed to PACS and HL7 systems.' },
];

const benefits = [
    'Significantly lowers dictation effort and speeds up patient-specific diagnostic report generation.',
    'Reduces measurement variability and supports standardized adherence to lung screening protocols.',
    'Improves imaging turnaround times for high-volume radiology and emergency departments.',
    'Enables earlier diagnostic intervention through automated critical finding alerts.',
    'Supports seamless integration with standard PACS, RIS, and hospital speech-recognition ecosystems.',
];

const futureDirections = [
    'Expand segmentation and reporting coverage for interstitial lung diseases, COPD, and cardiac scoring.',
    'Integrate longitudinal prior-exam comparison for automated tracking of disease progression.',
    'Strengthen radiologist-in-the-loop feedback loops to continuously refine model sensitivity and specificity.',
    'Scale multi-center clinical validation and native integration with major hospital EHR systems.',
];

const collaborators = [
    { icon: 'bi bi-person-workspace', role: 'Clinical Lead Team', name: 'Radiologists & Pulmonologists', desc: 'Provide expert ground-truth validation and ensure clinically safe, accurate diagnostic report structures.' },
    { icon: 'bi bi-camera', role: 'Reporting Team', name: 'Imaging Technologists & Medical Scribes', desc: 'Utilize automated segmentation and drafting tools to accelerate the clinical imaging pipeline with protocol compliance.' },
    { icon: 'bi bi-code-slash', role: 'Engineering Team', name: 'Big-Matrix Solutions', image: '/assets/images/big_matrix_cube.png', desc: 'Develops model pipelines, NLP reporting automation, and secure PACS system integration for radiology workflows.' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'Lung CT Segmentation & Report Generation' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical AI / Radiology' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-calendar3', label: 'Year', value: '2026' },
];

const ProjectLungCTReport = () => {

    return (
        <div className="bc-showcase">
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-activity"></i> Medical AI / Radiology
                            </span>
                            <h1>Auto Segmentation &amp; Report Generation for Lung CT</h1>
                            <p className="bc-hero-sub">
                                AI-assisted lung nodule detection, volumetric segmentation, and automated diagnostic
                                report generation designed to reduce radiologist burnout, improve diagnostic accuracy,
                                and streamline pulmonology and oncology workflows.
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
                                    <span>Segment, analyze, and report in one flow</span>
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
                            Lung CT interpretation and report writing demand high speed, extreme precision, and
                            meticulous detail under heavy clinical workloads.
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
                            The system integrates automated segmentation, nodule characterization, quantitative
                            analytics, and natural language reporting into a unified workflow.
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
                            From image ingestion to signed-off diagnostic reports, the pipeline aligns with standard
                            radiology department operations.
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
                        <p>Operational and qualitative improvements delivered across imaging interpretation, quantification, and reporting phases.</p>
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
                            The roadmap focuses on broader thoracic pathology coverage, multi-modal insights, and
                            deeper enterprise workflow interoperability.
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
                            <h4>Built for clinically reliable lung segmentation and automated diagnostic reporting</h4>
                            <p>
                                Deep learning computer vision models, NLP report generation engines, DICOM and HL7-compatible
                                I/O, and radiologist-driven validation loops.
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
                        <p>Clinical, radiology, and engineering specialists aligned around safe and efficient diagnostic imaging workflows.</p>
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
    );
};

export default ProjectLungCTReport;
