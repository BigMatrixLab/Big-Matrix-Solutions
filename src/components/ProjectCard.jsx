import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ item }) => (
    <div className="single-project-box w-100">
        <div className="project-thumb">
            <img src={item.image} alt={item.title} />
        </div>
        <div className="project-content">
            <h4>{item.category}</h4>
            <Link to={`/project/${item.slug}`}>{item.title}</Link>
            <Link className="project-button" to={`/project/${item.slug}`}>View Details<i className="bi bi-arrow-right-short"></i></Link>
            <div className="project-shape">
                <img src="/assets/images/inner-images/project-shape.png" alt="" />
            </div>
        </div>
    </div>
);

export default ProjectCard;