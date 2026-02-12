import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | Big Matrix Solutions</title>
                <meta name="description" content="The page you are looking for could not be found." />
            </Helmet>
            
            <div className="not-found-container">
                {/* Animated Background Elements */}
                <div className="not-found-background-shapes">
                    <div className="not-found-shape not-found-shape-1"></div>
                    <div className="not-found-shape not-found-shape-2"></div>
                    <div className="not-found-shape not-found-shape-3"></div>
                </div>

                <div className="not-found-content">
                    {/* 404 Text with Glitch Effect */}
                    <div className="not-found-error-code">
                        <span className="not-found-glitch" data-text="404">404</span>
                    </div>

                    {/* Main Message */}
                    <h1 className="not-found-error-title">Page Not Found</h1>
                    <p className="not-found-error-description">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                        Don't worry, even the best explorers get lost sometimes.
                    </p>

                    {/* Action Buttons */}
                    <div className="not-found-error-actions">
                        <Link to="/" className="not-found-btn-home">
                            <svg className="not-found-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Back to Home
                        </Link>
                        <button onClick={() => window.history.back()} className="not-found-btn-back">
                            <svg className="not-found-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Go Back
                        </button>
                    </div>

                    {/* Additional Help Links */}
                    <div className="not-found-help-links">
                        <p>Looking for something else?</p>
                        <div className="not-found-quick-links">
                            <Link to="/service">Services</Link>
                            <Link to="/project">Projects</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/blog">Blog</Link>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="not-found-floating-elements">
                    <div className="not-found-float-element not-found-fe-1">0</div>
                    <div className="not-found-float-element not-found-fe-2">1</div>
                    <div className="not-found-float-element not-found-fe-3">0</div>
                    <div className="not-found-float-element not-found-fe-4">1</div>
                    <div className="not-found-float-element not-found-fe-5">0</div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
