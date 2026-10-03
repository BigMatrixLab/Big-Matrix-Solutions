import React from 'react';
import useBodyScrollLock from '../utils/useBodyScrollLock';
import ShareButtons from './ShareButtons';
import BlogThumb from './BlogThumb';

/**
 * "Share this article" sheet: the post being shared and the share targets.
 * Each target carries the caption and link on its own, so there is nothing to
 * copy by hand. Renders nothing until a post is passed in.
 *
 * `preview` shows the post as a card: wanted on the index, where the dialog is
 * opened from a list, and redundant on the article page itself.
 */
const ShareDialog = ({ post, onClose, preview = false }) => {
    useBodyScrollLock(Boolean(post));

    if (!post) return null;

    return (
        <div
            className="bm-share-dialog"
            role="presentation"
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            onKeyDown={(event) => {
                if (event.key === 'Escape') onClose();
            }}
        >
            <div className="bm-share-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="share-dialog-title">
                <div className="bm-share-dialog__head">
                    <div>
                        <p className="bm-head__eyebrow">Share</p>
                        <h2 className="bm-share-dialog__title" id="share-dialog-title">Share this article</h2>
                    </div>
                    <button type="button" className="bm-share__btn" onClick={onClose} aria-label="Close share dialog" autoFocus>
                        <i className="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="bm-share-dialog__body">
                    {/* Always shown, never timed out, so the sheet keeps one height. */}
                    <p className="bm-preview-note">
                        <i className="bi bi-check-circle" aria-hidden="true"></i>
                        A caption with the link goes with every share. LinkedIn and X fill it in; for
                        Facebook and Instagram it is already copied, so just paste.
                    </p>

                    {preview ? (
                        <div className="bm-share-dialog__post">
                            <BlogThumb src={post.image} />
                            <div>
                                <div className="bm-card__meta">
                                    {post.category && <span>{post.category}</span>}
                                    {post.date && <span>{post.date}</span>}
                                </div>
                                <h3 className="bm-card__title">{post.title}</h3>
                                {post.desc && <p className="bm-card__text">{post.desc}</p>}
                            </div>
                        </div>
                    ) : (
                        <p className="bm-share-dialog__lead">{post.title}</p>
                    )}

                    <p className="bm-doc__index-label">Share to</p>
                    <ShareButtons post={post} />
                </div>

                <div className="bm-share-dialog__foot">
                    <button type="button" onClick={onClose} className="bm-button">
                        Done
                        <i className="bi bi-check2" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareDialog;
