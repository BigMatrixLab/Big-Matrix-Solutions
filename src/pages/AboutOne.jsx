import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import TestimonialArea from '../components/TestimonialArea';
import ValueSection from '../components/ValueSection';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';

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

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Practice areas"
                        title="Four disciplines, one engineering standard"
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
                            "Disease mapping and demand forecasting that let governments and pharma move before an outbreak or a stockout.",
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
                                "Integrated ecosystems replace fragmented software, connecting healthcare, pharmaceuticals and industry on shared foundations.",
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
