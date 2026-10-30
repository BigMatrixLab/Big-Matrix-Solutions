import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ANNOUNCEMENT } from '../data/announcement';
import { useTheme } from '../context/themeStore';
import useBodyScrollLock from '../utils/useBodyScrollLock';

/**
 * Site-wide announcement. A first-time visitor gets the pop-up; once it has been
 * seen or closed, every page shows the slim bar above the navigation instead.
 * The bar can be closed for the rest of the session. Content lives in
 * data/announcement.js.
 *
 * Storage can be unavailable (private windows, blocked site data), so every
 * read and write is guarded; without it the pop-up simply shows once per load.
 */
const seenKey = `bm:announce:${ANNOUNCEMENT.id}:seen`;
const barKey = `bm:announce:${ANNOUNCEMENT.id}:bar-closed`;

const read = (store, key) => {
    try { return window[store].getItem(key) === '1'; } catch { return false; }
};
const write = (store, key) => {
    try { window[store].setItem(key, '1'); } catch { /* storage unavailable */ }
};

const Badge = ({ className }) => {
    const { isDark } = useTheme();
    const src = isDark ? ANNOUNCEMENT.badge.dark : ANNOUNCEMENT.badge.light;
    if (!src) return null;
    return <img className={className} src={src} alt="NVIDIA Inception Program member badge" />;
};

const Announcement = () => {
    const { pathname } = useLocation();
    const onPost = pathname === ANNOUNCEMENT.to;
    const [modalOpen, setModalOpen] = useState(false);
    const [seenStored, setSeen] = useState(() => read('localStorage', seenKey));
    // Reading the announcement itself counts as having seen the pop-up.
    const seen = seenStored || onPost;
    const [barClosed, setBarClosed] = useState(() => read('sessionStorage', barKey));
    const panelRef = useRef(null);
    const returnFocus = useRef(null);

    useEffect(() => {
        if (onPost) write('localStorage', seenKey);
    }, [onPost]);

    // First visit: open the pop-up after a short pause.
    useEffect(() => {
        if (!ANNOUNCEMENT.active || seen || onPost) return undefined;
        const timer = window.setTimeout(() => {
            returnFocus.current = document.activeElement;
            setModalOpen(true);
        }, ANNOUNCEMENT.delayMs);
        return () => window.clearTimeout(timer);
    }, [seen, onPost]);

    const closeModal = () => {
        write('localStorage', seenKey);
        setSeen(true);
        setModalOpen(false);
        returnFocus.current?.focus?.();
    };

    const closeBar = () => {
        write('sessionStorage', barKey);
        setBarClosed(true);
    };

    useBodyScrollLock(modalOpen);

    // Escape closes; Tab stays inside the pop-up while it is open.
    useEffect(() => {
        if (!modalOpen) return undefined;
        const panel = panelRef.current;
        panel?.querySelector('[data-autofocus]')?.focus();

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
                return;
            }
            if (event.key !== 'Tab' || !panel) return;
            const items = panel.querySelectorAll('a[href], button:not([disabled])');
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [modalOpen]);

    const showBar = ANNOUNCEMENT.active && seen && !modalOpen && !barClosed && !onPost;

    // The bar sits above the fixed navigation; the root class shifts both down.
    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('has-announce', showBar);
        return () => root.classList.remove('has-announce');
    }, [showBar]);

    if (!ANNOUNCEMENT.active) return null;

    const [lead, accent, tail] = ANNOUNCEMENT.title;

    return (
        <>
            {showBar && (
                <div className="bm-announce" role="region" aria-label="Announcement">
                    <div className="bm-container bm-announce__inner">
                        <Link to={ANNOUNCEMENT.to} className="bm-announce__link">
                            <span className="bm-announce__tag">New</span>
                            <span className="bm-announce__text">{ANNOUNCEMENT.bar}</span>
                            <span className="bm-announce__text bm-announce__text--short">{ANNOUNCEMENT.barShort}</span>
                            <span className="bm-announce__more">
                                {ANNOUNCEMENT.barCta}
                                <i className="bi bi-arrow-right" aria-hidden="true"></i>
                            </span>
                        </Link>
                        <button type="button" className="bm-announce__close" onClick={closeBar} aria-label="Hide announcement">
                            <i className="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div
                    className="bm-announce-modal"
                    role="presentation"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) closeModal();
                    }}
                >
                    <div
                        ref={panelRef}
                        className="bm-announce-modal__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="announce-title"
                        aria-describedby="announce-body"
                    >
                        <button type="button" className="bm-announce-modal__close" onClick={closeModal} aria-label="Close" data-autofocus>
                            <i className="bi bi-x-lg" aria-hidden="true"></i>
                        </button>

                        <div className="bm-announce-modal__brand">
                            <img className="bm-announce-modal__logo" src="/assets/images/bm-logo-night.png" alt="Big-Matrix Solutions" />
                            {(ANNOUNCEMENT.badge.light || ANNOUNCEMENT.badge.dark) && (
                                <>
                                    <span className="bm-announce-modal__rule" aria-hidden="true"></span>
                                    <Badge className="bm-announce-modal__badge" />
                                </>
                            )}
                        </div>

                        <div className="bm-announce-modal__body">
                            <p className="bm-head__eyebrow">{ANNOUNCEMENT.eyebrow}</p>
                            <h2 className="bm-announce-modal__title" id="announce-title">
                                {lead} <span className="bm-announce-modal__accent">{accent}</span> {tail}
                            </h2>
                            <p className="bm-announce-modal__text" id="announce-body">{ANNOUNCEMENT.body}</p>
                            <p className="bm-announce-modal__detail">{ANNOUNCEMENT.detail}</p>

                            <div className="bm-announce-modal__actions">
                                <Link to={ANNOUNCEMENT.to} className="bm-button bm-button--accent" onClick={closeModal}>
                                    {ANNOUNCEMENT.cta}
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </Link>
                                <button type="button" className="bm-button bm-button--ghost" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>

                        <p className="bm-announce-modal__legal">{ANNOUNCEMENT.legal}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Announcement;
