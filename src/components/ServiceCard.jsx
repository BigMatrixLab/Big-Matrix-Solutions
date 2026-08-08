import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Solution card. `index` renders the mono counter in the top-right corner.
 */
const ServiceCard = ({ service, index }) => {
    return (
        <article className="bm-card">
            <div className="bm-card__body">
                {typeof index === 'number' && (
                    <span className="bm-card__index">{String(index + 1).padStart(2, '0')}</span>
                )}
                <span className="bm-card__icon">
                    <i className={service.icon || 'bi bi-braces'} aria-hidden="true"></i>
                </span>
                <h3 className="bm-card__title">
                    <Link to={`/service/${service.slug}`}>{service.title}</Link>
                </h3>
                <p className="bm-card__text">{service.desc}</p>
                <div className="bm-card__foot">
                    <Link to={`/service/${service.slug}`} className="bm-link">
                        Read more
                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ServiceCard;
