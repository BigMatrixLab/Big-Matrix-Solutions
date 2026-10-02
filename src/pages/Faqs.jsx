import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';

const Faqs = () => {
    return (
        <>
            {/* Placeholder template copy, so this page stays out of the index
                until it has real content. Also excluded from the sitemap. */}
            <Seo
                title="FAQs"
                path="/faqs"
                noindex
            />
            <Breadcrumb pageTitle="Frequently asked questions" breadcrumbItem="FAQs" />

            <div className="faq-area">
                <div className="container">
                    <SectionHead eyebrow="Support" title="Common questions and answers" />
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="faq-content">
                                <div className="single-faq-box">
                                    <h4>How to register a new account?</h4>
                                    <p>Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment.</p>
                                </div>
                                <div className="single-faq-box">
                                    <h4>What is the payment method?</h4>
                                    <p>Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="faq-content">
                                <div className="single-faq-box">
                                    <h4>Is there any discount for students?</h4>
                                    <p>Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment.</p>
                                </div>
                                <div className="single-faq-box">
                                    <h4>How can I contact support?</h4>
                                    <p>Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <CtaBand />
        </>
    );
};

export default Faqs;
