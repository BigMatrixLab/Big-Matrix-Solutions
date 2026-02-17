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
            <div className="team-area style-two team-page-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title left style-two team-page-title-mobile-center">
                                <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Dedicated Team</h2>
                                <h1>Meet Our Dedicated Member</h1>
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
        </>
    );
};

export default Team;
