import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import TestimonialArea from '../components/TestimonialArea';
import ValueSection from '../components/ValueSection';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';
import ContactRows from '../components/ContactRows';
import CompanyRows from '../components/CompanyRows';
import LEGAL from '../data/legal.json';

/* Company profile text from the About Us document (data/legal.json), which
   also builds the company profile PDF, so the page and the PDF stay in step. */
const ABOUT = LEGAL.documents.find((doc) => doc.slug === 'about-us');
const section = (heading) => ABOUT.sections.find((item) => item.heading === heading);
const PROFILE_PDF = '/documents/big-matrix-solutions-about-us.pdf';

const FOLLOW = [
    { href: LEGAL.company.linkedin, label: 'LinkedIn', icon: 'bi-linkedin' },
    { href: LEGAL.company.facebook, label: 'Facebook', icon: 'bi-facebook' },
];

const PRACTICE_AREAS = [
   
    {
        icon: 'bi-cpu',
        title: 'Advanced AI Development',
        desc: 'Computational models, deep learning and predictive analytics for complex problem solving.',
    },
     {
        icon: 'bi-cloud-check',
        title: 'SaaS Platforms',
        desc: 'Multi-tenant architecture, subscription billing and release engineering for software that runs in production.',
    },
     {
        icon: 'bi-hospital',
        title: 'Healthcare Ecosystems',
        desc: 'Intelligent digital solutions including EMR, HMS and diagnostics for modern healthcare delivery.',
    },
    {
        icon: 'bi-gear-wide-connected',
        title: 'Industrial Transformation',
        desc: 'Enterprise automation, smart manufacturing systems and data-driven operational optimisation.',
    },
   
];

const AboutOne = () => {
    return (
        <>
            <Seo
                title="About the company"
                description="A research and development company that ships production software. Who we are, how we work, and the practice areas we build in."
                path="/about"
            />
            <Breadcrumb
                pageTitle="A company that ships production software"
                breadcrumbItem="About"
            />

            <section className="bm-section bm-about__intro">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Who we are"
                        title="Four disciplines, one engineering standard"
                        lead={ABOUT.intro[0]}
                    />
                    <div className="bm-grid bm-grid--4">
                        {PRACTICE_AREAS.map((area) => (
                            <article className="bm-card" key={area.title}>
                                <div className="bm-card__body">
                                    <span className="bm-card__icon">
                                        <i className={`bi ${area.icon}`} aria-hidden="true"></i>
                                    </span>
                                    <h3 className="bm-card__title">{area.title}</h3>
                                    <p className="bm-card__text">{area.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="bm-about__company">
                        <p className="bm-head__eyebrow">Company details</p>
                        <CompanyRows />
                    </div>
                </div>
            </section>

            <section className="bm-section bm-section--warm">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="What drives us"
                        title="Mission, vision and the values underneath"
                    />

                    {/* Mission */}
                    <ValueSection
                        icon="target"
                        title="Our Mission"
                        headline="What we are building."
                        description="To engineer advanced AI platforms that transform how the world operates."
                        items={[
                            "Diagnostic tools for radiology, pathology and general medicine, with the clinician still signing the report.",
                            "Software that drives hospital and infrastructure, so care and production stop waiting on manual steps.",
                            "Disease mapping and demand forecasting that let health authorities move before an outbreak becomes a crisis.",
                            "Research that leaves the lab, turning mathematical models and deep learning into systems people actually run."
                        ]}
                        reversed={true}
                    />

                    {/* Vision */}
                       <ValueSection
                            icon="eye"
                            title="Our Vision"
                            headline="Where it is heading."
                            description="To architect the intelligent infrastructure of the future."
                            items={[
                                "Integrated ecosystems replace fragmented software, connecting healthcare, industry and public services on shared foundations.",
                                "AI-assisted decisions set the working standard for clinical accuracy, industrial efficiency and public health safety.",
                                "Scalable intelligence reaches every level, from a single clinic to national infrastructure.",
                                "Prediction replaces reaction, cutting systemic waste and preparing for health and industrial pressures still ahead."
                            ]}
                            reversed={false}
                        />
                   
                    {/* Core Values */}
                    <ValueSection
                        icon="stars"
                        title="Core Values"
                        headline="How we work."
                        description="The principles that guide our work and define our commitment to excellence."
                        items={[
                            "We build interconnected ecosystems rather than standalone apps that solve one problem and stop.",
                            "Every model is backed by research and mathematical validation before it reaches a patient.",
                            "We engineer for the data loads of tomorrow, not the ones already comfortable today.",
                            "Intelligence proven in healthcare carries across into education, garments and heavy industry."
                        ]}
                        reversed={true}
                    />

                    {/* Why choose us, and our commitment */}
                    <ValueSection
                        icon="shield"
                        title="Why choose us"
                        headline="What you can count on."
                        description={section('Our commitment').paragraphs[0]}
                        items={section('Why choose us').list}
                        reversed={false}
                    />
                </div>
            </section>

            <section className="bm-section">
                <div className="bm-container bm-about__connect">
                    <div>
                        <SectionHead
                            eyebrow="Connect with us"
                            title="Follow our work, or talk to us directly"
                            lead="Follow us for our latest work and updates, or contact us directly with any enquiry. Thank you for choosing Big-Matrix Solutions; we appreciate your trust in our work."
                        />
                        <ul className="bm-about__follow">
                            {FOLLOW.map((item) => (
                                <li key={item.href}>
                                    <a
                                        className="bm-button bm-button--ghost"
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bm-about__contact">
                        <p className="bm-head__eyebrow">Contact</p>
                        <ContactRows />
                        <a className="bm-button bm-button--ghost" href={PROFILE_PDF} download>
                            <i className="bi bi-file-earmark-pdf" aria-hidden="true"></i>
                            Company profile (PDF)
                        </a>
                    </div>
                </div>
            </section>

            <TestimonialArea transparent />

            <CtaBand
                eyebrow="Work with us"
                title="Bring us a hard problem."
                description="Diagnostics, interoperability, automation, scale — the messier the constraints, the more useful we are."
                secondary={{ label: 'Open roles', to: '/careers' }}
            />
        </>
    );
};

export default AboutOne;
