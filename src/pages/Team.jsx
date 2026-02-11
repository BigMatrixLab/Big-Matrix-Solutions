import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import teamData from '../data/team.json';

const Team = () => {
    const teamMembers = teamData;

    return (
        <>
            <Breadcrumb pageTitle="Our Team" breadcrumbItem="Team" />

            {/* Team Area Style One */}
            <div className="team-area style-one inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title left style-two">
                                <h4>Dedicated Team</h4>
                                <h1>Meet Our Dedicated Member</h1>
                                <h1>For Any Enquiry</h1>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="toptech-button style-one">
                                <a href="#">All Member<i className="bi bi-arrow-right-circle-fill"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {teamMembers.map((member, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div className="single-team-box">
                                    <div className="team-thumb">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                    <div className="team-content">
                                        <div className="team-bio">
                                            <h4><Link to={`/team/${member.slug}`}>{member.name}</Link></h4>
                                            <p>{member.role}</p>
                                        </div>
                                        <div className="team-social-icon">
                                            <ul>
                                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                                <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscribe Area Style Three */}
            <div className="subscribe-area style-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="section-title left inner-style">
                                <h1>Get Latest Update from Big-Martrix Solutions</h1>
                                <h1>Stay Connect with Us</h1>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                <div className="single-subscribe-box">
                                    <input type="text" name="Email" placeholder="Enter your Email" required />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Area Style Three */}
            <div className="process-area style-three inner">
                <div className="container">
                    <div className="row add-bg">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-1.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Account Register</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-2.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Add New Card</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-process-box">
                                <div className="process-icon">
                                    <img src="/assets/images/home-3/process-3.png" alt="" />
                                </div>
                                <div className="process-content">
                                    <h4>Verified Account</h4>
                                    <p>Opportunities before extensible market Dramatically pursue us</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Team;
