import React from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';
import { servicesData } from '../data/content';

// Explicit display order for the homepage solutions index (cap at five).
const HOME_SERVICE_ORDER = [
    'medical-imaging-ai-radiology',
    'ai-machine-learning',
    'enterprise-saas-platform',
    'big-data-analytics',
    'cloud-devops-architecture',
];

const ServiceArea = () => {
    const services = HOME_SERVICE_ORDER
        .map((slug) => servicesData.find((service) => service.slug === slug))
        .filter(Boolean);

    return (
        <section className="bm-section bm-section--opaque">
            <div className="bm-container">
                <SectionHead
                    eyebrow="Our solutions"
                    title="Cutting-edge technology for intelligent infrastructure"
                    lead="Five practice areas, one engineering standard. Each ships with the security, observability and compliance work already done."
                    action={{ label: 'All solutions', to: '/service' }}
                />

                <div className="bm-rows">
                    {services.map((service, index) => (
                        <div className="bm-row" key={service.id}>
                            <span className="bm-row__index">{String(index + 1).padStart(2, '0')}</span>
                            <span className="bm-row__icon">
                                <i className={service.icon || 'bi bi-braces'} aria-hidden="true"></i>
                            </span>
                            <div className="bm-row__body">
                                <h3 className="bm-row__title">{service.title}</h3>
                                <p className="bm-row__text">{service.desc}</p>
                            </div>
                            <span className="bm-row__go" aria-hidden="true">
                                <i className="bi bi-arrow-right"></i>
                            </span>
                            <Link to={`/service/${service.slug}`} className="bm-row__link">
                                <span>{service.title}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceArea;
