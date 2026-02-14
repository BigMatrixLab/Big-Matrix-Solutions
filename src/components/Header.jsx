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
       
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

 
    const getHeaderClasses = () => {
        // Use same behavior for all pages - transparent at top, solid on scroll
        let classes = 'header-area style-two d-none d-lg-block';
        
        if (!isScrolled) {
            classes += ' transparent-header';
        } else {
            classes += ' sticky';
        }
        return classes;
    };

    return (
        <div className={getHeaderClasses()} id="sticky-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <div className="header-logo">
                            <Link to="/">
                                <img src="/assets/images/big_matrix_cube_logo.png" alt="logo" style={{ maxHeight: '80px' }} />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="header-menu">
                            <ul>
                                <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                                <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                                <li><Link to="/service" className={location.pathname.startsWith('/service') ? 'active' : ''}>Service</Link></li>
                                <li><Link to="/team" className={location.pathname.startsWith('/team') ? 'active' : ''}>Team</Link></li>
                                <li><Link to="/project" className={location.pathname.startsWith('/project') ? 'active' : ''}>Projects</Link></li>
                                <li><Link to="/careers" className={location.pathname === '/careers' ? 'active' : ''}>Careers</Link></li>
                                <li><Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link></li>
                                <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
