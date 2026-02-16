import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TeamArea from '../components/TeamArea';
import TestimonialArea from '../components/TestimonialArea';
import AboutArea from '../components/AboutArea';
import ValueSection from '../components/ValueSection';

const AboutOne = () => {
    return (
        <>
            <Breadcrumb pageTitle="About Us" />

            {/* Feature Area Style Three */}
            <div className="feature-area style-three" style={{paddingTop: '80px'}}>
                <div className="container">
                    <div className="row margin-top">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="single-feature-box h-100">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-1.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Healthcare Ecosystems</h4>
                                    <p>Intelligent digital solutions including EMR, HMS, and diagnostics for modern healthcare delivery.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="single-feature-box h-100">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-2.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Advanced AI Research</h4>
                                    <p>Cutting-edge computational models, deep learning, and predictive analytics for complex problem solving.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="single-feature-box h-100">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-3.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Industrial Transformation</h4>
                                    <p>Enterprise automation, smart manufacturing systems, and data-driven operational optimization.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="single-feature-box h-100">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-4.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Secure Infrastructure</h4>
                                    <p>Scalable, compliant cloud architecture ensuring highest standards of data security and reliability.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
            {/* Mission Vison Area */}
            <div className="mission-area inner-style">
                <div className="container">
                    

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
            </div>

            <TeamArea />
            <TestimonialArea />

        </>
    );
};

export default AboutOne;
