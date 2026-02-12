import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero-area style-two d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <div className="hero-content">
                            <h4> Big-Matrix Lab Development Wing </h4>
                            <h1> Revolutionizing Healthcare  </h1>
                            <h1> Through Advanced Technology</h1>
                            <p>Combining AI, big data analytics, and biomedical expertise to accelerate 
                                medical discoveries and transform patient outcomes worldwide.
                            </p>
                        </div>
                        <div className="hero-button">
                            <Link to="/contact">Start Collaboration<i className="bi bi-arrow-right"></i></Link>
                            <Link className="button-two" to="/about">Learn More<i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
              
                </div>
            </div>
        </div>
    );
};

export default Hero;
