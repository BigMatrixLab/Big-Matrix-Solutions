import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('sticky-header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="header-area style-two" id="sticky-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <div className="header-logo">
                            <Link to="/"><img src="/assets/images/home-1/logo.png" alt="logo" /></Link>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="header-menu">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/service">Service</Link></li>
                                <li className="menu-item-has-children"><Link to="#">Pages<i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/mission">Mission Vision</Link></li>
                                        <li><Link to="/team">Our Team</Link></li>
                                        <li><Link to="/team-details">Team Details</Link></li>
                                        <li><Link to="/project">Our Project</Link></li>
                                        <li><Link to="/project-details">Project Details</Link></li>
                                        <li><Link to="/careers">Careers</Link></li>
                                        <li><Link to="/faqs">Faqs</Link></li>
                                    </ul>
                                </li>
                                <li className="menu-item-has-children"><Link to="/blog">Blog<i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/blog">Blog Grid</Link></li>
                                        <li><Link to="/blog-details">Blog Details</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                            <div className="header-search-icon search-box-outer">
                                <Link to="#"><i className="fa-solid fa-magnifying-glass"></i></Link>
                            </div>
                            <div className="header-button">
                                <Link to="/contact">Get A Quote</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
