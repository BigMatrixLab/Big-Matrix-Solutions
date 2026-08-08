import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => (
    <article className="bm-card">
        <div className="bm-card__media">
            <img src={post.image} alt={post.title} loading="lazy" />
        </div>
        <div className="bm-card__body">
            <div className="bm-card__meta">
                {post.category && <span>{post.category}</span>}
                <span>{post.date}</span>
            </div>
            <h3 className="bm-card__title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className="bm-card__foot">
                <Link to={`/blog/${post.slug}`} className="bm-link">
                    Read post
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
            </div>
        </div>
    </article>
);

export default BlogCard;
