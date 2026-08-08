import React from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';

const STACK = [
    { label: 'Imaging', value: 'DICOM · PACS · segmentation' },
    { label: 'Records', value: 'HL7 v2 · FHIR R4 · EMR bridges' },
    { label: 'Inference', value: 'GPU serving · batch + realtime' },
    { label: 'Audit', value: 'immutable trail · role scoping' },
];

const CELLS = [
    {
        icon: 'bi-cpu',
        title: 'Innovation Lab',
        text: 'A dedicated research division building custom deep learning models and LLM frameworks on proprietary architectures.',
    },
    {
        icon: 'bi-shield-check',
        title: 'Global Compliance',
        text: 'Security-first engineering that meets international standards for data privacy and clinical safety.',
    },
    {
        icon: 'bi-arrow-left-right',
        title: 'Interoperability',
        text: 'Systems that speak the protocols hospitals already run, so nothing has to be replaced to be connected.',
    },
];

const FeatureArea = () => {
    return (
        <section className="bm-section bm-section--ink bm-grid-wash bm-grid-wash--squares">
            <div className="bm-container">
                <SectionHead
                    eyebrow="What we build"
                    title="Infrastructure that holds up under real clinical load"
                    lead="One integrated stack instead of six disconnected tools — imaging, records, inference and audit on the same backbone."
                />

                <div className="bm-bento">
                    <article className="bm-bento__cell bm-bento__cell--wide">
                        <span className="bm-bento__icon">
                            <i className="bi bi-diagram-3" aria-hidden="true"></i>
                        </span>
                        <h3 className="bm-bento__title">Enterprise Infrastructure</h3>
                        <p className="bm-bento__text">
                            Integrated platforms that bridge AI diagnostics, EMR systems and hospital
                            management into a single digital backbone.
                        </p>
                        <div className="bm-manifest">
                            <dl>
                                {STACK.map((row) => (
                                    <React.Fragment key={row.label}>
                                        <dt>{row.label}</dt>
                                        <dd>{row.value}</dd>
                                    </React.Fragment>
                                ))}
                            </dl>
                        </div>
                        <div className="bm-bento__foot">
                            <Link to="/service" className="bm-link">
                                View solutions
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </article>

                    {CELLS.map((cell) => (
                        <article className="bm-bento__cell" key={cell.title}>
                            <span className="bm-bento__icon">
                                <i className={`bi ${cell.icon}`} aria-hidden="true"></i>
                            </span>
                            <h3 className="bm-bento__title">{cell.title}</h3>
                            <p className="bm-bento__text">{cell.text}</p>
                        </article>
                    ))}

                    <article className="bm-bento__cell bm-bento__cell--accent">
                        <div>
                            <span className="bm-bento__icon">
                                <i className="bi bi-lightning-charge" aria-hidden="true"></i>
                            </span>
                            <h3 className="bm-bento__title">Start with a pilot</h3>
                            <p className="bm-bento__text">
                                Scope one workflow, prove it on your data, then scale.
                            </p>
                        </div>
                        <div className="bm-bento__foot">
                            <Link to="/contact" className="bm-link">
                                Talk to an engineer
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default FeatureArea;
