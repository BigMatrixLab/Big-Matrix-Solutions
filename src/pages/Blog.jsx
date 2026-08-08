import React from 'react';
import { blogsData } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';

const Blog = () => {
    return (
        <>
            <Breadcrumb
                pageTitle="Insights from the engineering floor"
                breadcrumbItem="Insights"
            />

            {/* Blog Grid Area */}
            <div className="blog-grid-area blog-page-py-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-title left inner-style">
                                <h2>Latest posts</h2>
                                <h1>Writing and research</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bm-grid">
                        {blogsData.map((post) => (
                            <BlogCard post={post} key={post.id} />
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Blog;
