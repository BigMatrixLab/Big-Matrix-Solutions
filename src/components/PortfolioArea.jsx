import React from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';
import { projectData } from '../data/content';

// Curated selection: the first id is the lead item, the rest sit below it.
const FEATURED_IDS = ['3', '4', '2'];

const ShowItem = ({ item, lead = false }) => (
    <article className={`bm-show${lead ? ' bm-show--lead' : ''}`}>
        <div className="bm-show__mat">
            <div className="bm-show__shot">
                <img src={item.image} alt={item.title} loading="lazy" />
            </div>
        </div>
        <div className="bm-show__body">
            <span className="bm-show__tag">{item.category}</span>
            <h3 className="bm-show__title">{item.title}</h3>
            {lead && item.desc && <p className="bm-show__text">{item.desc}</p>}
            <div className="bm-show__foot">
                <span className="bm-link">
                    View case study
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </span>
            </div>
        </div>
        <Link to={`/project/${item.slug}`} className="bm-show__link">
            <span>{item.title}</span>
        </Link>
    </article>
);

const PortfolioArea = () => {
    const featured = FEATURED_IDS
        .map((id) => projectData.find((project) => project.id === id))
        .filter(Boolean);

    const [lead, ...rest] = featured;
    if (!lead) return null;

    return (
        <section className="bm-section bm-section--parallax">
            <div className="bm-container">
                <SectionHead
                    eyebrow="Selected products"
                    title="Innovative solutions in production"
                    action={{ label: 'All products', to: '/project' }}
                />

                <div className="bm-showcase">
                    <ShowItem item={lead} lead />
                    {rest.length > 0 && (
                        <div className="bm-show__row">
                            {rest.map((item) => (
                                <ShowItem item={item} key={item.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PortfolioArea;
