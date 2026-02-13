import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import blogsData from '../data/blogs.json';

const BlogDetails = () => {
    const { slug } = useParams();
    const post = blogsData.find(b => b.slug === slug);
    const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' });

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

    const popularPosts = blogsData.slice(0, 3);
    const categories = [...new Set(blogsData.map(b => b.category))];
    const tags = ['Client Story', 'Learning', 'Software', 'Development', 'Marketing', 'Technology'];

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        console.log('Comment submitted:', commentForm);
        setCommentForm({ name: '', email: '', comment: '' });
    };

    return (
        <>
            <Breadcrumb pageTitle={post.title} breadcrumbItem="Blog" />

            <div className="blog-details-area">
                <div className="container">
                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="blog-details-box">
                                <div className="blog-details-thumb">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="blog-details-content">
                                    <div className="blog-meta">
                                        <span><i className="bi bi-person-circle"></i> By {post.admin}</span>
                                        <span><i className="bi bi-calendar-check"></i> {post.date}</span>
                                        <span><i className="bi bi-chat-dots"></i> {post.comments} Comments</span>
                                    </div>
                                    <h2 className="blog-details-title">{post.title}</h2>
                                    <p className="blog-details-desc">{post.desc}</p>
                                    <p className="blog-details-desc">{post.content}</p>

                                    <div className="blog-quote">
                                        <i className="bi bi-quote"></i>
                                        <p>Competently architect internationalized deliverables client niches continually underwhelm build media-growth strategies whereas pandemic.</p>
                                        <span>— CEO & Founder</span>
                                    </div>

                                    <h3>Our Begin Now To Banquet</h3>
                                    <p className="blog-details-desc">Dynamically reinvent leading-edge value via pandemic manufactured products. Competently mesh client-based partnerships. Professionally mesh high-quality partnerships.</p>

                                    <ul className="blog-list">
                                        <li><i className="bi bi-check-circle-fill"></i> Premium advisory service</li>
                                        <li><i className="bi bi-check-circle-fill"></i> Product and resource scaling</li>
                                        <li><i className="bi bi-check-circle-fill"></i> Proactively unleash oriented communities</li>
                                        <li><i className="bi bi-check-circle-fill"></i> Credibly develop progressive archi</li>
                                    </ul>

                                    <div className="row my-4">
                                        <div className="col-md-6">
                                            <div className="blog-details-image">
                                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Team collaboration" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-details-image">
                                                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600" alt="Business meeting" />
                                            </div>
                                        </div>
                                    </div>

                                    <h3>Arca At Mauris Facilisis Fermentum</h3>
                                    <p className="blog-details-desc">Progressively target highly efficient business via distributed manufactured products. Globally utilize other virtual networks via end-to-end sharing. Conveniently utilize technically sound networks via professional.</p>

                                    <div className="blog-details-footer">
                                        <div className="blog-tags">
                                            <span>Digital Marketing</span>
                                            <span>Development</span>
                                        </div>
                                        <div className="blog-share">
                                            <a href="#" className="share-icon"><i className="bi bi-facebook"></i></a>
                                            <a href="#" className="share-icon"><i className="bi bi-twitter"></i></a>
                                            <a href="#" className="share-icon"><i className="bi bi-linkedin"></i></a>
                                            <a href="#" className="share-icon"><i className="bi bi-pinterest"></i></a>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="blog-comments-section">
                                    <h3><i className="bi bi-chat-left-text"></i> 2 Comments</h3>

                                    <div className="comment-item">
                                        <div className="comment-avatar">
                                            <img src="https://ui-avatars.com/api/?name=Michael+James&background=0c5adb&color=fff" alt="Michael James" />
                                        </div>
                                        <div className="comment-content">
                                            <div className="comment-header">
                                                <h5>Michael James</h5>
                                                <span className="comment-date">22 August, 2024</span>
                                                <button className="comment-reply">Reply</button>
                                            </div>
                                            <p>Ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum rhoncus, dolor eget viverra pretium, dolor tellus aliquet nunc, vitae ultricies erat elit eu lacus.</p>
                                        </div>
                                    </div>

                                    <div className="comment-item">
                                        <div className="comment-avatar">
                                            <img src="https://ui-avatars.com/api/?name=Javan+Elias&background=f3297c&color=fff" alt="Javan Elias" />
                                        </div>
                                        <div className="comment-content">
                                            <div className="comment-header">
                                                <h5>Javan Elias</h5>
                                                <span className="comment-date">22 August, 2024</span>
                                                <button className="comment-reply">Reply</button>
                                            </div>
                                            <p>Ut et dui nulla. Nunc nec mauris lectus sit amet. Suspendisse eros mauris, consequat a sapien et, ultricies malesuada elit. Sed placerat elit quis sapien et.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Comment Form */}
                                <div className="blog-comment-form">
                                    <h3>Leave A Comments</h3>
                                    <form onSubmit={handleCommentSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    placeholder="Your Name*"
                                                    value={commentForm.name}
                                                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address*"
                                                    value={commentForm.email}
                                                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea
                                                    placeholder="Write Comments..."
                                                    rows="5"
                                                    value={commentForm.comment}
                                                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" type="checkbox" id="saveInfo" />
                                                    <label className="form-check-label" htmlFor="saveInfo">
                                                        Save my name, email address in this browser for next time I post a comment.
                                                    </label>
                                                </div>
                                                <button type="submit" className="btn btn-primary">POST COMMENTS</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            {/* Search Widget */}
                            <div className="widget-box">
                                <div className="widget-search">
                                    <form>
                                        <input type="text" placeholder="Search Here" />
                                        <button type="submit"><i className="bi bi-search"></i></button>
                                    </form>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="widget-box">
                                <h4 className="widget-title">Categories</h4>
                                <ul className="widget-categories">
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <Link to="/blog">
                                                <i className="bi bi-folder"></i> {cat}
                                                <span>({blogsData.filter(b => b.category === cat).length})</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Popular Posts Widget */}
                            <div className="widget-box">
                                <h4 className="widget-title">Popular Post</h4>
                                <div className="widget-popular-posts">
                                    {popularPosts.map((popularPost) => (
                                        <div className="popular-post-item" key={popularPost.id}>
                                            <div className="popular-post-thumb">
                                                <img src={popularPost.image} alt={popularPost.title} />
                                            </div>
                                            <div className="popular-post-content">
                                                <Link to={`/blog/${popularPost.slug}`}>{popularPost.title}</Link>
                                                <span className="popular-post-date"><i className="bi bi-calendar3"></i> {popularPost.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags Widget */}
                            <div className="widget-box">
                                <h4 className="widget-title">Tags</h4>
                                <div className="widget-tags">
                                    {tags.map((tag, idx) => (
                                        <Link to="/blog" key={idx} className="tag-item">{tag}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
