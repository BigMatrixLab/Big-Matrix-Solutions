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
                        <li><Link to="#"><i className="bi bi-facebook"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-twitter-x"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-instagram"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-pinterest"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-linkedin"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-github"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-mortarboard"></i></Link></li>
                        <li><Link to="#"><i className="bi bi-globe"></i></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
