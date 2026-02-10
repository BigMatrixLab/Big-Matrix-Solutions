import React from 'react';
import { Link } from 'react-router-dom';

const AboutArea = () => {
    return (
        <div className="about-area style-two">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="about-left">
                            <div className="about-thumb">
                                <img src="/assets/images/home-2/about-thumb.png" alt="" />
                            </div>
                            <div className="about-shape">
                                <img src="/assets/images/home-2/about-shape.png" alt="" />
                            </div>
                            <div className="about-conter-box">
                                <div className="about-counter-title">
                                    <h4>18</h4>
                                    <span>+</span>
                                    <p>Years Of <br /> Experiences </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-right">
                            <div className="section-title left style-two">
                                <h4>IT Support For Business</h4>
                                <h1>Ensuring Your Success Trusted</h1>
                                <h1>IT Services Source</h1>
                                <p>Monotonectally synergize granular markets and front markets. Collaboratively visualize strategic infomediaries after multimedia based models. Synergistically task state of the art infrastructures for</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-about-icon-box">
                                        <div className="about-icon">
                                            <img src="/assets/images/home-2/about-icon1.png" alt="" />
                                        </div>
                                        <div className="about-icon-box-content">
                                            <h4>100% Money Back Gaurentee</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-about-icon-box">
                                        <div className="about-icon">
                                            <img src="/assets/images/home-2/about-icon2.png" alt="" />
                                        </div>
                                        <div className="about-icon-box-content">
                                            <h4>Expert & Dedicated Team Members</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-about-icon-box">
                                        <div className="about-icon">
                                            <img src="/assets/images/home-2/about-icon3.png" alt="" />
                                        </div>
                                        <div className="about-icon-box-content">
                                            <h4>24/7 Free Tehcnical Supports</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-about-icon-box">
                                        <div className="about-icon">
                                            <img src="/assets/images/home-2/about-icon4.png" alt="" />
                                        </div>
                                        <div className="about-icon-box-content">
                                            <h4>100% Customers Satisfaction</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="toptech-button style-one">
                                <Link to="/about">About More<i className="bi bi-arrow-right-circle-fill"></i></Link>
                            </div>
                            <div className="about-shape-two">
                                <img src="/assets/images/home-2/about-shape2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutArea;
