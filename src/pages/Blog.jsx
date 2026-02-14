import React from 'react';
import blogsData from '../data/blogs.json';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';

const Blog = () => {
    return (
        <>
            <Breadcrumb pageTitle="Blog Grid" breadcrumbItem="Blog" />

            {/* Blog Grid Area */}
            <div className="blog-grid-area" style={{paddingTop: "50px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                 <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Latest Blog</h2>
                                <h1>Similar Blog Posts</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {blogsData.map((post) => (
                            <div className="col-lg-4 col-md-6 mb-4 d-flex" key={post.id}>
                                <BlogCard post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Blog;
