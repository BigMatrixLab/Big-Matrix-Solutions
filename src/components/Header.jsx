import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('sticky-header');
            const scrolled = window.scrollY > 100;

            if (header) {
                if (scrolled) {
                    header.classList.add('sticky');
                    setIsScrolled(true);
                } else {
                    header.classList.remove('sticky');
                    setIsScrolled(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine header classes based on page and scroll state
    const getHeaderClasses = () => {
        let classes = 'header-area style-two d-none d-lg-block';
        if (isHomePage && !isScrolled) {
            classes += ' transparent-header';
        }
        return classes;
    };

    return (
        <div className={getHeaderClasses()} id="sticky-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <div className="header-logo">
                            <Link to="/" className="d-flex align-items-center">
                                <img src="/assets/images/big_matrix_cube_logo.png" alt="logo" style={{ maxHeight: '100px' }} />

                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="header-menu">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/service">Service</Link></li>
                                <li><Link to="/team">Team</Link></li>
                                <li><Link to="/project">Projects</Link></li>
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
