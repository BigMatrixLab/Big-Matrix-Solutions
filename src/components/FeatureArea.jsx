import React from 'react';
import { Link } from 'react-router-dom';

const FeatureArea = () => {
    return (
        <div className="feature-area style-two" >
            <div className="container">
                <div className="row add-marging">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature-box">
                            <div className="feature-icon">
                                <img src="/assets/images/home-2/feature-icon1.png" alt="" />
                            </div>
                            <div className="feature-content">
                                <h4>Enterprise Infrastructure</h4>
                                <p>Scalable Ecosystem Architecture Subtext: We design integrated platforms that bridge the gap between AI diagnostics, EMR systems, and hospital management, creating a seamless digital backbone for modern healthcare.</p>
                                <Link to="/service">Read More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature-box">
                            <div className="feature-icon">
                                <img src="/assets/images/home-2/feature-icon2.png" alt="" />
                            </div>
                            <div className="feature-content">
                                <h4>Innovation Lab</h4>
                                <p>Advanced R&D Facility Subtext: Our dedicated research division pioneers custom Deep Learning models and LLM frameworks, ensuring your organization stays ahead with proprietary, state-of-the-art intelligence.</p>
                                <Link to="https://big-matrix.com/">Our Research</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature-box">
                            <div className="feature-icon">
                                <img src="/assets/images/home-2/feature-icon3.png" alt="" />
                            </div>
                            <div className="feature-content">
                                <h4>Global Compliance</h4>
                                <p>Secure & Regulatory Ready Subtext: Engineering with a "Security-First" mindset, we ensure all systems meet rigorous international standards for data privacy, clinical safety, and pharmaceutical compliance.</p>
                                <Link to="/about">Security Standards</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureArea;
