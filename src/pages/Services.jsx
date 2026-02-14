import React from 'react';
import servicesData from '../data/services.json';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Services = () => {
    return (
        <>
            <Breadcrumb pageTitle="Our Service" breadcrumbItem="Service" />

            {/* Service Area Inner Style */}
            <div className="service-area inner-style">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                <h4>What We Provides?</h4>
                                <h1>Provide Interactive IT Solution</h1>
                                <h1>Business Services</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {servicesData.map((service) => (
                            <div className="col-lg-4 col-md-6 col-sm-1" key={service.id}>
                                <div className="single-service-box">
                                    <div className="service-icon">
                                        <i className={service.icon}></i>
                                    </div>
                                    <div className="service-content">
                                        <h4>{service.title}</h4>
                                        <p>{service.desc}</p>
                                        <Link to={`/service/${service.slug}`}>
                                            Learn More 
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscribe Area Style Three */}
            <div className="subscribe-area style-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="section-title left inner-style">
                                <h1>Get Latest Update from Big-Matrix Solutions</h1>
                                <h1>Stay Connected with Us</h1>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                <div className="single-subscribe-box">
                                    <input type="text" name="Email" placeholder="Enter your Email" required />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Area Style Three */}
            <div className="process-area style-three inner">
                <div className="container">
                    <div className="row add-bg">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-1.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Account Register</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-2.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Add New Card</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-3.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Varyfied Account</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
