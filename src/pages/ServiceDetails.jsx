import React from 'react';
import { useParams, Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Breadcrumb from '../components/Breadcrumb';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { servicesData } from '../data/content';

const ServiceDetails = () => {
    const { slug } = useParams();
    const service = servicesData.find(s => s.slug === slug);

    // PDF download handler
    const handleDownloadPDF = () => {
        const content = document.querySelector('.services-details-content');
        if (content) {
            // Wait for all images to load
            const images = content.querySelectorAll('img');
            const promises = Array.from(images).map(img => {
                if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = img.onerror = resolve;
                });
            });
            Promise.all(promises).then(() => {
                const opt = {
                    margin: 0.5,
                    filename: `${service.title || 'service'}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf().set(opt).from(content).save();
            });
        }
    };

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
                                    {/* Download PDF Button */}
                                    {/* Download PDF Button removed, now handled in sidebar */}
                                    <div className="services-details-content">
                                        {/* Render markdown content if contentFile exists, otherwise fallback to JSON structure */}
                                        {service.contentFile ? (
                                            <MarkdownRenderer contentFile={service.contentFile} />
                                        ) : (
                                            <>
                                                <h4 className="services-details-title">{service.title}</h4>
                                                <p className="services-details-desc">{service.desc}</p>
                                                <p className="services-details-desc">{service.longDescription}</p>
                                            </>
                                        )}
                                    </div>

                                    {/* Keep static sections if no markdown */}
                                    {!service.contentFile && (
                                        <>
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
                                        </>
                                    )}
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
                                                {servicesData.map(s => (
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
                                            {/* <a href="#"><i className="bi bi-file-earmark-pdf"></i>Service Report<span><i className="bi bi-download"></i></span></a> */}
                                            <button
                                                className="btn btn-primary w-100 active"
                                                id="download-pdf-btn"
                                                type="button"
                                                onClick={handleDownloadPDF}
                                                style={{ display: service.contentFile ? 'block' : 'none' }}
                                            >
                                                <i className="bi bi-file-earmark-pdf" style={{ color: "#fff" }}></i> Download PDF <i className="bi bi-download" style={{ color: "#fff", paddingLeft: "5px" }}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="widget-sidber-contact-box">
                                        <div className="widget-sidber-contact">
                                            <img src="/assets/images/inner-images/sidber-cont-icon.png" alt="" />
                                        </div>
                                        <p className="widget-sidber-contact-text">Call Us Anytime</p>
                                        <h3 className="widget-sidber-contact-number">+880 2 55668200 (6212)</h3>
                                        <span className="widget-sidber-contact-gmail"><i className="bi bi-envelope-fill"></i> contact@big-matrix.com</span>
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
