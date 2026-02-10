import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const TeamDetails = () => {
    return (
        <>
            <Breadcrumb pageTitle="Team Details" breadcrumbItem="Team" />

            {/* Team Details Area */}
            <div className="team-details-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="team-thumb">
                                <img src="/assets/images/team/team-details.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="team-details-right">
                                <div className="team-details-content">
                                    <div className="team-member-title">
                                        <h4>Anowar Hossin Omio</h4>
                                        <p>Big-Matrix Founder & CEO</p>
                                    </div>
                                    <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor creative labore et dolore magna aliqua ipsum suspendisse ultrices gravida commodo viverra accu eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div className="row add-bg">
                                    <div className="col-lg-6 col-md-6">
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
                                    <div className="col-lg-6 col-md-6">
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
                                </div>
                                <div className="team-details-social-icon">
                                    <ul>
                                        <li>Social Media</li>
                                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
                                    </ul>
                                </div>
                                <div className="team-details-location-box">
                                    <div className="contact-info-icon">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div className="contact-info-content">
                                        <h4>Location</h4>
                                        <p>21 King Street 5th Floor Hamilton, Ontario Canada</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="team-details-skills">
                                <h4>My Skills</h4>
                                <div className="wrapper">
                                    <div className="skill">
                                        <p>Design Analytics</p>
                                        <div className="skill-bar skill1">
                                            <span className="skill-count1">95%</span>
                                        </div>
                                    </div>
                                    <div className="skill">
                                        <p>Software Development</p>
                                        <div className="skill-bar skill2">
                                            <span className="skill-count2">85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="team-details-skills">
                                <h4>Success Project </h4>
                                <div className="wrapper">
                                    <div className="skill">
                                        <p>UI/UX Design & Development</p>
                                        <div className="skill-bar skill1">
                                            <span className="skill-count1">95%</span>
                                        </div>
                                    </div>
                                    <div className="skill">
                                        <p>Content Strategy</p>
                                        <div className="skill-bar skill2">
                                            <span className="skill-count2">85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default TeamDetails;
