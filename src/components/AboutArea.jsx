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
                                    <h4>10</h4>
                                    <span>+</span>
                                    <p>Completed <br /> Projects </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-right">
                            <div className="section-title left style-two">
                                <h4>Big-Matrix Lab Development Wing</h4>
                                <h1>Transforming Healthcare with</h1>
                                <h1>AI-Powered Solutions</h1>
                                <p style={{ textAlign: 'justify' }}>We develop cutting-edge software solutions and tools for medical research and clinical workflows. Our development wing specializes in creating AI-powered diagnostic systems, machine learning models, and data analytics platforms that accelerate medical discoveries and improve patient outcomes.</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-about-icon-box">
                                        <div className="about-icon">
                                            <img src="/assets/images/home-2/about-icon1.png" alt="" />
                                        </div>
                                        <div className="about-icon-box-content">
                                            <h4>Trusted Research Solutions</h4>
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
                                <Link to="/about">Learn More<i className="bi bi-arrow-right-circle-fill"></i></Link>
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
