import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import servicesData from '../data/services.json';

const ServiceDetails = () => {
    const { slug } = useParams();
    const service = servicesData.find(s => s.slug === slug);

    if (!service) {
        return (
            <>
                <Breadcrumb pageTitle="Service Not Found" breadcrumbItem="Service" />
                <div className="services-details-area">
                    <div className="container text-center">
                        <h2>Service not found</h2>
                        <Link to="/service" className="btn btn-primary mt-4">Back to Services</Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb pageTitle={service.title} breadcrumbItem="Service" />

            {/* Services Details Area */}
            <div className="services-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="services-details-thumb">
                                        <img src={service.image} alt={service.title} />
                                    </div>
                                    <div className="services-details-content">
                                        <h4 className="services-details-title">{service.title}</h4>
                                        <p className="services-details-desc">{service.desc}</p>
                                        <p className="services-details-desc">{service.longDescription}</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="service-details-icon-box">
                                                <div className="service-details-icon-thumb">
                                                    <img src="/assets/images/service-inner/services-details-icon-1.png" alt="" />
                                                </div>
                                                <div className="service-details-box-content">
                                                    <h4>Custom Software</h4>
                                                    <p>Ethical network environmental architect go forward opportu credibly implement</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="service-details-icon-box">
                                                <div className="service-details-icon-thumb">
                                                    <img src="/assets/images/service-inner/services-details-icon-2.png" alt="" />
                                                </div>
                                                <div className="service-details-box-content">
                                                    <h4>Mobile Application</h4>
                                                    <p>Ethical network environmental architect go forward opportu credibly implement</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="services-details-text">
                                        <div className="service-details-text-icon">
                                            <img src="/assets/images/service-inner/services-details-text-icon.png" alt="" />
                                        </div>
                                        <div className="service-details-text-content">
                                            <p>Competently architect intermandated deliverables client niches continually underwhelm</p>
                                        </div>
                                    </div>

                                    <h4 className="services-details-title">What the Benefits?</h4>
                                    <p className="services-details-desc">Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment. Dramatically architect go forward opportunities </p>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="single-benifits-box">
                                                <div className="benifits-thumb">
                                                    <img src="/assets/images/service-inner/services-details-benifis-thumb-1.jpg" alt="" />
                                                </div>
                                                <div className="benifits-content">
                                                    <h4>Analysis And Planning.</h4>
                                                    <ul>
                                                        <li><i className="bi bi-check2"></i>New Modern Equipments</li>
                                                        <li><i className="bi bi-check2"></i>Expert’s Volunteers</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="single-benifits-box">
                                                <div className="benifits-thumb">
                                                    <img src="/assets/images/service-inner/services-details-benifis-thumb-2.jpg" alt="" />
                                                </div>
                                                <div className="benifits-content">
                                                    <h4>Design & Development.</h4>
                                                    <ul>
                                                        <li><i className="bi bi-check2"></i>New Modern Equipments</li>
                                                        <li><i className="bi bi-check2"></i>Expert’s Volunteers</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="widget-sidber">
                                        <div className="widget-sidber-content">
                                            <h4>Categories</h4>
                                        </div>
                                        <div className="widget-category">
                                            <ul>
                                                {servicesData.slice(0, 5).map(s => (
                                                    <li key={s.id}>
                                                        <Link to={`/service/${s.slug}`}>
                                                            <img src="/assets/images/service-inner/category-icon.png" alt="" />
                                                            {s.title}
                                                            <i className="bi bi-arrow-right"></i>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="widget-sidber">
                                        <div className="widget-sidber-content">
                                            <h4>Downloads</h4>
                                        </div>
                                        <div className="widget-sidber-download-button">
                                            <a href="#"><i className="bi bi-file-earmark-pdf"></i>Service Report<span><i className="bi bi-download"></i></span></a>
                                            <a className="active" href="#"><i className="bi bi-file-earmark-pdf"></i>Download Lists<span><i className="bi bi-download"></i></span></a>
                                        </div>
                                    </div>
                                    <div className="widget-sidber-contact-box">
                                        <div className="widget-sidber-contact">
                                            <img src="/assets/images/inner-images/sidber-cont-icon.png" alt="" />
                                        </div>
                                        <p className="widget-sidber-contact-text">Call Us Anytime</p>
                                        <h3 className="widget-sidber-contact-number">+123 (4567) 890</h3>
                                        <span className="widget-sidber-contact-gmail"><i className="bi bi-envelope-fill"></i> example@gmail.com</span>
                                        <div className="widget-sidber-contact-btn">
                                            <Link to="/contact">Contact Us <i className="bi bi-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ServiceDetails;
