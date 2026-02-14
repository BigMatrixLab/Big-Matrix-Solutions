import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ member, activeTeamId, onToggleSocial }) => {
    return (
        <div className="single-team-box">
            <div className="team-thumb">
                <img src={member.image} alt={member.name} />
            </div>
            <div className="team-content">
                <h4><Link to={`/team/${member.slug}`}>{member.name}</Link></h4>
                <p>{member.role}</p>
                <div className="team-shape">
                    <img src="/assets/images/team/team-shape.png" alt="" />
                </div>
            </div>
            <div className="team-socila-icon-box">
                <div className="team-share">
                    <div className="team-share-icon">
                        <span><i className="bi bi-share"></i></span>
                    </div>
                </div>
                <div className="team-social-icon">
                    <ul>
                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                        <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-github"></i></Link></li>
                        <li><Link to="#"><i className="fas fa-graduation-cap"></i></Link></li>
                        <li><Link to="#"><i className="fas fa-globe"></i></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
