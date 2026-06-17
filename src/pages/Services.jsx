import React from 'react';
import { servicesData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
    // Reorder only the first 6 services to 5,6,4,3,2,1; keep the rest as-is.
    const firstSix = servicesData.slice(0, 6);
    const reorderedFirstSix = [4, 5, 3, 2, 1, 0]
        .map((i) => firstSix[i])
        .filter(Boolean);
    const orderedServices = [...reorderedFirstSix, ...servicesData.slice(6)];

    return (
        <>
            <Breadcrumb pageTitle="Our Service" breadcrumbItem="Service" />

            {/* Service Grid Area */}
            <div className="blog-grid-area services-page-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                <h2 style={{ color: "#0C5ADB", paddingBottom: "10px" }}>What We Provides?</h2>
                                <h1>Provide Interactive IT Solution</h1>
                                <h1>Business Services</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {orderedServices.map((service) => (
                            <div className="col-lg-4 col-md-6 mb-4 d-flex" key={service.id}>
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
