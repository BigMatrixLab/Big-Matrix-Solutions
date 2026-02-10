import React from 'react';
import { Link } from 'react-router-dom';

const ServiceArea = () => {
    return (
        <div className="service-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h4>IT Support For Business </h4>
                            <h1>Ensuring Your Success Trusted</h1>
                            <h1>IT Services Source</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-services-box">
                            <div className="service-icon-thumb">
                                <img src="/assets/images/home-2/service-1.png" alt="" />
                            </div>
                            <div className="service-number">
                                <h1>01</h1>
                            </div>
                            <div className="service-content">
                                <h4>Graphic Design</h4>
                                <p>Monotonectally synergize grants to business visualize strategic infomediaries</p>
                                <Link to="/service">Read More<i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-services-box">
                            <div className="service-icon-thumb">
                                <img src="/assets/images/home-2/service-2.png" alt="" />
                            </div>
                            <div className="service-number">
                                <h1>02</h1>
                            </div>
                            <div className="service-content">
                                <h4>Cloud Solutions</h4>
                                <p>Monotonectally synergize grants to business visualize strategic infomediaries</p>
                                <Link to="/service">Read More<i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-services-box">
                            <div className="service-icon-thumb">
                                <img src="/assets/images/home-2/service-3.png" alt="" />
                            </div>
                            <div className="service-number">
                                <h1>03</h1>
                            </div>
                            <div className="service-content">
                                <h4>WP Development</h4>
                                <p>Monotonectally synergize grants to business visualize strategic infomediaries</p>
                                <Link to="/service">Read More<i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-services-box">
                            <div className="service-icon-thumb">
                                <img src="/assets/images/home-2/service-4.png" alt="" />
                            </div>
                            <div className="service-number">
                                <h1>04</h1>
                            </div>
                            <div className="service-content">
                                <h4>Digital Marketing</h4>
                                <p>Monotonectally synergize grants to business visualize strategic infomediaries</p>
                                <Link to="/service">Read More<i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-services-box">
                            <div className="service-icon-thumb">
                                <img src="/assets/images/home-2/service-5.png" alt="" />
                            </div>
                            <div className="service-number">
                                <h1>05</h1>
                            </div>
                            <div className="service-content">
                                <h4>3D Vector Illustration</h4>
                                <p>Monotonectally synergize grants to business visualize strategic infomediaries</p>
                                <Link to="/service">Read More<i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-services-box">
                            <div className="service-icon-thumb">
                                <img src="/assets/images/home-2/service-6.png" alt="" />
                            </div>
                            <div className="service-number">
                                <h1>06</h1>
                            </div>
                            <div className="service-content">
                                <h4>Hosting Services</h4>
                                <p>Monotonectally synergize grants to business visualize strategic infomediaries</p>
                                <Link to="/service">Read More<i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceArea;
