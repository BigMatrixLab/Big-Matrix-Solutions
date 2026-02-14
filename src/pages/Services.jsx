import React from 'react';
import servicesData from '../data/services.json';
import Breadcrumb from '../components/Breadcrumb';
import ServiceCard from '../components/ServiceCard';

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
                                <ServiceCard service={service} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
        </>
    );
};

export default Services;
