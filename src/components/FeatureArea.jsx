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
                                <h4>18+ Year Experience</h4>
                                <p>Monotonically synergize grants to business visualize strategic infomediaries</p>
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
                                <h4>Dedicated Members</h4>
                                <p>Monotonically synergize grants to business visualize strategic infomediaries</p>
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
                                <h4>Valuable Supports</h4>
                                <p>Monotonically synergize grants to business visualize strategic infomediaries</p>
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
