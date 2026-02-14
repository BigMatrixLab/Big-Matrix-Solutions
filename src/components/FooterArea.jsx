import React from 'react';
import { Link } from 'react-router-dom';

const FooterArea = () => {
    return (
        <div className="footer-area style-one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-logo">
                            <Link to="/" className="d-flex align-items-center">
                                <img src="/assets/images/big_matrix_cube.png" alt="logo" style={{ maxHeight: '120px' }} />
                                <span className="logo-text ms-3" style={{ fontWeight: 'bold', fontSize: '28px', lineHeight: '1.2', color: '#fff' }}>
                                    <span style={{ color: '#ED352D' }}> Big-Matrix</span><br />Solutions
                                </span>
                            </Link>
                        </div>
                        <div className="footer-widget-desc" style={{textAlign: "justify"}}>
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
                                    <li><Link to="/team"><i className="bi bi-arrow-right-circle"></i>Our Team</Link></li>
                                    <li><Link to="/blog"><i className="bi bi-arrow-right-circle"></i>Latest Blog</Link></li>
                                    <li><Link to="/careers"><i className="bi bi-arrow-right-circle"></i>Careers</Link></li>
                                    <li><Link to="/contact"><i className="bi bi-arrow-right-circle"></i>Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget-content">
                            <div className="footer-widget-title">
                                <h4>Our Services</h4>
                            </div>
                            <div className="footer-widget-menu">
                                <ul>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>AI in Healthcare</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Machine Learning</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Big Data Solutions</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Medical Imaging</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Research Software</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget-content">
                            <div className="footer-widget-title">
                                <h4>Contact Us</h4>
                            </div>
                            <div className="footer-contact-info">
                                <p><i className="bi bi-envelope"></i> bigmatrixlab@gmail.com</p>
                                <p><i className="bi bi-telephone"></i> +880-2-55668200 (Ext: 6212)</p>
                                <p><i className="bi bi-geo-alt"></i> SAC-1025, North South University<br />Bashundhara, Dhaka-1229, Bangladesh</p>
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
                                        <li><a href="https://www.facebook.com/profile.php?id=61566031568599" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="https://github.com/BigMatrixLab" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>
                                         <li><a href="https://big-matrix.com" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-globe"></i></a></li>
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
