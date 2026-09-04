import { Link } from 'react-router-dom';
import { servicesData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';
import { groupedServices, padIndex } from '../utils/serviceOrder';
import Seo from '../components/Seo';

const Services = () => {
    const groups = groupedServices(servicesData);

    return (
        <>
            <Seo
                title="Solutions"
                description="Practice areas built for regulated, high-load environments: medical imaging AI, agentic engineering, data platforms and clinical infrastructure."
                path="/service"
            />
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
                                    {padIndex(group.items.length)} solutions
                                </span>
                            </div>

                            <div className="bm-rows">
                                {group.items.map((service) => (
                                    <div className="bm-row" key={service.slug}>
                                        <span className="bm-row__index">{padIndex(service.n)}</span>
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
