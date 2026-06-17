import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../public/assets/css/MobileMenu.css'; // Assuming you have a CSS file for styling
const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    
    const isHomePage = location.pathname === '/';

    // Scroll Logic matching your Header file
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;
            setIsScrolled(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false);

    // Dynamic classes for the top bar
    const getNavbarClasses = () => {
        let classes = 'mobile-header-bar d-lg-none';
        if (isHomePage) {
            // Home page: transparent when not scrolled, white when scrolled
            if (!isScrolled) {
                classes += ' transparent-mobile';
            } else {
                classes += ' white-mobile';
            }
        } else {
            // Inner pages: blurred when not scrolled, solid white when scrolled
            if (!isScrolled) {
                classes += ' inner-mobile';
            } else {
                classes += ' white-mobile';
            }
        }
        return classes;
    };

    return (
        <div className="mobile-menu-wrapper">
            {/* Top Bar that changes on scroll */}
            <div className={getNavbarClasses()}>
                <div className="mobile-logo">
                    <Link to="/">
                        <img src="/assets/images/big_matrix_cube.png" alt="logo" style={{ maxHeight: '40px' }} />
                    </Link>
                </div>
                <button className="mobile-menu-toggle" onClick={toggleMenu}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Backdrop Overlay */}
            {isOpen && <div className="menu-overlay" onClick={handleLinkClick}></div>}

            {/* Sliding Menu Panel (Always White) */}
            <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
                <div className="side-nav-header">
                    <button className="close-btn" onClick={toggleMenu}>&times;</button>
                </div>
                <ul className="nav-links">
                    <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                    <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                    <li><Link to="/service" onClick={handleLinkClick}>Service</Link></li>
                    <li><Link to="/project" onClick={handleLinkClick}>Projects</Link></li>
                    <li><Link to="/careers" onClick={handleLinkClick}>Careers</Link></li>
                    <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
                    <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default MobileMenu;
