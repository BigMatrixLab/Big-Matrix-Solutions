import React from 'react';
import blogsData from '../data/blogs.json';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';

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
