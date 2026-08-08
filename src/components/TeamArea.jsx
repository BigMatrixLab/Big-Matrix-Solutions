import React, { useState } from 'react';
import SectionHead from './SectionHead';
import teamData from '../data/team.json';
import TeamCard from './TeamCard';

const TeamArea = () => {
    const [activeTeamId, setActiveTeamId] = useState(null);

    const toggleSocial = (id) => setActiveTeamId((current) => (current === id ? null : id));

    const teamMembers = teamData.slice(0, 4);

    return (
        <section className="bm-section bm-section--warm">
            <div className="bm-container">
                <SectionHead
                    eyebrow="The team"
                    title="Engineers, researchers and clinicians"
                    action={{ label: 'All members', to: '/team' }}
                />
                <div className="bm-grid bm-grid--4">
                    {teamMembers.map((member) => (
                        <TeamCard
                            member={member}
                            activeTeamId={activeTeamId}
                            onToggleSocial={toggleSocial}
                            key={member.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamArea;
