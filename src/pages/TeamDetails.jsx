import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import teamData from '../data/team.json';

const TeamDetails = () => {
    const { slug } = useParams();
    const member = teamData.find(m => m.slug === slug);

    if (!member) {
        return (
            <>
                <Breadcrumb pageTitle="Member Not Found" breadcrumbItem="Team" />
                <div className="team-details-area">
                    <div className="container text-center">
                        <h2>Team member not found</h2>
                        <Link to="/team" className="btn btn-primary mt-4">Back to Team</Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb pageTitle={member.name} breadcrumbItem="Team" />

            {/* Team Details Area */}
            <div className="team-details-area">
                <div className="container">
                    <div className="row align-items-start" style={{ gap: 0 }}>
                        <div className="col-lg-5" style={{ paddingLeft: 10, paddingRight:20 }}>
                            <div className="team-thumb">
                                <img src={member.image} alt={member.name} />
                            </div>
                        </div>
                        <div className="col-lg-7" style={{ paddingLeft: 20 }}>
                            <div className="team-details-right">
                                <div className="team-details-content">
                                    <div className="team-member-title">
                                        <h4>{member.name}</h4>
                                        <p>{member.role}</p>
                                    </div>
                                    <p className="desc">{member.desc}</p>
                                </div>
                                <div className="d-flex flex-wrap gap-3">
                                    <div>
                                        <div className="contact-info-box">
                                            <div className="contact-info-icon">
                                                <i className="bi bi-telephone-fill"></i>
                                            </div>
                                            <div className="contact-info-content">
                                                <h4>Contact</h4>
                                                <p>{member.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="contact-info-box">
                                            <div className="contact-info-icon">
                                                <i className="bi bi-envelope-fill"></i>
                                            </div>
                                            <div className="contact-info-content">
                                                <h4>E-Mail</h4>
                                                <p>{member.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-details-social-icon">
                                    <ul>
                                        <li>Social Media</li>
                                        {member.social?.facebook && (
                                            <li><a href={member.social.facebook}><i className="bi bi-facebook" style={{ fontSize: '20px' }}></i></a></li>
                                        )}
                                        {member.social?.twitter && (
                                            <li><a href={member.social.twitter}><i className="bi bi-twitter" style={{ fontSize: '20px' }}></i></a></li>
                                        )}
                                        {member.social?.linkedin && (
                                            <li><a href={member.social.linkedin}><i className="bi bi-linkedin" style={{ fontSize: '20px' }}></i></a></li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </>
    );
};

export default TeamDetails;
