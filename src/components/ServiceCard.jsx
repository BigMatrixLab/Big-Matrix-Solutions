import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    return (
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
    );
};

export default ServiceCard;
