import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ item }) => (
    <article className="bm-card">
        <div className="bm-card__media">
            <img src={item.image} alt={item.title} loading="lazy" />
        </div>
        <div className="bm-card__body">
            <div className="bm-card__meta">
                <span>{item.category}</span>
            </div>
            <h3 className="bm-card__title">
                <Link to={`/project/${item.slug}`}>{item.title}</Link>
            </h3>
            <div className="bm-card__foot">
                <Link to={`/project/${item.slug}`} className="bm-link">
                    View details
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
            </div>
        </div>
    </article>
);

export default ProjectCard;
