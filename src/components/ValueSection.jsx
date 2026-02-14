import React from 'react';

const ValueSection = ({ icon, title, description, items, reversed = false }) => {
    return (
        <div className={`row ${reversed ? '' : 'mt-5'} align-items-center`}>
            {!reversed && (
                <div className="col-lg-6">
                    <div className="mission-icon-box">
                        <i className={icon}></i>
                    </div>
                </div>
            )}
            <div className="col-lg-6">
                <div className={`mission-box ${reversed ? '' : 'two'}`}>
                    <div className="mission-content">
                        <h4>{title}</h4>
                        {description && <p className="mission-description">{description}</p>}
                        {items && items.map((item, index) => (
                            <div className="single-icon-box" key={index}>
                                <div className="single-icon-thumb">
                                    <i className="bi bi-check"></i>
                                </div>
                                <div className="sigle-icon-desc">
                                    <p>{item}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {reversed && (
                <div className="col-lg-6">
                    <div className="mission-icon-box">
                        <i className={icon}></i>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ValueSection;
