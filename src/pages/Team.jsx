import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import TeamCard from '../components/TeamCard';
import CtaBand from '../components/CtaBand';
import teamData from '../data/team.json';

const Team = () => {
    return (
        <>
            <Breadcrumb
                pageTitle="The people behind the systems"
                breadcrumbItem="Team"
            />

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead eyebrow="Dedicated team" title="Meet the team" />
                    <div className="bm-grid bm-grid--4">
                        {teamData.map((member) => (
                            <TeamCard member={member} key={member.id} />
                        ))}
                    </div>
                </div>
            </section>

            <CtaBand
                eyebrow="Join us"
                title="We are hiring."
                description="If you want to ship software into hospitals, labs and factory floors, take a look at the open roles."
                primary={{ label: 'Open roles', to: '/careers' }}
                secondary={{ label: 'Get in touch', to: '/contact' }}
            />
        </>
    );
};

export default Team;
