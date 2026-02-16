import React, { useState, useEffect } from 'react';

import projectsData from '../data/projects.json';
import ProjectCard from './ProjectCard';

const PortfolioArea = () => {
    const [filter, setFilter] = useState('*');
    const [items] = useState(projectsData);
    const [filteredItems, setFilteredItems] = useState(projectsData);

    // Get unique categories from projects
    const categories = [...new Set(projectsData.map(item => item.category))];

    useEffect(() => {
        if (filter === '*') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === filter));
        }
    }, [filter, items]);

    return (
        <div className="project-area inner-style" style={{ paddingTop: "80px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center inner-style">
                            <h2 style={{ color: "#0C5ADB", paddingBottom: "10px" }}>Our Projects</h2>
                            <h1>Innovative Solutions in Action</h1>
                            <h1>Transforming Healthcare & Technology</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {filteredItems.map((item, index) => (
                        <div className="col-lg-4 col-md-6 d-flex" key={index}>
                            <ProjectCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioArea;
