import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../data/services.json';
import teamData from '../data/team.json';
import projectData from '../data/projects.json';

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
        <div className="header-area style-two d-none d-lg-block" id="sticky-header">
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
                                <li className="menu-item-has-children"><Link to="/service">Service <i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-menu">
                                        {servicesData.map((service) => (
                                            <li key={service.id}><Link to={`/service/${service.slug}`}>{service.title}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="menu-item-has-children"><Link to="/team">Team <i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/team">Our Team</Link></li>
                                        {teamData.map((member) => (
                                            <li key={member.id}><Link to={`/team/${member.slug}`}>{member.name}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="menu-item-has-children"><Link to="/project">Projects <i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/project">Our Project</Link></li>
                                        {projectData.slice(0, 5).map((project) => (
                                            <li key={project.id}><Link to={`/project-details`}>{project.title}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
