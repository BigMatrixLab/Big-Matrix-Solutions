import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DotField from './DotField';
import { useTheme } from '../context/themeStore';
import '../assets/css/bm-error.css';

/**
 * Shared shell for the 403 / 404 / 500 pages.
 *
 * The background is the same interactive dot field the hero uses, with the same
 * settings, so an error page still feels like part of the site. The status code
 * carries the brand accent; everything else uses the normal text ramp.
 */

const DEFAULT_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/service', label: 'Solutions' },
    { to: '/project', label: 'Products' },
    { to: '/blog', label: 'Insights' },
    { to: '/contact', label: 'Contact' },
];

const ErrorPage = ({
    code,
    title,
    lead,
    metaTitle,
    primaryAction = { to: '/', label: 'Back to home' },
    secondaryAction,
    note,
    links = DEFAULT_LINKS,
}) => {
    const { isDark } = useTheme();

    /* The field paints to a canvas and cannot read CSS tokens, so the dot
       colours are passed per theme — same values as the hero. */
    const dotFrom = isDark ? '#4a4d52' : '#7e7e7e';
    const dotTo = isDark ? '#3c3f44' : '#686868';

    return (
        <>
            <Helmet>
                <title>{metaTitle || `${code} — ${title} | Big-Matrix Solutions`}</title>
                <meta name="description" content={lead} />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <section className="bm-error">
                <div className="bm-error__dots" aria-hidden="true">
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
                        gradientFrom={dotFrom}
                        gradientTo={dotTo}
                        glowColor="transparent"
                    />
                </div>

                <div className="bm-container">
                    <div className="bm-error__inner">
                        <strong className="bm-error__code">{code}</strong>

                        <hr className="bm-error__rule" />

                        <h1 className="bm-error__title">{title}</h1>
                        <p className="bm-error__lead">{lead}</p>

                        <div className="bm-error__actions">
                            <Link to={primaryAction.to} className="bm-button bm-button--accent">
                                {primaryAction.label}
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </Link>

                            {secondaryAction?.onClick ? (
                                <button
                                    type="button"
                                    className="bm-button bm-button--ghost"
                                    onClick={secondaryAction.onClick}
                                >
                                    <i className={`bi ${secondaryAction.icon || 'bi-arrow-left'}`} aria-hidden="true"></i>
                                    {secondaryAction.label}
                                </button>
                            ) : (
                                secondaryAction?.to && (
                                    <Link to={secondaryAction.to} className="bm-button bm-button--ghost">
                                        {secondaryAction.label}
                                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                    </Link>
                                )
                            )}
                        </div>

                        {note && <p className="bm-error__note">{note}</p>}

                        {links.length > 0 && (
                            <div className="bm-error__links">
                                <p className="bm-error__links-label">Try one of these</p>
                                <ul className="bm-error__links-row">
                                    {links.map((link) => (
                                        <li key={link.to}>
                                            <Link to={link.to}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ErrorPage;
