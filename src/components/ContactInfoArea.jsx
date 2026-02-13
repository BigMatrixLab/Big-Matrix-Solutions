import React from 'react';

const ContactInfoArea = () => {
    return (
        <div className="contact-info-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4 d-flex">
                        <div className="contact-info-box">
                            <div className="contact-info-icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="contact-info-content">
                                <h4>Call Us</h4>
                                <p>+880-2-55668200 (Ext: 6212)</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 d-flex">
                        <div className="contact-info-box">
                            <div className="contact-info-icon">
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className="contact-info-content">
                                <h4>Send E-Mail</h4>
                                <p>bigmatrixlab@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 d-flex">
                        <div className="contact-info-box">
                            <div className="contact-info-icon">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div className="contact-info-content">
                                <h4>Location</h4>
                                <p>Bashundhara, Dhaka-1229, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoArea;
