import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Globe } from 'lucide-react';

const FooterArea = () => {
    return (
        <div className="footer-area style-one">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-logo">
                            <Link to="/" className="d-flex align-items-center">
                                <img src="/assets/images/big_matrix_cube.png" alt="logo" style={{ maxHeight: '120px' }} />
                                <span className="logo-text ms-3" style={{ fontWeight: 'bold', fontSize: '28px', lineHeight: '1.2', color: '#fff' }}>
                                    <span style={{ color: '#ED352D' }}> Big-Matrix</span><br />Solutions
                                </span>
                            </Link>
                        </div>
                        <div className="footer-widget-desc" style={{ textAlign: "justify" }}>
                            <p>We build advanced software ecosystems—from medical diagnostics and hospital systems to industrial automation and predictive analytics—powering the next generation of digital transformation.</p>
                        </div>

                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className="footer-widget-content">
                            <div className="footer-widget-title">
                                <h4>Company</h4>
                            </div>
                            <div className="footer-widget-menu">
                                <ul>
                                    <li><Link to="/about"><i className="bi bi-arrow-right-circle"></i>About</Link></li>
                                    <li><Link to="/team"><i className="bi bi-arrow-right-circle"></i>Team</Link></li>
                                    <li><Link to="/project"><i className="bi bi-arrow-right-circle"></i>Projects</Link></li>
                                    <li><Link to="/blog"><i className="bi bi-arrow-right-circle"></i>Blog</Link></li>
                                    <li><Link to="/careers"><i className="bi bi-arrow-right-circle"></i>Careers</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-widget-content">
                            <div className="footer-widget-title">
                                <h4>Our Services</h4>
                            </div>
                            <div className="footer-widget-menu">
                                <ul style={{ columnCount: 2, columnGap: '20px' }}>
                                    <li><Link to="/service/intelligent-healthcare-pharma"><i className="bi bi-arrow-right-circle"></i>Healthcare & Pharma</Link></li>
                                    <li><Link to="/service/digital-hospital-infrastructure"><i className="bi bi-arrow-right-circle"></i>Digital Hospital</Link></li>
                                    <li><Link to="/service/pharmaceutical-intelligence"><i className="bi bi-arrow-right-circle"></i>Pharma Intelligence</Link></li>
                                    <li><Link to="/service/big-data-analytics"><i className="bi bi-arrow-right-circle"></i>Big Data Analytics</Link></li>
                                    <li><Link to="/service/ai-machine-learning"><i className="bi bi-arrow-right-circle"></i>AI & ML Engineering</Link></li>
                                    <li><Link to="/service/enterprise-saas-platform"><i className="bi bi-arrow-right-circle"></i>Enterprise & SaaS</Link></li>
                                    <li><Link to="/service/industrial-automation"><i className="bi bi-arrow-right-circle"></i>Industrial Automation</Link></li>
                                    <li><Link to="/service/cloud-devops-architecture"><i className="bi bi-arrow-right-circle"></i>Cloud & DevOps</Link></li>
                                    <li><Link to="/service/cybersecurity-compliance"><i className="bi bi-arrow-right-circle"></i>Cybersecurity</Link></li>
                                    <li><Link to="/service/national-health-public-policy"><i className="bi bi-arrow-right-circle"></i>Digital Health Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12">
                        <div className="footer-widget-content">
                            <div className="footer-widget-title">
                                <h4>Contact Us</h4>
                            </div>
                            <div className="footer-contact-info">
                                <p><i className="bi bi-envelope"></i> ratimshariar@gmail.com</p>
                                <p><i className="bi bi-telephone"></i>+8801339870730</p>
                                <p style={{ display: 'flex', alignItems: 'center' }}><i className="bi bi-geo-alt"></i> <span style={{ display: 'inline-block' }}>Bashundhara, Dhaka-1229,<br />Bangladesh</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="footer-bottom-area">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">

                                <div className="footer-bottom-content">
                                    <p>© {new Date().getFullYear()} Big-Matrix Lab. All rights reserved.</p>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="footer-botton-social-icon">
                                    <ul>
                                        <li><a href="https://www.facebook.com/profile.php?id=61566031568599" target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a></li>
                                        <li><a href="https://github.com/BigMatrixLab" target="_blank" rel="noopener noreferrer"><Github size={18} /></a></li>
                                        <li><a href="https://big-matrix.com" target="_blank" rel="noopener noreferrer"><Globe size={18} /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterArea;
