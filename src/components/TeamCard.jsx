import { Link } from 'react-router-dom';

const SOCIALS = [
    { key: 'linkedin', icon: 'bi-linkedin', label: 'LinkedIn' },
    { key: 'github', icon: 'bi-github', label: 'GitHub' },
    { key: 'scholar', icon: 'bi-mortarboard', label: 'Google Scholar' },
    { key: 'website', icon: 'bi-globe', label: 'Website' },
];

const TeamCard = ({ member }) => {
    const links = SOCIALS.filter((social) => member.social?.[social.key]);

    return (
        <article className="bm-card bm-card--person">
            <div className="bm-card__media bm-card__media--square">
                <img src={member.image} alt={member.name} loading="lazy" />
                {links.length > 0 && (
                    <div className="bm-card__tray">
                        {links.map((social) => (
                            <a
                                href={member.social[social.key]}
                                key={social.key}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} on ${social.label}`}
                            >
                                <i className={`bi ${social.icon}`} aria-hidden="true"></i>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <div className="bm-card__body">
                <h3 className="bm-card__title">
                    {member.slug ? (
                        <Link to={`/team/${member.slug}`}>{member.name}</Link>
                    ) : (
                        member.name
                    )}
                </h3>
                {member.desc && <p className="bm-card__text">{member.desc}</p>}
                <span className="bm-card__rule" aria-hidden="true"></span>
                {member.slug && (
                    <div className="bm-card__foot">
                        <Link to={`/team/${member.slug}`} className="bm-link">
                            View profile
                            <i className="bi bi-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
};

export default TeamCard;
