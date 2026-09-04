import { Link } from 'react-router-dom';
import { servicesData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';

/**
 * Solutions are grouped by domain so the page reads as a catalogue: pick the
 * problem area first, the practice area second. Slugs are listed explicitly to
 * keep the reading order stable regardless of file or id order.
 */
const GROUPS = [
    {
        label: 'Healthcare & life sciences',
        note: 'Clinical, diagnostic and pharmaceutical systems — from a single lab to a hospital network.',
        slugs: ['intelligent-healthcare-pharma', 'digital-hospital-infrastructure'],
    },
    {
        label: 'AI, data & platforms',
        note: 'The intelligence layer: models, analytics pipelines and the products built on top of them.',
        slugs: ['ai-machine-learning', 'big-data-analytics', 'enterprise-saas-platform'],
    },
    {
        label: 'Infrastructure & operations',
        note: 'What keeps the rest running: automation on the floor and scale in the cloud.',
        slugs: ['industrial-automation', 'cloud-devops-architecture'],
    },
];

const pad = (value) => String(value).padStart(2, '0');

const buildGroups = (services) => {
    const bySlug = new Map(services.map((service) => [service.slug, service]));
    const grouped = GROUPS.map((group) => ({
        ...group,
        items: group.slugs.map((slug) => bySlug.get(slug)).filter(Boolean),
    })).filter((group) => group.items.length > 0);

    // Anything added to /content/services later still surfaces here.
    const claimed = new Set(GROUPS.flatMap((group) => group.slugs));
    const rest = services.filter((service) => !claimed.has(service.slug));

    return rest.length > 0
        ? [
              ...grouped,
              {
                  label: 'Additional practice areas',
                  note: 'Newer capabilities that sit alongside the core domains.',
                  items: rest,
              },
          ]
        : grouped;
};

const Services = () => {
    const groups = buildGroups(servicesData);

    return (
        <>
            <Breadcrumb
                pageTitle="Solutions built for regulated, high-load environments"
                breadcrumbItem="Solutions"
            />

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="What we provide"
                        title={`${servicesData.length} practice areas, one engineering standard`}
                        lead="Start with the domain you are working in. Each entry opens the full scope: architecture, integrations and what delivery involves."
                    />

                    {groups.map((group) => (
                        <section className="bm-catalogue" key={group.label}>
                            <div className="bm-catalogue__label">
                                <h3>{group.label}</h3>
                                <p>{group.note}</p>
                                <span className="bm-catalogue__count">
                                    {pad(group.items.length)} solutions
                                </span>
                            </div>

                            <div className="bm-rows">
                                {group.items.map((service) => (
                                    <div className="bm-row" key={service.slug}>
                                        <span className="bm-row__index">{pad(service.id)}</span>
                                        <span className="bm-row__icon">
                                            <i
                                                className={service.icon || 'bi bi-braces'}
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        <div className="bm-row__body">
                                            <h4 className="bm-row__title">{service.title}</h4>
                                            <p className="bm-row__text">{service.desc}</p>
                                        </div>
                                        <span className="bm-row__go" aria-hidden="true">
                                            <i className="bi bi-arrow-right"></i>
                                        </span>
                                        <Link
                                            to={`/service/${service.slug}`}
                                            className="bm-row__link"
                                        >
                                            <span>{service.title}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </section>

            <CtaBand
                eyebrow="Get started"
                title="Not sure which solution fits?"
                description="Send us the problem, not the spec. We will map it to the right architecture and tell you what it takes to build."
                secondary={{ label: 'See our products', to: '/project' }}
            />
        </>
    );
};

export default Services;
