import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import teamData from '../data/team.json';
import TeamCard from '../components/TeamCard';

const Team = () => {
    const [activeTeamId, setActiveTeamId] = useState(null);

    const toggleSocial = (id) => {
        if (activeTeamId === id) {
            setActiveTeamId(null);
        } else {
            setActiveTeamId(id);
        }
    };

    const teamMembers = teamData;

    return (
        <>
            <Breadcrumb pageTitle="Our Team" breadcrumbItem="Team" />

            {/* Team Area Style Two */}
            <div className="team-area style-two" style={{paddingTop: "50px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title left style-two">
                                <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Dedicated Team</h2>
                                <h1>Meet Our Dedicated Member</h1>
                                <h1>For Any Enquiry</h1>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
                        {teamMembers.map((member) => (
                            <div className="col-lg-3 col-md-6" key={member.id}>
                                <TeamCard 
                                    member={member} 
                                    activeTeamId={activeTeamId} 
                                    onToggleSocial={toggleSocial} 
                                />
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
                                <h1>Get Latest Update from Big-Matrix Solutions</h1>
                                <h2 style={{ color: "#fff" }}>Stay Connected with Us</h2>
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
