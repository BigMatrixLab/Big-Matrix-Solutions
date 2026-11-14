import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';
import FAQS from '../data/faqs.json';
import { graph, organisation, webPage, faqPage, breadcrumbs } from '../utils/structuredData';

/* Answers restate what the site already publishes (About, policies, Terms),
   so the page, its FAQPage JSON-LD and llms.txt never disagree. */
const half = Math.ceil(FAQS.length / 2);
const COLUMNS = [FAQS.slice(0, half), FAQS.slice(half)];

const Faqs = () => {
    return (
        <>
            <Seo
                title="FAQs"
                description="Answers about Big-Matrix Solutions: what we build, where we are, payments, refunds within 7 to 10 working days, delivery, support and data protection."
                path="/faqs"
                schema={graph(
                    organisation(),
                    webPage('WebPage', 'Frequently asked questions', '/faqs'),
                    faqPage(FAQS),
                    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faqs' }]),
                )}
            />
            <Breadcrumb pageTitle="Frequently asked questions" breadcrumbItem="FAQs" />

            <div className="faq-area">
                <div className="container">
                    <SectionHead eyebrow="Support" title="Common questions and answers" />
                    <div className="row">
                        {COLUMNS.map((column, i) => (
                            <div className="col-lg-6" key={i}>
                                <div className="faq-content">
                                    {column.map((item) => (
                                        <div className="single-faq-box" key={item.q}>
                                            <h4>{item.q}</h4>
                                            <p>{item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        <CtaBand />
        </>
    );
};

export default Faqs;
