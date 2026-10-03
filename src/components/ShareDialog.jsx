import React, { useState } from 'react';
import useBodyScrollLock from '../utils/useBodyScrollLock';
import ShareButtons from './ShareButtons';
import { copyText, shareCaption } from '../utils/share';

/**
 * "Share this article" sheet: the post being shared, an editable caption, and
 * the share targets. Renders nothing until a post is passed in.
 *
 * `preview` shows the post as a card: wanted on the index, where the dialog is
 * opened from a list, and redundant on the article page itself.
 */
const ShareDialog = ({ post, copied, onClose, preview = false }) => {
    useBodyScrollLock(Boolean(post));

    if (!post) return null;

    // Keyed by post so the caption starts fresh for each post opened.
    return <SharePanel key={post.slug} post={post} copied={copied} onClose={onClose} preview={preview} />;
};

const SharePanel = ({ post, copied, onClose, preview }) => {
    const [caption, setCaption] = useState(() => shareCaption(post));
    const [note, setNote] = useState('');

    const copyCaption = () => {
        setNote(copyText(caption) ? 'Caption copied.' : 'Copy failed — select the text and copy it.');
    };

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
                    {copied && (
                        <p className="bm-preview-note">
                            <i className="bi bi-check-circle" aria-hidden="true"></i>
                            Share caption copied to clipboard.
                        </p>
                    )}

                    {preview ? (
                        <div className="bm-share-dialog__post">
                            <img src={post.image} alt="" loading="lazy" />
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

                    <div className="bm-share-dialog__caption">
                        <div className="bm-share-dialog__caption-head">
                            <label className="bm-doc__index-label" htmlFor="share-caption">Caption</label>
                            <button type="button" className="bm-link bm-link--button" onClick={copyCaption}>
                                Copy caption
                                <i className="bi bi-clipboard" aria-hidden="true"></i>
                            </button>
                        </div>
                        <textarea
                            id="share-caption"
                            className="bm-share-dialog__textarea"
                            rows={7}
                            value={caption}
                            onChange={(event) => setCaption(event.target.value)}
                        />
                        <p className="bm-share__status" aria-live="polite">
                            {note || 'Edit before sharing. LinkedIn and X fill it in for you; for Facebook and Instagram it is copied, so paste it into the post.'}
                        </p>
                    </div>

                    <p className="bm-doc__index-label">Share to</p>
                    <ShareButtons post={post} caption={caption} />
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
