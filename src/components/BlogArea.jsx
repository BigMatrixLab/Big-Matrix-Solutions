import React from 'react';
import { Link } from 'react-router-dom';

const BlogArea = () => {
    return (
        <div className="blog-area style-one home-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h4>Latest Blog</h4>
                            <h1>Latest Inshights From Our Blog</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-box">
                            <div className="blog-thumb">
                                <img src="/assets/images/home-1/blog1.png" alt="" />
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="bi bi-calendar-check-fill"></i> December 14, 2024</span>
                                </div>
                                <Link to="/blog-details">Most Popular Chrome Extensionfor Business Promot</Link>
                            </div>
                            <div className="blog-buttom">
                                <div className="blog-author">
                                    <span><i className="bi bi-person-circle"></i>By Admin </span>
                                </div>
                                <div className="blog-button">
                                    <Link to="/blog-grid">Read More<i className="bi bi-arrow-right-short"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-box">
                            <div className="blog-thumb">
                                <img src="/assets/images/home-1/blog2.png" alt="" />
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="bi bi-calendar-check-fill"></i> December 14, 2024</span>
                                </div>
                                <Link to="/blog-details">How to Secure your facebook Business Account </Link>
                            </div>
                            <div className="blog-buttom">
                                <div className="blog-author">
                                    <span><i className="bi bi-person-circle"></i>By Admin </span>
                                </div>
                                <div className="blog-button">
                                    <Link to="/blog-grid">Read More<i className="bi bi-arrow-right-short"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-box">
                            <div className="blog-thumb">
                                <img src="/assets/images/home-1/blog3.png" alt="" />
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="bi bi-calendar-check-fill"></i> December 14, 2024</span>
                                </div>
                                <Link to="/blog-details">Better Context Menus With Safe Triangles</Link>
                            </div>
                            <div className="blog-buttom">
                                <div className="blog-author">
                                    <span><i className="bi bi-person-circle"></i>By Admin </span>
                                </div>
                                <div className="blog-button">
                                    <Link to="/blog-grid">Read More<i className="bi bi-arrow-right-short"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogArea;
