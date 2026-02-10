import React from 'react';
import { Link } from 'react-router-dom';

const FooterArea = () => {
    return (
        <div className="footer-area style-one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-logo">
                            <Link to="/"><img src="/assets/images/logo-2.png" alt="" /></Link>
                        </div>
                        <div className="footer-widget-desc">
                            <p>Monotonectally synergize granular top
                                visualize strategic infomediaries afters
                                task state of the art infrastructures
                                digital agency in north</p>
                        </div>
                        <div className="toptech-button inner-style">
                            <Link to="/about">Discover More<i className="bi bi-arrow-right-short"></i></Link>
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
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>IT Solutions</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Cyber Security</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Digital Marketing</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>Brand Identity</Link></li>
                                    <li><Link to="/service"><i className="bi bi-arrow-right-circle"></i>SEO Marketing</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget-content">
                            <div className="footer-widget-title">
                                <h4>Newsletter</h4>
                            </div>
                            <p className="f-desc-2">Subscribe our Latest Newsletter</p>
                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                <div className="footer-newslatter-box">
                                    <input type="text" name="Email" placeholder="Enter Your E-Mail" required />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="footer-bottom-area">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">

                                <div className="footer-bottom-content">
                                    <p>© {new Date().getFullYear()} Big-Matrix Solutions.</p>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="footer-botton-social-icon">
                                    <ul>
                                        <li><Link to="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
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
