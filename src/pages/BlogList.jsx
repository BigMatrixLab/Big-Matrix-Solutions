import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const BlogList = () => {
    const blogPosts = [
        { title: "Solution This Business For is Marketing Blog", admin: "Mera", date: "20 March, 2024", comments: "04", image: "/assets/images/inner-images/blog-1.jpg", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
        { title: "Easy and Most Powerful Server and Platform.", admin: "Mera", date: "15 March, 2024", comments: "02", image: "/assets/images/inner-images/blog-2.jpg", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
    ];

    return (
        <>
            <Breadcrumb pageTitle="Blog List" breadcrumbItem="Blog" />

            <div className="blog-list-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {blogPosts.map((post, index) => (
                                <div className="single-blog-list-box" key={index}>
                                    <div className="blog-list-thumb">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="blog-list-content">
                                        <div className="blog-meta">
                                            <span><i className="bi bi-person"></i>By {post.admin}</span>
                                            <span><i className="bi bi-calendar3"></i>{post.date}</span>
                                            <span><i className="bi bi-chat-left-text"></i>{post.comments} Comments</span>
                                        </div>
                                        <h4 className="blog-list-title"><a href="/blog-details">{post.title}</a></h4>
                                        <p className="blog-list-desc">{post.desc}</p>
                                        <div className="blog-list-button">
                                            <a href="/blog-details">Read More <i className="bi bi-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4">
                            <div className="widget-sidber">
                                <form action="#" className="widget-sidber-search-box">
                                    <input type="text" placeholder="Search..." />
                                    <button type="submit"><i className="bi bi-search"></i></button>
                                </form>
                            </div>
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

export default BlogList;
