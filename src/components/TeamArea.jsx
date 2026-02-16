import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import teamData from '../data/team.json';
import TeamCard from './TeamCard';

const TeamArea = () => {
    const [activeTeamId, setActiveTeamId] = useState(null);

    const toggleSocial = (id) => {
        if (activeTeamId === id) {
            setActiveTeamId(null);
        } else {
            setActiveTeamId(id);
        }
    };

    const teamMembers = teamData.slice(0, 4);

    return (
        <div className="team-area style-two">
            <div className="container">
                <div
                    className="row"
                    style={
                        window.innerWidth <= 767
                            ? { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }
                            : undefined
                    }
                >
                    <div className="col-lg-7">
                        <div className="section-title left style-two">
                            <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Dedicated Team</h2>
                            <h1>Meet Our Dedicated Member</h1>
                            <h1>For Any Enquery</h1>
                        </div>
                    </div>
                    <div className="col-lg-5"
                    style={
                        window.innerWidth <= 767
                            ? { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }
                            : undefined
                    }>
                        <div className="toptech-button style-one">
                            <Link to="/team">All Member<i className="bi bi-arrow-right-circle-fill"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="row g-4">
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
    );
};

export default TeamArea;
