import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero-area style-two d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <div className="hero-content">
                            <h4> Software Solution Agency in Bangladesh </h4>
                            <h1> Business Innovation  </h1>
                            <h1> With IT Expert</h1>
                            <p>Professionally optimize interdependent intellectual interoperable connect
                                best practices. Progressively fabricate done
                            </p>
                        </div>
                        <div className="hero-button">
                            <Link to="/contact">Lets Talk<i className="bi bi-arrow-right"></i></Link>
                            <Link className="button-two" to="/about">Read More<i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    {/* <div className="col-lg-4 d-none d-lg-block">
                        <div className="hero-right">
                            <div className="hero-thumb">
                                <img src="/assets/images/home-2/hero-thumb.png" alt="" />
                            </div>
                            <div className="hero-shape">
                                <img src="/assets/images/home-2/hero-shape.png" alt="" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Hero;
