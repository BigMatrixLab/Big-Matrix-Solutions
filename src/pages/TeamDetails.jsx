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
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="team-thumb">
                                <img src={member.image} alt={member.name} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="team-details-right">
                                <div className="team-details-content">
                                    <div className="team-member-title">
                                        <h4>{member.name}</h4>
                                        <p>{member.role}</p>
                                    </div>
                                    <p className="desc">{member.desc}</p>
                                </div>
                                <div className="row add-bg">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="contact-info-box">
                                            <div className="contact-info-icon">
                                                <i className="fa-solid fa-phone"></i>
                                            </div>
                                            <div className="contact-info-content">
                                                <h4>Call us Any time</h4>
                                                <p>{member.phone}</p>
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
                                                <p>{member.email}</p>
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
                                        <p>{member.location}</p>
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
                                    {member.skills.map((skill, index) => (
                                        <div className="skill" key={index}>
                                            <p>{skill.name}</p>
                                            <div className={`skill-bar skill${index + 1}`}>
                                                <span className={`skill-count${index + 1}`}>{skill.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="team-details-skills">
                                <h4>Success Project </h4>
                                <div className="wrapper">
                                    {member.projects.map((project, index) => (
                                        <div className="skill" key={index}>
                                            <p>{project.name}</p>
                                            <div className={`skill-bar skill${index + 1}`}>
                                                <span className={`skill-count${index + 1}`}>{project.value}</span>
                                            </div>
                                        </div>
                                    ))}
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
