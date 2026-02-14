import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const Contact = () => {
    return (
        <>
            <Breadcrumb pageTitle="Contact Us" />

            {/* Contact Area Style Three */}
            <div className="contact-area style-three inner">
                <div className="container">
                    <div className="row add-white-bg align-items-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="single-contact-box">
                                <div className="contact-contetn">
                                    <h4>Write to Us Anytime</h4>
                                </div>
                                <form action="#" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="single-input-box">
                                                <input type="text" name="name" placeholder="Your Name" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="single-input-box">
                                                <input type="email" name="Email" placeholder="Enter E-Mail" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="single-input-box">
                                                <input type="text" name="Phone" placeholder="Phone Number" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="single-input-box">
                                                <select name="place" id="place">
                                                    <option value="">Subject</option>
                                                    <option value="research">Research Collaboration</option>
                                                    <option value="software">Software Solutions</option>
                                                    <option value="consulting">AI Consulting</option>
                                                    <option value="partnership">Partnership Inquiry</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single-input-box">
                                                <textarea name="massage" id="massage" placeholder="Write Message" required></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="massage-sent-button">
                                                <button type="submit">Send Message </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="single-contact-info-box">
                                <div className="info-content">
                                    <h4>Don’t Forget to Contact Us</h4>
                                </div>
                                <div className="contact-info-box">
                                    <div className="contact-info-icon">
                                        <i className="bi bi-telephone-fill"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <p>Call Us</p>
                                        <h4>+880 2 55668200 (6212)</h4>
                                    </div>
                                </div>
                                <div className="contact-info-box">
                                    <div className="contact-info-icon">
                                        <i className="bi bi-envelope-open-fill"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <p>Send E-Mail</p>
                                        <h4>hi@big-matrix.com</h4>
                                    </div>
                                </div>
                                <div className="contact-info-box">
                                    <div className="contact-info-icon">
                                        <i className="bi bi-alarm"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <p>Office Hours</p>
                                        <h4>9.00 AM to 5.00 PM</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map */}
            <div className="google-map">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0980914516545!2d90.4255566!3d23.815110699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64c103a8093%3A0xd660a4f50365294a!2sNorth%20South%20University!5e0!3m2!1sen!2sbd!4v1770986969556!5m2!1sen!2sbd"
                                style={{ border: 0, width: '100%', height: '650px' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Contact;
