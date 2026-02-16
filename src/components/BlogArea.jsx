import React from 'react';
import { Link } from 'react-router-dom';
import blogsData from '../data/blogs.json';
import BlogCard from './BlogCard';

const BlogArea = () => {
    return (
        <div className="blog-grid-area" style={{ background: '#F3F8FC', padding: '0px 0 105px' }}>
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
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogArea;
