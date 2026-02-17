import React from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../data/services.json';

const ServiceArea = () => {
    return (
        <div className="service-area style-two" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Our Solutions</h2>
                            <h1>Cutting-Edge Technology for</h1>
                            <h1>Intelligent Infrastructure</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {servicesData.slice(0, 6).map((service, index) => (
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
