import React from 'react';
import { Link } from 'react-router-dom';

const FeatureArea = () => {
    return (
        <div className="feature-area style-two">
            <div className="container">
                <div className="row add-marging">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature-box">
                            <div className="feature-icon">
                                <img src="/assets/images/home-2/feature-icon1.png" alt="" />
                            </div>
                            <div className="feature-content">
                                <h4>AI-Powered Analytics</h4>
                                <p>Machine learning models transforming medical data into actionable clinical insights</p>
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
                                <h4>Big Data Solutions</h4>
                                <p>Scalable infrastructure for processing and analyzing massive healthcare datasets</p>
                                <Link to="/service">Read More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-feature-box">
                            <div className="feature-icon">
                                <img src="/assets/images/home-2/feature-icon3.png" alt="" />
                            </div>
                            <div className="feature-content">
                                <h4>Data Security</h4>
                                <p>Enterprise-grade security ensuring privacy and compliance with healthcare standards</p>
                                <Link to="/service">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureArea;
