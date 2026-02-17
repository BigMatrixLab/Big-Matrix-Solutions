import React from 'react';
import { Link } from 'react-router-dom';
import '/src/assets/css/TeamCard.css';

const TeamCard = ({ member }) => {
    return (
        <div className="aesthetic-card">
            <div className="card-media">
                <img src={member.image} alt={member.name} className="member-image" />
                
                {/* Icon-First Social Trigger */}
                <div className="social-glass-tray">
                    <div className="icon-list">
                        {member.social?.linkedin && <Link to={member.social.linkedin} className="s-link"><i className="bi bi-linkedin"></i></Link>}
                        {member.social?.github && <Link to={member.social.github} className="s-link"><i className="bi bi-github"></i></Link>}
                        {member.social?.scholar && <Link to={member.social.scholar} className="s-link"><i className="bi bi-mortarboard"></i></Link>}
                        {member.social?.website && <Link to={member.social.website} className="s-link"><i className="bi bi-globe"></i></Link>}
                    </div>
                </div>
            </div>

            <div className="card-info">
                <div className="text-content">
                    {/* <Link to={`/team/${member.slug}`} className="member-name">
                        {member.name}
                    </Link> */}
                    <span className="member-name">
                        {member.name}
                    </span>
                    <p className="member-role">{member.role}</p>
                </div>
                <div className="card-accent-line"></div>
            </div>
        </div>
    );
};

export default TeamCard;