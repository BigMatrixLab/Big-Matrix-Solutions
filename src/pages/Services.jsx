import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const Services = () => {
    const services = [
        { title: "Cloud Services", icon: "/assets/images/service-inner/service-icon-1.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "IT Management", icon: "/assets/images/service-inner/service-icon-2.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "Software Renew", icon: "/assets/images/service-inner/service-icon-3.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "Machine Learning", icon: "/assets/images/service-inner/service-icon-4.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "Digital Marketing", icon: "/assets/images/service-inner/service-icon-5.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "Web Development", icon: "/assets/images/service-inner/service-icon-6.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "Cyber Security", icon: "/assets/images/service-inner/service-icon-7.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
        { title: "Data Analytic", icon: "/assets/images/service-inner/service-icon-8.png", desc: "Monotonectal grants to business visualize provid solution services business provid done" },
    ];

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
                                <h1>Provide Interective IT Solution</h1>
                                <h1>Business Services</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {services.map((service, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div className="single-service-box">
                                    <div className="service-icon">
                                        <img src={service.icon} alt={service.title} />
                                    </div>
                                    <div className="service-content">
                                        <h4>{service.title}</h4>
                                        <p>{service.desc}</p>
                                        <a href="#">Learn More <i className="bi bi-arrow-right"></i></a>
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
                                <h1>Get Latest Update from Toptech</h1>
                                <h1>Stay Connect with Us</h1>
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
