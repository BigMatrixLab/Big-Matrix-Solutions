import React from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '../data/partners';

const FACTS = [
    { value: '10+', label: 'Systems in production' },
    { value: '5', label: 'Clinical partners' },
    { value: '24/7', label: 'Support coverage' },
];

const Hero = () => {
    return (
        <section className="bm-hero">
            <span className="bm-hero__aura" aria-hidden="true"></span>

            <div className="bm-hero__main">
                <div className="bm-container">
                    <div className="bm-hero__inner">
                        <span className="bm-hero__badge">Big-Matrix Solutions</span>

                        <h1 className="bm-hero__title">
                            Designing the future of <em>intelligent</em> infrastructure
                        </h1>

                        <p className="bm-hero__lead">
                            We build advanced software ecosystems — from medical diagnostics and hospital
                            systems to industrial automation and predictive analytics.
                        </p>

                        <div className="bm-hero__actions">
                            <Link to="/contact" className="bm-button bm-button--accent">
                                Start collaboration
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>
                            <Link to="/service" className="bm-button bm-button--ghost">
                                Explore solutions
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>

                        <ul className="bm-hero__facts">
                            {FACTS.map((fact) => (
                                <li key={fact.label}>
                                    <b>{fact.value}</b>
                                    <span>{fact.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bm-hero__trust">
                <div className="bm-container">
                    <div className="bm-hero__trust-inner">
                        <p className="bm-hero__trust-label">Trusted by</p>
                        <div className="bm-logos__track bm-logos--bare">
                            <div className="bm-logos__rail">
                                {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                                    <div className="bm-logos__item" key={`${partner.id}-${index}`}>
                                        <img src={partner.logo} alt={partner.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
