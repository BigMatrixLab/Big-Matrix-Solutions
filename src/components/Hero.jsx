import { Link } from 'react-router-dom';
import { PARTNERS } from '../data/partners';
import DotField from './DotField';

const FACTS = [
    { value: '10+', label: 'Systems in production' },
    { value: '5', label: 'Clinical partners' },
    { value: '24/7', label: 'Support coverage' },
];

const Hero = () => {
    return (
        <section className="bm-hero">
            {/* Interactive dot matrix, replacing the static CSS grid. Masked in
                CSS so it fades toward the edges, and pointer-transparent — the
                field tracks the cursor from the window. */}
            <div className="bm-hero__dots" aria-hidden="true">
                <DotField
                    dotRadius={1.5}
                    dotSpacing={14}
                    bulgeStrength={67}
                    glowRadius={160}
                    sparkle={false}
                    waveAmplitude={0}
                    cursorRadius={500}
                    cursorForce={0.1}
                    bulgeOnly
                    gradientFrom="#7e7e7e"
                    gradientTo="#686868"
                    glowColor="transparent"
                />
            </div>

            {/* Dot matrix and trust rail only — no aura or gradient wash. */}

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
