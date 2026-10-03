import React, { useRef, useState } from 'react';
import {
    blogShareUrl,
    copyText,
    shareOnFacebook,
    shareOnInstagram,
    shareOnLinkedIn,
    shareOnX,
} from '../utils/share';

/** The bundled Bootstrap Icons predate the X rebrand, so the mark is inline. */
export const XIcon = () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TARGETS = [
    { id: 'facebook', label: 'Share on Facebook', icon: <i className="bi bi-facebook" aria-hidden="true"></i> },
    { id: 'linkedin', label: 'Share on LinkedIn', icon: <i className="bi bi-linkedin" aria-hidden="true"></i> },
    { id: 'x', label: 'Share on X', icon: <XIcon /> },
    { id: 'instagram', label: 'Copy caption and open Instagram', icon: <i className="bi bi-instagram" aria-hidden="true"></i> },
    { id: 'link', label: 'Copy link', icon: <i className="bi bi-link-45deg" aria-hidden="true"></i> },
];

/**
 * One-click share targets for a post, in the site's square icon-button style.
 * `caption` overrides the default (the share dialog lets it be edited). The
 * status line says where the caption went, since Facebook and Instagram only
 * get it through the clipboard.
 */
const ShareButtons = ({ post, caption, onOpenDialog }) => {
    const [status, setStatus] = useState('');
    const timer = useRef(null);

    const flash = (message) => {
        setStatus(message);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setStatus(''), 4000);
    };

    const copyLink = () => {
        flash(copyText(blogShareUrl(post)) ? 'Link copied.' : 'Copy failed — select the address bar instead.');
    };

    const share = (id) => {
        switch (id) {
            case 'facebook':
                shareOnFacebook(post, caption);
                flash('Caption copied — press Ctrl+V (⌘V on Mac) in your Facebook post.');
                break;
            case 'linkedin':
                shareOnLinkedIn(post, caption);
                flash('Caption added to your LinkedIn post. It is on your clipboard too.');
                break;
            case 'x':
                shareOnX(post, caption);
                break;
            case 'instagram':
                shareOnInstagram(post, caption);
                flash('Caption copied — paste it into your Instagram post.');
                break;
            default:
                copyLink();
        }
    };

    return (
        <div className="bm-share">
            <ul className="bm-share__list">
                {TARGETS.map((target) => (
                    <li key={target.id}>
                        <button type="button" className="bm-share__btn" onClick={() => share(target.id)} aria-label={target.label} title={target.label}>
                            {target.icon}
                        </button>
                    </li>
                ))}
                {onOpenDialog && (
                    <li>
                        <button type="button" className="bm-share__btn" onClick={onOpenDialog} aria-label="More share options" title="More share options">
                            <i className="bi bi-share" aria-hidden="true"></i>
                        </button>
                    </li>
                )}
            </ul>
            <p className="bm-share__status" aria-live="polite">{status}</p>
        </div>
    );
};

export default ShareButtons;
