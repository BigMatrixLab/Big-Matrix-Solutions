import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const Faqs = () => {
    return (
        <>
            <Breadcrumb pageTitle="Frequently asked questions" breadcrumbItem="FAQs" />

            <div className="faq-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-title left">
                                <h2>Support</h2>
                                <h1>Common questions and answers</h1>
                            </div>
                        </div>
                    </div>
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

        </>
    );
};

export default Faqs;
