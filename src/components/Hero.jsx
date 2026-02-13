import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { color } from 'three/tsl';

const Hero = () => {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);
    const [vantaLoaded, setVantaLoaded] = useState(false);

    useEffect(() => {
        // Dynamically import Vanta and Three.js
        const loadVanta = async () => {
            try {
                const THREE = await import('three');
                const FOG = await import('vanta/dist/vanta.fog.min');
                
                if (!vantaEffect.current && vantaRef.current) {
                    vantaEffect.current = FOG.default({
                        el: vantaRef.current,
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        highlightColor: 0x46fc,
                        midtoneColor: 0xd9271a,
                        lowlightColor: 0x1e00ff,
                        baseColor: 0x41698c,
                        blurFactor: 0.51,
                        speed: 1.50,
                        zoom: 0.90
                    });
                    setVantaLoaded(true);
                }
            } catch (error) {
                console.error('Vanta initialization error:', error);
            }
        };

        loadVanta();

        // Cleanup function
        return () => {
            if (vantaEffect.current) {
                try {
                    vantaEffect.current.destroy();
                } catch (error) {
                    console.error('Vanta cleanup error:', error);
                }
            }
        };
    }, []);

    return (
        <div ref={vantaRef} className="hero-area style-two d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
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
              
                </div>
            </div>
        </div>
    );
};

export default Hero;
