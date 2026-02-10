import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const Blog = () => {
    const blogPosts = [
        { title: "Solution This Business For is Marketing Blog", admin: "Mera", comments: "04", image: "/assets/images/inner-images/blog-1.jpg", category: "Cyber Security", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
        { title: "Easy and Most Powerful Server and Platform.", admin: "Mera", comments: "04", image: "/assets/images/inner-images/blog-2.jpg", category: "Marketing", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
        { title: "In eu fringilla, accumsan purusvel sollicitudin.", admin: "Mera", comments: "04", image: "/assets/images/inner-images/blog-3.jpg", category: "Software", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
        { title: "Vivamus vehicula nl purus at eros interdum.", admin: "Mera", comments: "04", image: "/assets/images/inner-images/blog-4.jpg", category: "Android", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
        { title: "Optimizing IT Infrastructure for Cost Efficiency.", admin: "Mera", comments: "04", image: "/assets/images/inner-images/blog-5.jpg", category: "UI Design", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
        { title: "Business Rules of Running to Web Solution.", admin: "Mera", comments: "04", image: "/assets/images/inner-images/blog-6.jpg", category: "Solutions", desc: "Monotonectally granular to front markets task data semper maecenas ferform" },
    ];

    return (
        <>
            <Breadcrumb pageTitle="Blog Grid" breadcrumbItem="Blog" />

            {/* Blog Grid Area */}
            <div className="blog-grid-area">
                <div className="container">
                    <div className="row">
                        {blogPosts.map((post, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="single-blog-box">
                                    <div className="blog-thumb">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span>Admin: {post.admin}</span>
                                            <span>Comments ({post.comments})</span>
                                        </div>
                                        <div className="blog-title">
                                            <a href="#">{post.title}</a>
                                            <p>{post.desc}</p>
                                        </div>
                                        <div className="blog-button">
                                            <a href="#"><i className="fa-solid fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                    <div className="blog-category">
                                        <a href="#">{post.category}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default Blog;
