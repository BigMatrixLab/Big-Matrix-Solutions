import React from 'react';
import { Link } from 'react-router-dom';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const Hero = () => {
    return (
        <div className="hero-area style-two d-flex align-items-center" style={{ backgroundImage: `url(/assets/images/Hero_BG.png)` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="hero-content">
                            <h4 style={{ color: '#ED352D', fontWeight: 'bold' }}>Big-Matrix Solutions</h4>
                            <h1> Designing the Future of Intelligent Infrastructure  </h1>
                            <p>We build advanced software ecosystems—from medical diagnostics and hospital systems to industrial automation and predictive analytics—powering the next generation of digital transformation.
                            </p>
                        </div>
                        <div className="hero-button">
                            <Link to="/contact">Start Collaboration<i className="bi bi-arrow-right"></i></Link>
                            <Link className="button-two" to="/about">Learn More<i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                     <div className="col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center hero-animation-wrapper">
                        <DotLottiePlayer
                            src="/assets/images/hero-anim.lottie"
                            autoplay
                            loop
                            style={{ 
                                width: '100%', 
                                maxWidth: '600px',
                                height: 'auto',
                                minHeight: '250px',
                                aspectRatio: '1 / 1'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
