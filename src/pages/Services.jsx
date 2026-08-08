import React from 'react';
import { servicesData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import ServiceCard from '../components/ServiceCard';
import CtaBand from '../components/CtaBand';

const Services = () => {
    // Reorder only the first 6 services to 5,6,4,3,2,1; keep the rest as-is.
    const firstSix = servicesData.slice(0, 6);
    const reorderedFirstSix = [4, 5, 3, 2, 1, 0]
        .map((i) => firstSix[i])
        .filter(Boolean);
    const orderedServices = [...reorderedFirstSix, ...servicesData.slice(6)];

    return (
        <>
            <Breadcrumb
                pageTitle="Solutions built for regulated, high-load environments"
                breadcrumbItem="Solutions"
                description="From AI diagnostics to industrial automation — each practice area ships with security, observability and compliance already handled."
            />

            {/* Service Grid Area */}
            <div className="blog-grid-area services-page-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-title left inner-style">
                                <h2>What we provide</h2>
                                <h1>Interactive IT and platform engineering services</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bm-grid">
                        {orderedServices.map((service, index) => (
                            <ServiceCard service={service} index={index} key={service.id} />
                        ))}
                    </div>
                </div>
            </div>

            <CtaBand
                eyebrow="Get started"
                title="Not sure which solution fits?"
                description="Send us the problem, not the spec. We will map it to the right architecture and tell you what it takes to build."
                secondary={{ label: 'See our work', to: '/project' }}
            />
        </>
    );
};

export default Services;
