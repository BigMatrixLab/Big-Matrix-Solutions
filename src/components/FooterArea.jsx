import React from 'react';
import { Link } from 'react-router-dom';
import LEGAL from '../data/legal.json';

const { company } = LEGAL;

const COMPANY_LINKS = [
    { to: '/about', label: 'About Us' },
    { to: '/project', label: 'Products' },
    // Team is parked — /team now returns the 404 page. Restore when it is back.
    // { to: '/team', label: 'Team' },
    { to: '/blog', label: 'Insights' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },
];

// Company documents (pages/LegalPage.jsx, content in data/legal.json).
const LEGAL_LINKS = [
    { to: '/terms-and-conditions', label: 'Terms and Conditions' },
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/refund-policy', label: 'Refund Policy' },
    { to: '/delivery-policy', label: 'Delivery Policy' },
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
    { href: 'https://www.facebook.com/BigMatrix.Solutions', label: 'Facebook', icon: 'bi-facebook' },
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

                    <nav aria-label="Policy">
                        <h2 className="bm-footer__title">Policy</h2>
                        <ul className="bm-footer__list">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="bm-footer__title">Contact</h2>
                        <ul className="bm-footer__contact">
                            <li>
                                <i className="bi bi-envelope" aria-hidden="true"></i>
                                <a href="mailto:contact@big-matrix.com">contact@big-matrix.com</a>
                            </li>
                            <li>
                                <i className="bi bi-telephone" aria-hidden="true"></i>
                                <a href="tel:+8801339870730">+880 1339 870730</a>
                            </li>
                            <li>
                                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                                <span>
                                    Section# 11, Block# A, Mainroad# 3,<br />
                                    Plot# 10, Pallabi, Mirpur,<br />
                                    Dhaka - 1216, Bangladesh
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bm-footer__bottom">
                    <p className="bm-footer__copy">
                        © {new Date().getFullYear()} {company.legalName} All rights reserved.
                        <br />
                        <span className="bm-footer__id">RJSC Reg. No. {company.rjscRegNo}</span>
                        {' · '}
                        <span className="bm-footer__id">Trade Licence No. {company.tradeLicenseNo}</span>
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
