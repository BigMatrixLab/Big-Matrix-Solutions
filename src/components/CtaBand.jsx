import React from 'react';
import { Link } from 'react-router-dom';

const GLYPHS = ['bi-activity', 'bi-cpu', 'bi-shield-check', 'bi-diagram-3', 'bi-graph-up', 'bi-hdd-stack'];

const DEFAULT_PROOF = [
    { icon: 'bi-hospital', text: 'Deployed inside working hospitals' },
    { icon: 'bi-shield-lock', text: 'Security and audit built in from day one' },
    { icon: 'bi-arrow-left-right', text: 'HL7, FHIR and DICOM out of the box' },
    { icon: 'bi-people', text: 'Direct access to the engineers who build it' },
];

/**
 * Closing panel: an inset orange slab with a horizon glow, followed by a
 * hairline proof strip. Used to end long pages.
 */
const CtaBand = ({
    eyebrow = 'Next step',
    title = 'Build without boundaries',
    description = 'Tell us what you are building. We come back with an architecture, a delivery plan and a realistic timeline.',
    primary = { label: 'Start a conversation', to: '/contact' },
    secondary = { label: 'Browse solutions', to: '/service' },
    proof = DEFAULT_PROOF,
}) => {
    return (
        <section className="bm-section bm-section--ink bm-close">
            <div className="bm-container">
                <div className="bm-close__panel">
                    <div className="bm-close__glyphs" aria-hidden="true">
                        {GLYPHS.map((glyph) => (
                            <span className="bm-close__glyph" key={glyph}>
                                <i className={`bi ${glyph}`}></i>
                            </span>
                        ))}
                    </div>

                    <p className="bm-close__eyebrow">{eyebrow}</p>
                    <h2 className="bm-close__title">{title}</h2>
                    <p className="bm-close__text">{description}</p>
                    <div className="bm-close__actions">
                        {primary && (
                            <Link to={primary.to} className="bm-button">
                                {primary.label}
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>
                        )}
                        {secondary && (
                            <Link to={secondary.to} className="bm-button bm-button--ghost">
                                {secondary.label}
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>
                        )}
                    </div>
                </div>

                {proof?.length > 0 && (
                    <ul className="bm-close__strip">
                        {proof.map((item) => (
                            <li key={item.text}>
                                <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default CtaBand;
