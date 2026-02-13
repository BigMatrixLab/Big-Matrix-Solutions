import React from 'react';

const CounterArea = () => {
    const partners = [
        {
            id: 1,
            name: "Bangladesh Medical University",
            logo: "https://bmu.ac.bd/storage/settings/01K7K6P9MV7PG7WB4WPT2YRWMJ.png"
        },
        {
            id: 2,
            name: "Diagnotech AI",
            logo: "https://res.cloudinary.com/dcfny0d5c/image/upload/v1762248088/big-matrix/partners/D-tech.png"
        },
        {
            id: 3,
            name: "Square Hospitals Limited",
            logo: "https://res.cloudinary.com/dcfny0d5c/image/upload/v1762248092/big-matrix/partners/Square.png"
        },
        {
            id: 4,
            name: "Bangladesh Specialized Hospital PLC",
            logo: "https://res.cloudinary.com/dcfny0d5c/image/upload/v1762248086/big-matrix/partners/BDSH.png"
        },
        {
            id: 5,
            name: "Neurogen Healthcare",
            logo: "https://res.cloudinary.com/dcfny0d5c/image/upload/v1762248091/big-matrix/partners/Neurogen.png"
        }
    ];

    return (
        <div className="partners-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h2 style={{color: "#0C5ADB", paddingBottom:"10px", marginBottom: "40px"}}>Our Trusted Partners</h2>
                        </div>
                    </div>
                </div>
                <div className="partners-carousel-wrapper">
                    <div className="partners-carousel">
                        {/* First set of logos */}
                        {partners.map((partner) => (
                            <div className="partner-item" key={`first-${partner.id}`}>
                                <img src={partner.logo} alt={partner.name} />
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {partners.map((partner) => (
                            <div className="partner-item" key={`second-${partner.id}`}>
                                <img src={partner.logo} alt={partner.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterArea;
