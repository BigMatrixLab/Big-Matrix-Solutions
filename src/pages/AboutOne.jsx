import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import TestimonialArea from '../components/TestimonialArea';
import ValueSection from '../components/ValueSection';
import CtaBand from '../components/CtaBand';

const PRACTICE_AREAS = [
    {
        icon: 'bi-hospital',
        title: 'Healthcare Ecosystems',
        desc: 'Intelligent digital solutions including EMR, HMS and diagnostics for modern healthcare delivery.',
    },
    {
        icon: 'bi-cpu',
        title: 'Advanced AI Research',
        desc: 'Computational models, deep learning and predictive analytics for complex problem solving.',
    },
    {
        icon: 'bi-gear-wide-connected',
        title: 'Industrial Transformation',
        desc: 'Enterprise automation, smart manufacturing systems and data-driven operational optimisation.',
    },
    {
        icon: 'bi-shield-lock',
        title: 'Secure Infrastructure',
        desc: 'Scalable, compliant cloud architecture meeting the highest standards of data security.',
    },
];

const AboutOne = () => {
    return (
        <>
            <Breadcrumb
                pageTitle="A lab that ships production software"
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
                        description="To engineer advanced AI and big data platforms that transform how the world operates."
                        items={[
                            "Developing Clinical Excellence: Building AI-powered diagnostic tools that enhance accuracy in radiology, pathology, and general medicine.",
                            "Advancing Industrial Automation: Creating software that intelligently handles regular industrial and hospital machinery to optimize production and care.",
                            "Empowering Public Health: Providing governments and pharma companies with disease mapping and predictive analytics to manage outbreaks and drug supply chains.",
                            "Bridging Research and Application: Utilizing our dedicated research facility to turn complex mathematical models and deep learning into deployable enterprise solutions.",
                            "Ensuring Secure Scalability: Designing EHR/EMR and management systems that are secure, compliant, and capable of handling massive datasets across multiple industries."
                        ]}
                        reversed={true}
                    />

                    {/* Vision */}
                       <ValueSection
                            icon="eye"
                            title="Our Vision"
                            description="To architect the intelligent infrastructure of the future."
                            items={[
                                "Integrated Ecosystems replace fragmented software, creating seamless connectivity across healthcare, pharma, and industry.",
                                "AI-Driven Decision Making is the global standard for clinical accuracy, industrial efficiency, and public health safety.",
                                "Scalable Intelligence is accessible at every level—from individual clinics to national government infrastructures.",
                                "Data-Driven Prediction eliminates systemic waste and prepares society for future health and industrial challenges."
                            ]}
                            reversed={false}
                        />
                   

                    <ValueSection
                        icon="stars"
                        title="Core Values"
                        description="The principles that guide our work and define our commitment to excellence."
                        items={[
                            "Systemic Innovation: We don't just build apps; we build interconnected ecosystems.",
                            "Scientific Integrity: Every AI model is backed by rigorous research and mathematical validation.",
                            "Scalability by Design: We engineer solutions today that are ready for the data loads of tomorrow.",
                            "Cross-Industry Transformation: We translate high-level intelligence from healthcare into education, garments, and heavy industry."
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
