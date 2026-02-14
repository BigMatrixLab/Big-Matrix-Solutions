import React from 'react';
import servicesData from '../data/services.json';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Services = () => {
    return (
        <>
            <Breadcrumb pageTitle="Our Service" breadcrumbItem="Service" />

            {/* Service Area Inner Style */}
            <div className="service-area inner-style" style={{paddingTop: "50px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                 <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>What We Provides?</h2>
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

            
        </>
    );
};

export default Services;
