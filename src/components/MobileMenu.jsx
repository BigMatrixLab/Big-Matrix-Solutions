import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleSubMenu = (index) => {
        if (activeSubMenu === index) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(index);
        }
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        setActiveSubMenu(null);
    };

    return (
        <div className="mobile-menu-area sticky d-block d-lg-none">
            <div className="mobile-menu">
                <nav className="header-menu">
                    <div className="mean-bar">
                        <div className="mean-logo">
                            <Link to="/"><img src="/assets/images/home-1/logo.png" alt="logo" style={{ maxHeight: '40px' }} /></Link>
                        </div>
                        <Link to="#" className="meanmenu-reveal" style={{ right: 0, left: 'auto', textAlign: 'center', textIndent: 0, fontSize: '18px' }} onClick={(e) => { e.preventDefault(); toggleMenu(); }}>
                            <span></span><span></span><span></span>
                        </Link>
                        <nav className="mean-nav" style={{ display: isOpen ? 'block' : 'none' }}>
                            <ul className="nav_scroll">
                                <li>
                                    <Link to="/" onClick={handleLinkClick}>Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" onClick={handleLinkClick}>About</Link>
                                </li>
                                <li>
                                    <Link to="/service" onClick={handleLinkClick}>Service</Link>
                                </li>
                                <li>
                                    <Link to="/team" onClick={handleLinkClick}>Team</Link>
                                </li>
                                <li>
                                    <Link to="/project" onClick={handleLinkClick}>Projects</Link>
                                </li>
                                <li>
                                    <Link to="/careers" onClick={handleLinkClick}>Careers</Link>
                                </li>
                                <li>
                                    <Link to="/blog" onClick={handleLinkClick}>Blog</Link>
                                </li>
                                <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
