import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TeamArea from '../components/TeamArea';
import TestimonialArea from '../components/TestimonialArea';
import AboutArea from '../components/AboutArea';

const AboutOne = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <Breadcrumb pageTitle="About Us" />

            {/* Images Area */}
            <div className="images-area inner-style-one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="images-thumb">
                                <img src="/assets/images/about-inner/about-images.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Area Style Three */}
            <div className="feature-area style-three">
                <div className="container">
                    <div className="row margin-top">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-1.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Healthcare Ecosystems</h4>
                                    <p>Intelligent digital solutions including EMR, HMS, and diagnostics for modern healthcare delivery.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-2.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Advanced AI Research</h4>
                                    <p>Cutting-edge computational models, deep learning, and predictive analytics for complex problem solving.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-3.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Industrial Transformation</h4>
                                    <p>Enterprise automation, smart manufacturing systems, and data-driven operational optimization.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
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

      
            <AboutArea />

            {/* Mission Vison Area */}
            <div className="mission-area inner-style">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mission-thumb">
                                <img src="/assets/images/inner-images/mission-1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission-box">
                                <div className="mission-content">
                                    <h4>Our Mission</h4>
                                    <div className="single-icon-box">
                                        <div className="single-icon-thumb">
                                            <i className="bi bi-check"></i>
                                        </div>
                                        <div className="sigle-icon-desc">
                                            <p>We Communicate clearly, because in a world crowded with over-the-top marketing. simple wins.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <div className="single-icon-thumb">
                                            <i className="bi bi-check"></i>
                                        </div>
                                        <div className="sigle-icon-desc">
                                            <p>We are not rock stars, ninjas or any other disingenuous buzz term. We are creative professionals.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <div className="single-icon-thumb">
                                            <i className="bi bi-check"></i>
                                        </div>
                                        <div className="sigle-icon-desc">
                                            <p>Before you can market a business, you need to know its story support staff that’s always there when you need us..</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mission-button">
                                    <a href="#">Find out more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <div className="mission-box two">
                                <div className="mission-content">
                                    <h4>Our Drive and Vision</h4>
                                    <div className="single-icon-box">
                                        <div className="single-icon-thumb">
                                            <i className="bi bi-check"></i>
                                        </div>
                                        <div className="sigle-icon-desc">
                                            <p>We Communicate clearly, because in a world crowded with over-the-top marketing. simple wins.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <div className="single-icon-thumb">
                                            <i className="bi bi-check"></i>
                                        </div>
                                        <div className="sigle-icon-desc">
                                            <p>We are not rock stars, ninjas or any other disingenuous buzz term. We are creative professionals.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <div className="single-icon-thumb">
                                            <i className="bi bi-check"></i>
                                        </div>
                                        <div className="sigle-icon-desc">
                                            <p>Before you can market a business, you need to know its story support staff that’s always there when you need us..</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mission-button">
                                    <a href="#">Find out more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission-thumb two">
                                <img src="/assets/images/inner-images/mission-2.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TeamArea />
            <TestimonialArea />

        </>
    );
};

export default AboutOne;
