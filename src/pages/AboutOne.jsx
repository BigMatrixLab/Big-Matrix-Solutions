import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import TestimonialArea from '../components/TestimonialArea';
import ValueSection from '../components/ValueSection';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';
import LEGAL from '../data/legal.json';
import { ContactRows } from './LegalPage';

const ABOUT = LEGAL.documents.find((doc) => doc.slug === 'about');
const section = (heading) => ABOUT.sections.find((item) => item.heading === heading);

/* "What we offer" from the About Us document (data/legal.json), the same
   four services the company letterhead version lists. */
const PRACTICE_AREAS = [
    { icon: 'bi-activity', title: 'AI diagnostics', desc: 'AI that supports clinicians in diagnosis, including medical imaging, segmentation and drafted reports.' },
    { icon: 'bi-hospital', title: 'Hospital systems', desc: 'Software for patient flow, records and daily operations.' },
    { icon: 'bi-cloud-check', title: 'SaaS platforms', desc: 'Cloud products that scale with our customers.' },
    { icon: 'bi-bag-check', title: 'E-commerce', desc: 'Online stores built to sell and scale.' },
];

/** "Lead: rest" -> { title, desc } for the "Why choose us" cards. */
const REASONS = section('Why choose us').list.map((item) => {
    const [title, desc] = item.split(': ');
    return { title, desc: desc.charAt(0).toUpperCase() + desc.slice(1) };
});
const REASON_ICONS = ['bi-check2-circle', 'bi-heart-pulse', 'bi-headset', 'bi-shield-lock', 'bi-journal-check'];

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

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Who we are"
                        title="Software for healthcare and business"
                        lead={ABOUT.intro[0]}
                    />
                    <p className="bm-about__mission">{section('Our mission').paragraphs[0]}</p>

                    <h3 className="bm-about__subhead">What we offer</h3>
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
                    <p className="bm-about__products">{section('What we offer').after[0]}</p>
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
                </div>
            </section>

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead eyebrow="Why choose us" title="What you can count on" />
                    <div className="bm-grid bm-grid--3">
                        {REASONS.map((reason, i) => (
                            <article className="bm-card" key={reason.title}>
                                <div className="bm-card__body">
                                    <span className="bm-card__icon">
                                        <i className={`bi ${REASON_ICONS[i]}`} aria-hidden="true"></i>
                                    </span>
                                    <h3 className="bm-card__title">{reason.title}</h3>
                                    <p className="bm-card__text">{reason.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bm-section bm-section--warm">
                <div className="bm-container bm-about__connect">
                    <div>
                        <SectionHead eyebrow="Our commitment" title="Built to last, supported for the long run" />
                        <p className="bm-about__text">{section('Our commitment').paragraphs[0]}</p>
                        <p className="bm-about__text">
                            Follow us on{' '}
                            <a href={LEGAL.company.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            {' '}and{' '}
                            <a href={LEGAL.company.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            {' '}for our latest work and updates.
                        </p>
                    </div>
                    <div className="bm-about__contact">
                        <p className="bm-head__eyebrow">Connect with us</p>
                        <ContactRows />
                        <a className="bm-button bm-button--ghost" href="/documents/big-matrix-solutions-about.pdf" download>
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
