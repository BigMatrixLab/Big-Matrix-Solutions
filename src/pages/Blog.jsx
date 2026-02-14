import React from 'react';
import blogsData from '../data/blogs.json';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Blog = () => {
    return (
        <>
            <Breadcrumb pageTitle="Blog Grid" breadcrumbItem="Blog" />

            {/* Blog Grid Area */}
            <div className="blog-grid-area">
                <div className="container">
                    <div className="row">
                        {blogsData.map((post) => (
                            <div className="col-lg-4 col-md-6 mb-4 d-flex" key={post.id}>
                                <div className="single-blog-box">
                                    <div className="blog-thumb">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="blog-title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                            <p>{post.desc}</p>
                                        </div>
                                        <div className="blog-button">
                                            <Link to={`/blog/${post.slug}`}><i className="fa-solid fa-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                    <div className="blog-category">
                                        <Link to={`/blog/${post.slug}`}>{post.category}</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Blog;
