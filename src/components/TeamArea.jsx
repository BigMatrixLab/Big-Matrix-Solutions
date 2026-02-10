import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TeamArea = () => {
    const [activeTeamId, setActiveTeamId] = useState(null);

    const toggleSocial = (id) => {
        if (activeTeamId === id) {
            setActiveTeamId(null);
        } else {
            setActiveTeamId(id);
        }
    };

    const teamMembers = [
        { id: 1, name: 'John D. Alexon', role: 'UI Designer', img: '/assets/images/team/team-1.png' },
        { id: 2, name: 'Alexina Gomez', role: 'HR Manager', img: '/assets/images/team/team-2.png' },
        { id: 3, name: 'Antoine Brown', role: 'Developer', img: '/assets/images/team/team-3.png' },
        { id: 4, name: 'Carolina Scott', role: 'UI Designer', img: '/assets/images/team/team-4.png' }
    ];

    return (
        <div className="team-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="section-title left style-two">
                            <h4>Dedicated Team</h4>
                            <h1>Meet Our Dedicated Member</h1>
                            <h1>For Any Enquery</h1>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="toptech-button style-one">
                            <Link to="/team">All Member<i className="bi bi-arrow-right-circle-fill"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {teamMembers.map((member) => (
                        <div className="col-lg-3 col-md-6" key={member.id}>
                            <div className="single-team-box">
                                <div className="team-thumb">
                                    <img src={member.img} alt={member.name} />
                                </div>
                                <div className="team-content">
                                    <h4><Link to="/team-details">{member.name}</Link></h4>
                                    <p>{member.role}</p>
                                    <div className="team-shape">
                                        <img src="/assets/images/team/team-shape.png" alt="" />
                                    </div>
                                </div>
                                <div className="team-socila-icon-box">
                                    <div className="team-share" onClick={() => toggleSocial(member.id)}>
                                        <div className="team-share-icon">
                                            <span><i className="bi bi-share"></i></span>
                                        </div>
                                    </div>
                                    <div className={`team-social-icon ${activeTeamId === member.id ? 'active' : ''}`}>
                                        <ul>
                                            <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                            <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                            <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                            <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamArea;
