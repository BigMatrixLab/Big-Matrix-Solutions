import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const BlogDetails = () => {
    return (
        <>
            <Breadcrumb pageTitle="Blog Details" breadcrumbItem="Blog" />

            <div className="blog-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-thumb">
                                <img src="/assets/images/inner-images/blog-1.jpg" alt="" />
                            </div>
                            <div className="blog-details-content">
                                <div className="blog-meta">
                                    <span><i className="bi bi-person"></i>By Admin</span>
                                    <span><i className="bi bi-calendar3"></i>20 March, 2024</span>
                                    <span><i className="bi bi-chat-left-text"></i>04 Comments</span>
                                </div>
                                <h4 className="blog-details-title">Solution This Business For is Marketing Blog</h4>
                                <p className="blog-details-desc">Alternative innovation to ethical network environmental whiteboard pursue compelling results for premier methods empowerment. Dramatically architect go forward opportunities before user-centric partnerships. Credibly implement exceptional </p>
                                <p className="blog-details-desc">Continually fashion orthogonal leadership skills whereas wireless metrics. Uniquely syndicate exceptional opportunities with interdependent users. Globally enhance fully tested meta-services rather than pandemic solutions. Proactively integrate client-integrate go forward architectures and turnkey meta-services. Interactively harness integrated ROI whereas frictionless products.</p>

                                <blockquote>
                                    "Monotonectally synergize granular top visualize strategic infomediaries after task state of the art infrastructures digital agency"
                                </blockquote>

                                <p className="blog-details-desc">Competently architect intermandated deliverables client niches continually underwhelm granular meta-services whereas pandemic solutions.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget-sidber">
                                <div className="widget-sidber-content">
                                    <h4>Categories</h4>
                                </div>
                                <div className="widget-category">
                                    <ul>
                                        <li><a href="#">IT Solution<i className="bi bi-arrow-right"></i></a></li>
                                        <li><a href="#">Cloud Services<i className="bi bi-arrow-right"></i></a></li>
                                        <li><a href="#">Data Analysis<i className="bi bi-arrow-right"></i></a></li>
                                        <li><a href="#">Marketing<i className="bi bi-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default BlogDetails;
