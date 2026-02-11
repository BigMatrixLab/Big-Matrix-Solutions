import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PortfolioArea = () => {
    const [filter, setFilter] = useState('*');
    const [items, setItems] = useState([
        { id: 1, category: 'technology', image: '/assets/images/home-2/portfolio-1.png', title: 'Business Growth with Big-Martrix Solutions Agency', number: '01', slug: 'analytics-dashboard' },
        { id: 2, category: 'designing', image: '/assets/images/home-2/portfolio-2.png', title: 'Desktop Application Development', number: '02', slug: 'digital-marketing' },
        { id: 3, category: 'bussiness', image: '/assets/images/home-2/portfolio-3.png', title: 'Illustration and Vector Design for Add', number: '03', slug: 'cloud-migration' },
    ]);
    const [filteredItems, setFilteredItems] = useState(items);

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
                            <h4>IT Support For Business</h4>
                            <h1>Ensuring Your Success Trusted</h1>
                            <h1>IT Services Source</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portfolio_nav">
                            <div className="portfolio_menu">
                                <ul className="menu-filtering">
                                    <li className={filter === '*' ? "current_menu_item" : ""} onClick={() => setFilter('*')}> All items </li>
                                    <li className={filter === 'technology' ? "current_menu_item" : ""} onClick={() => setFilter('technology')}>Technology </li>
                                    <li className={filter === 'designing' ? "current_menu_item" : ""} onClick={() => setFilter('designing')}>Designing </li>
                                    <li className={filter === 'bussiness' ? "current_menu_item" : ""} onClick={() => setFilter('bussiness')}> Bussiness </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row image_load">
                    {filteredItems.map(item => (
                        <div key={item.id} className={`col-lg-4 col-md-6 grid-item ${item.category}`}>
                            <div className="single-portfolio-box">
                                <div className="portfolio-thumb">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="portfolio-content">
                                    <div className="portfolio-number">
                                        <h1>{item.number}</h1>
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
