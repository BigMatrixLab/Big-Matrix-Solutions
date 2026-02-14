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
                <div className="blog-button">
                    <Link to={`/service/${service.slug}`}>
                        Learn More
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
            <div className="blog-category">
                <Link to={`/service/${service.slug}`}>
                    <i className={service.icon}></i>
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
