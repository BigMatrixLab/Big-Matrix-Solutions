import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../data/navigation';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const [isStuck, setIsStuck] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsStuck(window.scrollY > 8);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`bm-nav d-none d-lg-block${isStuck ? ' bm-nav--stuck' : ''}`}>
            <div className="bm-container">
                <div className="bm-nav__inner">
                    <Link to="/" className="bm-nav__logo" aria-label="Big-Matrix Solutions — home">
                        <img src="/assets/images/big_matrix_cube.png" alt="Big-Matrix Solutions" />
                    </Link>

                    <nav aria-label="Primary">
                        <ul className="bm-nav__links">
                            {NAV_ITEMS.map((item) => {
                                const isActive = item.match(location.pathname);
                                return (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className={`bm-nav__link${isActive ? ' is-active' : ''}`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="bm-nav__actions">
                        <ThemeToggle />
                        <Link to="/contact" className="bm-nav__cta">
                            Talk to us
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
