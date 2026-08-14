import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../data/navigation';
import ThemeToggle from './ThemeToggle';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsStuck(window.scrollY > 8);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock the page behind the drawer and close it on Escape.
    useEffect(() => {
        if (!isOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            <header className={`bm-nav d-lg-none${isStuck ? ' bm-nav--stuck' : ''}`}>
                <div className="bm-container">
                    <div className="bm-nav__inner">
                        <Link to="/" className="bm-nav__logo" aria-label="Big-Matrix Solutions — home">
                            <img src="/assets/images/bm_new_logo.png" alt="Big-Matrix Solutions" />
                        </Link>
                        {/* Toggle sits outside the drawer so the theme can be
                            changed without opening the menu. */}
                        <div className="bm-nav__actions">
                            <ThemeToggle size="lg" />
                            <button
                                type="button"
                                className="bm-nav__toggle"
                                onClick={() => setIsOpen(true)}
                                aria-expanded={isOpen}
                                aria-label="Open menu"
                            >
                                <i className="bi bi-list" style={{ fontSize: 24 }} aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {isOpen && (
                <button
                    type="button"
                    className="bm-drawer-scrim"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav
                className={`bm-drawer d-lg-none${isOpen ? ' is-open' : ''}`}
                aria-label="Mobile"
                aria-hidden={!isOpen}
            >
                <div className="bm-drawer__head">
                    <span className="bm-footer__title" style={{ margin: 0 }}>Menu</span>
                    <button
                        type="button"
                        className="bm-nav__toggle"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <i className="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <ul className="bm-drawer__links">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <Link to={item.to} onClick={() => setIsOpen(false)}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="bm-drawer__foot">
                    <Link to="/contact" className="bm-button" onClick={() => setIsOpen(false)}>
                        Talk to us
                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default MobileMenu;
