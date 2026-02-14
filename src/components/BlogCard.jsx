import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    return (
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
                    <Link to={`/blog/${post.slug}`}>
                        Learn More
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
            <div className="blog-category">
                <Link to={`/blog/${post.slug}`}>{post.category}</Link>
            </div>
        </div>
    );
};

export default BlogCard;
