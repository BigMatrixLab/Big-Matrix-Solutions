import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TeamArea from '../components/TeamArea';
import CounterArea from '../components/CounterArea';
import TestimonialArea from '../components/TestimonialArea';
import BrandArea from '../components/BrandArea';

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
                                    <h4>Business Growth</h4>
                                    <p>Completely fashion reliable more products grow business</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-2.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>eCommerce</h4>
                                    <p>Completely fashion reliable more products grow business</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-3.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Secure Database</h4>
                                    <p>Completely fashion reliable more products grow business</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-feature-box">
                                <div className="feature-icon">
                                    <img src="/assets/images/home-3/feature-icon-4.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4>Audinece Growth</h4>
                                    <p>Completely fashion reliable more products grow business</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Area Inner Style One */}
            <div className="about-area inner-style-one">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-left">
                                <div className="about-thumb">
                                    <img src="/assets/images/about-inner/about-thumb.jpg" alt="" />
                                </div>
                                <div className="abour-award-box">
                                    <div className="about-award-icon">
                                        <img src="/assets/images/about-inner/about-award-icon.png" alt="" />
                                    </div>
                                    <div className="about-award-content">
                                        <h4>Award Wining</h4>
                                        <p>Best Services</p>
                                    </div>
                                </div>
                                <div className="about-conuter-box">
                                    <div className="about-counter-icon">
                                        <img src="/assets/images/about-inner/about-counter-icon.png" alt="" />
                                    </div>
                                    <div className="about-counter-content">
                                        <h4>10</h4>
                                        <span>+</span>
                                        <p>Completed Projects</p>
                                    </div>
                                </div>
                                <div className="about-shape">
                                    <img src="/assets/images/about-inner/about-shape.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="abour-right">
                                <div className="section-title left inner-style">
                                    <h4>IT Support for Business</h4>
                                    <h1>Successfully Delivered 10+</h1>
                                    <h1>Healthcare Projects</h1>
                                    <p className="section-desc">Monotonectally synergize granular markets and front markets. Collaboratively
                                        visualize strategic infomediaries after multimedia based models. Synergistically
                                        task state of the art infrastructures for</p>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="about-list-item">
                                            <ul>
                                                <li><i className="bi bi-check"></i>Company and Research</li>
                                                <li><i className="bi bi-check"></i>Business and research</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="about-text">
                                            <div className="about-number">
                                                <h4>45%</h4>
                                            </div>
                                            <div className="about-text-content">
                                                <h4>Solution Business</h4>
                                                <p>Level is high</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-company">
                                    <div className="about-company-icon">
                                        <i className="bi bi-quote"></i>
                                    </div>
                                    <div className="about-company-desc">
                                        <p>If you are accused of committing a crime, you will the very best criminal defense attorneys.</p>
                                    </div>
                                </div>
                                <div className="toptech-button inner-style">
                                    <a href="#">More About<i className="bi bi-arrow-right-short"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
            <CounterArea />
            <TestimonialArea />

            {/* Faqs Area */}
            <div className="faqs-area inner-style">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="section-title left inner-style">
                                <h4>Our Help & Faq Us </h4>
                                <h1>Navigating FAQs with Speed</h1>
                                <h1>and Precision</h1>
                                <p>Business tailored it design, management & support services needs to be
                                    business agency elit, sed do eiusmod tempor proved.</p>
                            </div>
                            <div className="faqs-thumb mb-4">
                                <img src="/assets/images/inner-images/faqs-1.jpg" alt="" />
                            </div>
                            <div className="faqs-thumb mb-4">
                                <img src="/assets/images/inner-images/faqs-2.jpg" alt="" />
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="faqs-container">
                                {[
                                    { q: "Project Horizon Redevelopment", a: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
                                    { q: "What is your professional passion?", a: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
                                    { q: "Service Horizon Business low", a: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
                                    { q: "Business Solution Redevelopment", a: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
                                    { q: "Do you have any custom services?", a: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" }
                                ].map((faq, index) => (
                                    <div className={`faq-singular ${activeIndex === index ? 'active' : ''}`} key={index}>
                                        <h2 className="faq-question" onClick={() => toggleFAQ(index)}>
                                            <img src="/assets/images/inner-images/faqs-icon1.png" alt="" /> {faq.q}
                                        </h2>
                                        <div className="faq-answer">
                                            <div className="desc">{faq.a}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default AboutOne;
