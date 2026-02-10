import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingArea = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        { question: "How to increase products sales 2024?", answer: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
        { question: "What kinds of web traffics?", answer: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
        { question: "How to generate organic audience?", answer: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" },
        { question: "Do you have any custom services?", answer: "Credibly conceptualize multifunctional human capital after that awesome revenue superior scenarios. Collaboratively myocardinate flexible social marketing working technologies and robust services available" }
    ];

    return (
        <div className="pricing-area style-two">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="section-title left style-two">
                            <h4>Pricing Plan </h4>
                            <h1>Our Best Affordable Pricing Plan</h1>
                            <h1>Choose Your Plans</h1>
                        </div>
                        <div className="faqs-container">
                            {faqs.map((faq, index) => (
                                <div key={index} className={`faq-singular ${activeIndex === index ? 'active' : ''}`}>
                                    <h2 className="faq-question" onClick={() => toggleAccordion(index)}>{faq.question}</h2>
                                    <div className="faq-answer" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                                        <div className="desc">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="pricing-right">
                            <div className="single-pricing-box">
                                <div className="pricing-body">
                                    <Link className="pricing-tag" to="#">Business</Link>
                                    <span className="pricing-text">For 1 Years </span>
                                    <h4 className="pricing">$39. <span>98</span></h4>
                                </div>
                                <div className="pricing-content">
                                    <div className="pricing-icon">
                                        <i className="bi bi-check-square-fill"></i>
                                    </div>
                                    <div className="pricing-title">
                                        <h4>19 Days For Free</h4>
                                        <p>Multifunctional human capital after awesome superior scenarios my coordinate</p>
                                        <Link to="#">Purchaces</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="single-pricing-box two">
                                <div className="pricing-body">
                                    <Link className="pricing-tag" to="#">Popular</Link>
                                    <span className="pricing-text">For 1 Month </span>
                                    <h4 className="pricing">$49. <span>90</span></h4>
                                </div>
                                <div className="pricing-content">
                                    <div className="pricing-icon">
                                        <i className="bi bi-check-square-fill"></i>
                                    </div>
                                    <div className="pricing-title">
                                        <h4>90 Days For Free</h4>
                                        <p>Multifunctional human capital after awesome superior scenarios my coordinate</p>
                                        <Link to="#">Purchaces</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingArea;
