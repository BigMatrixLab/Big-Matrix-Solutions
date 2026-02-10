import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TeamArea from '../components/TeamArea';
import CounterArea from '../components/CounterArea';
import TestimonialArea from '../components/TestimonialArea';
import BrandArea from '../components/BrandArea';

const AboutOne = () => {
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
                                        <h4>283</h4>
                                        <span>K+</span>
                                        <p>Complete Project</p>
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
                                    <h1>About is Over 291+ Company</h1>
                                    <h1>Business Solution.</h1>
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

            <TeamArea />
            <CounterArea />
            <TestimonialArea />
            <BrandArea />
        </>
    );
};

export default AboutOne;
