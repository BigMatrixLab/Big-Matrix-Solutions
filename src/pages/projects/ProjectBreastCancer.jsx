import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import '../../assets/css/ProjectShowcase.css';

const NAV_SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'impact', label: 'Impact' },
    { id: 'future', label: 'Future' },
    { id: 'team', label: 'Team' },
];

const heroStats = [
    { icon: 'bi bi-bullseye', num: '90%+', label: 'Segmentation accuracy on regions of interest' },
    { icon: 'bi bi-stopwatch', num: '~45s', label: 'Average automated analysis per case' },
    { icon: 'bi bi-graph-down-arrow', num: '70–80%', label: 'False-positive rate targeted for reduction' },
    { icon: 'bi bi-calendar-check', num: '1 Year', label: 'Funded research programme (CTRG-21-SEPS-15)' },
];

const projectFacts = [
    { icon: 'bi bi-building', label: 'Client', value: 'North South University' },
    { icon: 'bi bi-tag', label: 'Category', value: 'AI in Healthcare' },
    { icon: 'bi bi-calendar3', label: 'Starting Date', value: 'April 2022' },
    { icon: 'bi bi-hourglass-split', label: 'Duration', value: '1 Year' },
    { icon: 'bi bi-cash-coin', label: 'Funding', value: 'Grant CTRG-21-SEPS-15' },
];

const challenges = [
    { icon: 'bi bi-exclamation-triangle', title: 'High False Positives', desc: 'Traditional methods often produce false-positive rates of 70–80%, leading to unnecessary follow-ups and patient anxiety.' },
    { icon: 'bi bi-eye-slash', title: 'Missed Early Lesions', desc: 'Subtle, early-stage abnormalities are easily overlooked in dense mammographic tissue.' },
    { icon: 'bi bi-people', title: 'Observer Variability', desc: 'Interpretation differs between radiologists, reducing consistency and reproducibility of diagnoses.' },
    { icon: 'bi bi-clock-history', title: 'Time-Intensive Analysis', desc: 'Manual review of mammograms is slow, limiting throughput in high-volume clinical settings.' },
];

const keyGoals = [
    { icon: 'bi bi-bullseye', title: 'Precision Segmentation', desc: 'Identify and isolate abnormalities with 90%+ accuracy across mammographic images.' },
    { icon: 'bi bi-file-earmark-medical', title: 'Comprehensive Reporting', desc: 'Generate detailed diagnostic reports tailored for medical professionals.' },
    { icon: 'bi bi-activity', title: 'Early Detection', desc: 'Enable identification of lesions at earlier stages than traditional methods.' },
    { icon: 'bi bi-hospital', title: 'Clinical Integration', desc: 'Fit seamlessly into existing hospital workflows and systems.' },
];

const workflow = [
    { title: 'Image Acquisition', desc: 'Mammograms captured from standard FWHM-compliant equipment.' },
    { title: 'Automated Analysis', desc: 'Real-time processing and segmentation, averaging 45 seconds per case.' },
    { title: 'Radiologist Review', desc: 'AI-assisted interpretation with highlighted regions and a preliminary report.' },
    { title: 'Report Finalization', desc: 'Radiologist reviews, edits, and approves the final diagnostic report.' },
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
    '3D Tomosynthesis Integration for full volumetric analysis.',
    'Multi-center validation across 5+ hospitals.',
    'Federated learning for privacy-preserving multi-institutional training.',
    'Integration with molecular subtype prediction.',
];

const team = [
    { icon: 'bi bi-person-badge', role: 'Principal Investigator', name: 'Dr. Mohammad Monir Uddin', desc: 'Leads the research, methodology, and clinical validation of the multimodal AI system.' },
    { icon: 'bi bi-mortarboard', role: 'Research Institution', name: 'North South University', desc: 'Hosts and funds the research programme under grant CTRG-21-SEPS-15.' },
    { icon: 'bi bi-buildings', role: 'Industry Partner', name: 'Big-Matrix Solutions', desc: 'Provides engineering, deployment, and clinical-integration expertise.' },
];

const ProjectBreastCancer = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const sectionRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        const nodes = Object.values(sectionRefs.current).filter(Boolean);
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    const registerSection = (id) => (el) => {
        sectionRefs.current[id] = el;
    };

    return (
        <div className="bc-showcase">
            {/* <Breadcrumb pageTitle="Multimodal AI for Breast Cancer Diagnosis" breadcrumbItem="Project" /> */}

            {/* ============================ HERO ============================ */}
            <section className="bc-hero ">
                <div className="bc-container pt-16">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-heart-pulse-fill"></i> AI in Healthcare
                            </span>
                            <h1>Multimodal Breast Cancer Intelligence Platform</h1>
                            <p className="bc-hero-sub " >
                                Development of a comprehensive multimodal AI system integrating mammography, ultrasound, pathology, clinical records, radiology reports, and genomic data for breast cancer screening, diagnosis, prognosis, report generation, treatment planning, and clinical decision support.
                            </p>

                            <div className="bc-meta">
                                <span className="bc-chip">
                                    
                                    <span className="bc-chip-content">
                                       <div className='flex' >
                                         <i className="bi bi-person-badge"></i>
                                        <span className="bc-chip-label">Principal Investigator</span>
                                       </div>
                                        <span className="bc-chip-value">Dr. Mohammad Monir Uddin</span>
                                    </span>
                                </span>

                                <span className="bc-chip">
                                    <i className="bi bi-mortarboard"></i>
                                    <span className="bc-chip-content">
                                        <span className="bc-chip-label">Institution</span>
                                        <span className="bc-chip-value">North South University</span>
                                    </span>
                                </span>

                                <span className="bc-chip">
                                    <i className="bi bi-cash-coin"></i>
                                    <span className="bc-chip-content">
                                        <span className="bc-chip-label">Grant ID</span>
                                        <span className="bc-chip-value">CTRG-21-SEPS-15</span>
                                    </span>
                                </span>
                            </div>
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

            {/* ============================ STATS ============================ */}
            <div className="bc-stats">
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
                </div>
            </div>

            {/* ============================ STICKY SUB-NAV ============================ */}
            <nav className="bc-subnav" aria-label="Project sections">
                <div className="bc-container">
                    <div className="bc-subnav-inner">
                        {NAV_SECTIONS.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={activeSection === item.id ? 'is-active' : ''}
                                aria-current={activeSection === item.id ? 'true' : undefined}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* ============================ OVERVIEW ============================ */}
            <section className="bc-section" id="overview" ref={registerSection('overview')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What it is</span>
                        <h2>Project Overview</h2>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="project-details-content">
                                <h2>Multimodal AI for Breast Cancer Diagnosis</h2>

                                <h3>Project Overview</h3>
                                <p>
                                    This research project, funded by North South University under project ID <strong>CTRG-21-SEPS-15</strong>,
                                    advances breast cancer diagnosis through cutting-edge techniques for precision segmentation and
                                    comprehensive report generation from mammographic images.
                                </p>
                                <p>
                                    Led by <strong>Dr. Mohammad Monir Uddin</strong>, the project leverages advanced image processing
                                    and machine learning methodologies to enhance the accuracy and efficiency of detecting and
                                    characterizing breast abnormalities in mammograms.
                                </p>

                                <h3>Objective and Impact</h3>
                                <p>
                                    The primary objective is to create a robust system capable of <strong>precise segmentation</strong> of
                                    regions of interest in mammographic images, enabling early and accurate identification of
                                    potential cancerous lesions.
                                </p>

                                <h4>Key Goals</h4>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Precision Segmentation</strong>: Identify and isolate abnormalities with 90%+ accuracy</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Comprehensive Reporting</strong>: Generate detailed diagnostic reports for medical professionals</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Early Detection</strong>: Enable identification of lesions at earlier stages than traditional methods</li>
                                    <li><i className="bi bi-check-circle-fill"></i> <strong>Clinical Integration</strong>: Seamless workflow integration with existing hospital systems</li>
                                </ul>

                                <h3>The Challenge</h3>
                                <p>
                                    The primary challenge in breast cancer diagnosis lies in accurately identifying and segmenting
                                    subtle abnormalities in mammographic images while minimizing false positives. Traditional methods
                                    often result in high false positive rates (70–80%), missed early-stage lesions, inter-observer
                                    variability among radiologists, and time-intensive manual analysis.
                                </p>

                                <h3>Our Solution</h3>
                                <p>
                                    Our solution leverages <strong>multimodal AI techniques</strong> combining advanced deep learning
                                    architectures with medical domain knowledge to achieve precise segmentation and generate
                                    comprehensive diagnostic reports that aid radiologists in making informed decisions.
                                </p>

                                <h3>Project Benefits</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-check-circle-fill"></i> Enhanced accuracy in detecting breast abnormalities using state-of-the-art AI models</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Early identification of potential cancerous lesions through precision segmentation</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Automated comprehensive report generation for medical professionals</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Improved clinical decision-making with actionable diagnostic insights</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Reduced diagnostic time while maintaining high accuracy standards</li>
                                </ul>

                                <h3>Clinical Workflow Integration</h3>
                                <ol className="project-details-list">
                                    <li><strong>Image Acquisition</strong> — Mammograms captured from standard FWHM-compliant equipment</li>
                                    <li><strong>Automated Analysis</strong> — Real-time processing and segmentation (avg. 45 seconds per case)</li>
                                    <li><strong>Radiologist Review</strong> — AI-assisted interpretation with highlighted regions and preliminary report</li>
                                    <li><strong>Report Finalization</strong> — Radiologist reviews, edits, and approves the final diagnostic report</li>
                                    <li><strong>Patient Communication</strong> — Structured findings communicated to referring physicians</li>
                                </ol>

                                <h3>Future Directions</h3>
                                <ul className="project-details-list">
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> 3D Tomosynthesis Integration — full volumetric analysis</li>
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> Multi-center Validation — deployment across 5+ hospitals</li>
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> Federated Learning — privacy-preserving multi-institutional training</li>
                                    <li><i className="bi bi-arrow-right-circle-fill"></i> Integration with molecular subtype prediction</li>
                                </ul>

                                <h3>Publications</h3>
                                <p>
                                    <strong>Ahmed, I.</strong> et al. "OncoVision: Integrating Mammography and Clinical Data through
                                    Attention-Driven Multimodal AI for Enhanced Breast Cancer Diagnosis" —{' '}
                                    <em>Nature Communications Medicine</em> (Under Review)
                                </p>

                                <h3>Team and Collaboration</h3>
                                <p>
                                    <strong>Principal Investigator:</strong> Dr. Mohammad Monir Uddin<br />
                                    <strong>Research Institution:</strong> North South University<br />
                                    <strong>Industry Partner:</strong> Big-Matrix Solutions
                                </p>
                            </div>
                        </div>

                        <aside className="bc-callout">
                            <h3><i className="bi bi-bullseye"></i> Objective &amp; Impact</h3>
                            <p>
                                The primary objective is to create a robust system capable of{' '}
                                <strong>precise segmentation</strong> of regions of interest in mammographic
                                images, enabling early and accurate identification of potential cancerous
                                lesions — and ultimately improving patient outcomes.
                            </p>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ============================ CHALLENGE ============================ */}
            <section className="bc-section bc-alt" id="challenge" ref={registerSection('challenge')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it matters</span>
                        <h2>The Challenge</h2>
                        <p>
                            Accurately identifying and segmenting subtle abnormalities in mammographic images —
                            while minimizing false positives — remains one of the hardest problems in
                            diagnostic radiology.
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

            {/* ============================ SOLUTION ============================ */}
            <section className="bc-section" id="solution" ref={registerSection('solution')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The approach</span>
                        <h2>Our Solution</h2>
                        <p>
                            We combine <strong>multimodal AI techniques</strong> — advanced deep learning
                            architectures paired with medical domain knowledge — to achieve precise
                            segmentation and generate comprehensive diagnostic reports that help radiologists
                            make informed decisions.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
                        {keyGoals.map((goal) => (
                            <div className="bc-card" key={goal.title}>
                                <span className="bc-card-icon"><i className={goal.icon}></i></span>
                                <h4>{goal.title}</h4>
                                <p>{goal.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ WORKFLOW ============================ */}
            <section className="bc-section bc-alt" id="workflow" ref={registerSection('workflow')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it works</span>
                        <h2>Clinical Workflow Integration</h2>
                        <p>From image capture to physician communication, the system slots into the existing diagnostic pipeline.</p>
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

            {/* ============================ IMPACT / BENEFITS ============================ */}
            <section className="bc-section" id="impact" ref={registerSection('impact')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Key outcomes</span>
                        <h2>Project Benefits</h2>
                        <p>Tangible improvements delivered across accuracy, speed, and clinical decision-making.</p>
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

            {/* ============================ FUTURE + PUBLICATION ============================ */}
            <section className="bc-section bc-alt" id="future" ref={registerSection('future')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What's next</span>
                        <h2>Future Directions &amp; Research Impact</h2>
                        <p>The roadmap extends the system toward broader validation, richer data, and privacy-preserving collaboration.</p>
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
                        <span className="bc-pub-icon"><i className="bi bi-journal-text"></i></span>
                        <div>
                            <div className="bc-pub-label">Publication Highlight</div>
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

            {/* ============================ TEAM ============================ */}
            <section className="bc-section" id="team" ref={registerSection('team')}>
                <div className="bc-container">
                    <div className="bc-section-head bc-center">
                        <span className="bc-eyebrow" style={{ justifyContent: 'center' }}>Collaboration</span>
                        <h2>Team &amp; Collaboration</h2>
                        <p>A partnership between academic research leadership and industry engineering.</p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {team.map((member) => (
                            <div className="bc-team-card" key={member.name}>
                                <div className="bc-team-avatar"><i className={member.icon}></i></div>
                                <div className="bc-team-role">{member.role}</div>
                                <h4>{member.name}</h4>
                                <p>{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ CTA ============================ */}
            {/* <div className="bc-container">
                <section className="bc-cta">
                    <div>
                        <h2>Interested in this research or a clinical collaboration?</h2>
                        <p>
                            Reach out to discuss the Multimodal AI for Breast Cancer Diagnosis project,
                            potential partnerships, or deployment in your institution.
                        </p>
                        <div className="bc-cta-actions">
                            <Link to="/contact" className="bc-btn bc-btn-primary">
                                Contact Us <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="bc-cta-contact">
                        <a href="tel:+88025566820">
                            <i className="bi bi-telephone-fill"></i> +880-2-55668200 (Ext: 6212)
                        </a>
                        <a href="mailto:contact@big-matrix.com">
                            <i className="bi bi-envelope-fill"></i> contact@big-matrix.com
                        </a>
                        <span>
                            <i className="bi bi-geo-alt-fill"></i> Big-Matrix Solutions
                        </span>
                    </div>
                </section>
            </div> */}
        </div>
    );
};

export default ProjectBreastCancer;
