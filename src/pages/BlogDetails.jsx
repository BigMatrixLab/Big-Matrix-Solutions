import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';
import blogsData from '../data/blogs.json';

const BlogDetails = () => {
    const { slug } = useParams();
    const post = blogsData.find(b => b.slug === slug);

    if (!post) {
        return (
            <>
                <Breadcrumb pageTitle="Blog Post Not Found" breadcrumbItem="Blog" />
                <div className="blog-details-area">
                    <div className="container text-center">
                        <h2>Blog post not found</h2>
                        <Link to="/blog" className="btn btn-primary mt-4">Back to Blog</Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb pageTitle={post.title} breadcrumbItem="Blog" />

            <div className="blog-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-thumb">
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className="blog-details-content">
                                <div className="blog-meta">
                                    <span><i className="bi bi-person"></i>By {post.admin}</span>
                                    <span><i className="bi bi-calendar3"></i>{post.date}</span>
                                    <span><i className="bi bi-chat-left-text"></i>{post.comments} Comments</span>
                                </div>
                                <h4 className="blog-details-title">{post.title}</h4>
                                <p className="blog-details-desc">{post.desc}</p>
                                <p className="blog-details-desc">{post.content}</p>

                                <blockquote>
                                    "Monotonectally synergize granular top visualize strategic infomediaries after task state of the art infrastructures digital agency"
                                </blockquote>

                                <p className="blog-details-desc">Competently architect intermandated deliverables client niches continually underwhelm granular meta-services whereas pandemic solutions.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget-sidber">
                                <div className="widget-sidber-content">
                                    <h4>Categories</h4>
                                </div>
                                <div className="widget-category">
                                    <ul>
                                        {[...new Set(blogsData.map(b => b.category))].map((cat, idx) => (
                                            <li key={idx}><Link to="/blog">{cat}<i className="bi bi-arrow-right"></i></Link></li>
                                        ))}
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

export default BlogDetails;
