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
                        {member.social?.facebook && <li><Link to={member.social.facebook}><i className="bi bi-facebook"></i></Link></li>}
                        {member.social?.twitter && <li><Link to={member.social.twitter}><i className="bi bi-twitter-x"></i></Link></li>}
                        {member.social?.instagram && <li><Link to={member.social.instagram}><i className="bi bi-instagram"></i></Link></li>}
                        {member.social?.pinterest && <li><Link to={member.social.pinterest}><i className="bi bi-pinterest"></i></Link></li>}
                        {member.social?.linkedin && <li><Link to={member.social.linkedin}><i className="bi bi-linkedin"></i></Link></li>}
                        {member.social?.github && <li><Link to={member.social.github}><i className="bi bi-github"></i></Link></li>}
                        {member.social?.scholar && <li><Link to={member.social.scholar}><i className="bi bi-mortarboard"></i></Link></li>}
                        {member.social?.website && <li><Link to={member.social.website}><i className="bi bi-globe"></i></Link></li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
