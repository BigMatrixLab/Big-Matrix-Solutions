import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const Mission = () => {
    return (
        <>
            <Breadcrumb pageTitle="Mission & Vision" breadcrumbItem="Mission" />

            <div className="mission-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="mission-thumb">
                                <img src="/assets/images/inner-images/mission-thumb.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission-content">
                                <div className="section-title left">
                                    <h4>Our Mission</h4>
                                    <h1>Innovative Solutions for Business Success</h1>
                                    <p>Monotonectally synergize granular top visualize strategic infomediaries after task state of the art infrastructures digital agency in north.</p>
                                </div>
                                <div className="mission-list">
                                    <ul>
                                        <li><i className="bi bi-check-circle-fill"></i> Best IT Solutions</li>
                                        <li><i className="bi bi-check-circle-fill"></i> Expert Team Members</li>
                                        <li><i className="bi bi-check-circle-fill"></i> 24/7 Customer Support</li>
                                    </ul>
                                </div>
                                <div className="section-title left mt-5">
                                    <h4>Our Vision</h4>
                                    <h1>Leading the Industry with Technology</h1>
                                    <p>Continually fashion orthogonal leadership skills whereas wireless metrics. Uniquely syndicate exceptional opportunities with interdependent users.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default Mission;
