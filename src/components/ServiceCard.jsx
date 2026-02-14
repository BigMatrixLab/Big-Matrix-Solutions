import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    return (
        <div className="single-blog-box">
            <div className="blog-thumb">
                <img src={service.image} alt={service.title} />
            </div>
            <div className="blog-content">
                <div className="blog-title">
                    <Link to={`/service/${service.slug}`}>{service.title}</Link>
                    <p>{service.desc}</p>
                </div>
                
            </div>
           
            <div className="service-btn-wrapper">
    <Link to={`/service/${service.slug}`} className="service-btn">
        Learn More
        <i className="bi bi-arrow-right"></i>
    </Link>
</div>
        </div>
    );
};

export default ServiceCard;
