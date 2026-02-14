import React from 'react';
import { Link } from 'react-router-dom';
import blogsData from '../data/blogs.json';

const BlogArea = () => {
    return (
        <div className="blog-area style-one home-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                           <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Latest Blogs</h2>
                            <h1>Latest Insights From Our Blog</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {blogsData.slice(0, 3).map((post) => (
                        <div className="col-lg-4 col-md-6 mb-4 d-flex" key={post.id}>
                            <div className="single-blog-box">
                                <div className="blog-thumb">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span><i className="bi bi-calendar-check-fill"></i> {post.date}</span>
                                    </div>
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </div>
                                <div className="blog-buttom">
                                    <div className="blog-button">
                                        <Link to={`/blog/${post.slug}`}>Read More<i className="bi bi-arrow-right-short"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogArea;
