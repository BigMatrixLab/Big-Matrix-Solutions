import React from 'react';
import { Target, Eye, Sparkles, Check } from 'lucide-react';

const ICONS = {
    target: Target,
    eye: Eye,
    stars: Sparkles,
};

/**
 * Mission / vision / values block. A hairline-bordered panel with a
 * grid-washed aside and a stacked list of commitments.
 */
const ValueSection = ({
    icon,
    title,
    description,
    headline = 'Empowering your future.',
    items = [],
    reversed = false,
}) => {
    const IconComponent = ICONS[icon] || Target;

    return (
        <article className={`bm-value${reversed ? ' bm-value--reversed' : ''}`}>
            <div className="bm-value__aside">
                <span className="bm-value__icon">
                    <IconComponent size={28} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                    <span className="bm-value__label">{title}</span>
                    <h3>{headline}</h3>
                </div>
            </div>
            <div className="bm-value__body">
                {description && <p>{description}</p>}
                {items.length > 0 && (
                    <ul className="bm-value__list">
                        {items.map((item) => {
                            const [lead, ...rest] = item.split(/:\s(.+)/s);
                            const detail = rest.filter(Boolean).join('');
                            return (
                                <li key={item}>
                                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                                    <span>
                                        {detail ? <strong>{lead}: </strong> : null}
                                        {detail || lead}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </article>
    );
};

export default ValueSection;
