import React from 'react';

const ValueSection = ({ icon, image, title, description, items, reversed = false }) => {
    return (
        <div className={`row align-items-stretch`}>
            {!reversed && (
                <div className="col-lg-6 col-md-12 p-0 d-flex value-section-image">
                    <div className={image ? "h-100 w-100" : "mission-icon-box"}>
                        {image ? <img src={image} alt={title} className="w-100 h-100" style={{objectFit: 'cover'}} /> : <i className={icon}></i>}
                    </div>
                </div>
            )}
            <div className="col-lg-6 col-md-12 p-0 d-flex value-section-content">
                <div className={`mission-box ${reversed ? '' : 'two'} h-100 w-100`}>
                    <div className="mission-content">
                        <h4>{title}</h4>
                        {description && <p className="mission-description" style={{textAlign: 'justify'}}>{description}</p>}
                        {items && items.map((item, index) => (
                            <div className="single-icon-box" key={index}>
                                <div className="single-icon-thumb">
                                    <i className="bi bi-check"></i>
                                </div>
                                <div className="sigle-icon-desc">
                                    <p style={{textAlign: 'justify'}}>{item}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {reversed && (
                <div className="col-lg-6 col-md-12 p-0 d-flex value-section-image">
                    <div className={image ? "h-100 w-100" : "mission-icon-box"}>
                        {image ? <img src={image} alt={title} className="w-100 h-100" style={{objectFit: 'cover'}} /> : <i className={icon}></i>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ValueSection;
