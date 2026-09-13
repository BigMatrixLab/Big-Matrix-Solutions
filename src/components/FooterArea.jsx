import React from 'react';
import { Link } from 'react-router-dom';

const COMPANY_LINKS = [
    { to: '/about', label: 'About' },
    { to: '/project', label: 'Products' },
    // Team is parked — /team now returns the 404 page. Restore when it is back.
    // { to: '/team', label: 'Team' },
    { to: '/blog', label: 'Insights' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },
];

const SERVICE_LINKS = [
    { to: '/service/ai-machine-learning', label: 'AI & ML Engineering' },
    { to: '/service/big-data-analytics', label: 'Big Data Analytics' },
    { to: '/service/enterprise-saas-platform', label: 'Enterprise & SaaS' },
    { to: '/service/industrial-automation', label: 'Industrial Automation' },
    { to: '/service/cloud-devops-architecture', label: 'Cloud & DevOps' },
];

const SOCIAL_LINKS = [
    { href: 'https://www.linkedin.com/company/big-matrix-solutions/', label: 'LinkedIn', icon: 'bi-linkedin' },
    { href: 'https://github.com/BigMatrixLab', label: 'GitHub', icon: 'bi-github' },
    { href: 'https://big-matrix.com', label: 'Big-Matrix Research & Development Lab', icon: 'bi-globe2' },
];

const FooterArea = () => {
    return (
        <footer className="bm-footer">
            <div className="bm-container">
                <div className="bm-footer__top">
                    <div>
                        <Link to="/" className="bm-footer__brand">
                            <img src="/assets/images/bm_new_logo.png" alt="" aria-hidden="true" />
                            {/* <span className="bm-footer__wordmark">
                                <span>Big-Matrix</span><br />Solutions
                            </span> */}
                        </Link>
                        <p className="bm-footer__blurb">
                            Advanced software ecosystems for medical diagnostics, hospital systems,
                            industrial automation and predictive analytics.
                        </p>
                    </div>

                    <nav aria-label="Company">
                        <h2 className="bm-footer__title">Company</h2>
                        <ul className="bm-footer__list">
                            {COMPANY_LINKS.map((link) => (
                                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Solutions">
                        <h2 className="bm-footer__title">Solutions</h2>
                        <ul className="bm-footer__list">
                            {SERVICE_LINKS.map((link) => (
                                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="bm-footer__title">Contact</h2>
                        <ul className="bm-footer__contact">
                            <li>
                                <i className="bi bi-envelope" aria-hidden="true"></i>
                                <a href="mailto:bigmatrixsolutions@gmail.com">bigmatrixsolutions@gmail.com</a>
                            </li>
                            <li>
                                <i className="bi bi-telephone" aria-hidden="true"></i>
                                <a href="tel:+8801339870730">+880 1339 870730</a>
                            </li>
                            <li>
                                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                                <span>Bashundhara, Dhaka-1229,<br />Bangladesh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bm-footer__bottom">
                    <p className="bm-footer__copy">
                        © {new Date().getFullYear()} Big-Matrix Research & Development Lab. All rights reserved.
                    </p>
                    <ul className="bm-footer__social">
                        {SOCIAL_LINKS.map((social) => (
                            <li key={social.href}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                >
                                    <i className={`bi ${social.icon}`} aria-hidden="true"></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default FooterArea;
