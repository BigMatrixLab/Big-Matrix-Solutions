import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The single section header used across the site: mono eyebrow, tight display
 * title, optional lead paragraph and an optional right-aligned action.
 */
const SectionHead = ({ eyebrow, title, lead, action }) => (
    <div className="bm-head">
        <div>
            {eyebrow && <p className="bm-head__eyebrow">{eyebrow}</p>}
            <h2 className="bm-head__title">{title}</h2>
            {lead && <p className="bm-head__lead">{lead}</p>}
        </div>
        {action && (
            <div className="bm-head__action">
                <Link to={action.to} className="bm-button bm-button--ghost">
                    {action.label}
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
            </div>
        )}
    </div>
);

export default SectionHead;
