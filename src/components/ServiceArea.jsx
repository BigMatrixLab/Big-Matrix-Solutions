import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/content';

// Explicit display order for the homepage "Our Solutions" cards.
// Reordered from the default 1-6 to 5,6,4,3,2,1 by slug.
const homeServiceOrder = [
    'ai-machine-learning',        // was 5
    'big-data-analytics',         // was 6
    'enterprise-saas-platform',   // was 4
    'industrial-automation',      // was 3
    'cloud-devops-architecture',  // was 2
    'cybersecurity-compliance',   // was 1
];

const ServiceArea = () => {
    const orderedServices = homeServiceOrder
        .map((slug) => servicesData.find((service) => service.slug === slug))
        .filter(Boolean);

    return (
        <div className="service-area style-two" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h2 style={{ color: "#0C5ADB", paddingBottom: "10px" }}>Our Solutions</h2>
                            <h1>Cutting-Edge Technology for</h1>
                            <h1>Intelligent Infrastructure</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {orderedServices.map((service, index) => (
                        <div className="col-lg-4 col-md-6" key={service.id}>
                            <div className="single-services-box">
                                <div className="service-icon-thumb">
                                    <i className={service.icon}></i>
                                </div>
                                <div className="service-number">
                                    <h1>0{index + 1}</h1>
                                </div>
                                <div className="service-content">
                                    <h4>{service.title}</h4>
                                    <p>{service.desc}</p>
                                    <Link to={`/service/${service.slug}`}>Read More<i className="bi bi-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceArea;
