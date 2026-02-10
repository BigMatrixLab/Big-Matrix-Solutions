import React from 'react';

const ContactInfoArea = () => {
    return (
        <div className="contact-info-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info-box">
                            <div className="contact-info-icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="contact-info-content">
                                <h4>Call us Any time</h4>
                                <p>+123 (4567) 890</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info-box">
                            <div className="contact-info-icon">
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className="contact-info-content">
                                <h4>Send E-Mail</h4>
                                <p>info@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info-box">
                            <div className="contact-info-icon">
                                <i className="fa-regular fa-clock"></i>
                            </div>
                            <div className="contact-info-content">
                                <h4>Opening Hours</h4>
                                <p>Mon - Fri (8.00 - 5.00)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoArea;
