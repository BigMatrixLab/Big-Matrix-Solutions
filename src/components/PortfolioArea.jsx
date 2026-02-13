import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';

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
        <div className="portfolio-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Our Projects</h2>
                            <h1>Innovative Solutions in Action</h1>
                            <h1>Transforming Healthcare & Technology</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
               
                <div className="row image_load">
                    {filteredItems.map((item, index) => (
                        <div key={item.id} className={`col-lg-4 col-md-6 grid-item d-flex ${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                            <div className="single-portfolio-box w-100 mb-5">
                                <div className="portfolio-thumb">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="portfolio-content">
                                    <div className="portfolio-number">
                                        <h1>{String(index + 1).padStart(2, '0')}</h1>
                                    </div>
                                    <div className="portfolio-title">
                                        <Link to={`/project/${item.slug}`}>{item.title} <i className="bi bi-plus"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioArea;
