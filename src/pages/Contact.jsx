import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';
import Seo from '../components/Seo';

const SUBJECTS = [
    { value: 'research', label: 'Research collaboration' },
    { value: 'software', label: 'Software solutions' },
    { value: 'consulting', label: 'AI consulting' },
    { value: 'partnership', label: 'Partnership inquiry' },
    { value: 'other', label: 'Something else' },
];

const TopicSelect = ({ value, onChange, invalid }) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const selected = SUBJECTS.find((item) => item.value === value);

    useEffect(() => {
        if (!open) return undefined;

        const closeOutside = (event) => {
            if (!rootRef.current?.contains(event.target)) setOpen(false);
        };

        document.addEventListener('pointerdown', closeOutside);
        return () => document.removeEventListener('pointerdown', closeOutside);
    }, [open]);

    const show = () => {
        const selectedIndex = SUBJECTS.findIndex((item) => item.value === value);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        setOpen(true);
    };

    const choose = (item) => {
        onChange(item.value);
        setOpen(false);
        triggerRef.current?.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!open) {
                show();
                return;
            }
            const step = event.key === 'ArrowDown' ? 1 : -1;
            setActiveIndex((current) =>
                (current + step + SUBJECTS.length) % SUBJECTS.length
            );
            return;
        }

        if (event.key === 'Home' || event.key === 'End') {
            if (!open) return;
            event.preventDefault();
            setActiveIndex(event.key === 'Home' ? 0 : SUBJECTS.length - 1);
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (open) choose(SUBJECTS[activeIndex]);
            else show();
            return;
        }

        if (event.key === 'Escape' && open) {
            event.preventDefault();
            setOpen(false);
        }
    };

    return (
        <div className={`bm-select${open ? ' is-open' : ''}${invalid ? ' is-invalid' : ''}`} ref={rootRef}>
            <button
                id="contact-subject"
                ref={triggerRef}
                type="button"
                className="bm-select__trigger"
                role="combobox"
                aria-controls="contact-subject-options"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-activedescendant={open ? `contact-subject-${SUBJECTS[activeIndex].value}` : undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? 'contact-subject-error' : undefined}
                onClick={() => (open ? setOpen(false) : show())}
                onKeyDown={handleKeyDown}
            >
                <span className={selected ? undefined : 'is-placeholder'}>
                    {selected?.label || 'Select a topic'}
                </span>
                <i className="bi bi-chevron-down" aria-hidden="true"></i>
            </button>

            {open && (
                <div
                    id="contact-subject-options"
                    className="bm-select__content"
                    role="listbox"
                    aria-label="Contact topic"
                >
                    {SUBJECTS.map((item, index) => (
                        <button
                            id={`contact-subject-${item.value}`}
                            type="button"
                            role="option"
                            aria-selected={item.value === value}
                            className={`bm-select__option${index === activeIndex ? ' is-active' : ''}`}
                            key={item.value}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => choose(item)}
                        >
                            <span>{item.label}</span>
                            {item.value === value && (
                                <i className="bi bi-check2" aria-hidden="true"></i>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {invalid && (
                <small className="bm-field__error" id="contact-subject-error">
                    Select a topic to continue.
                </small>
            )}
        </div>
    );
};

const DIRECT_LINES = [
    {
        icon: 'bi bi-telephone-fill',
        label: 'Call us',
        value: '+880 1339 870730',
        href: 'tel:+8801339870730',
    },
    {
        icon: 'bi bi-envelope-fill',
        label: 'Email',
        value: 'contact@big-matrix.com',
        href: 'mailto:contact@big-matrix.com',
    },
    {
        icon: 'bi bi-geo-alt-fill',
        label: 'Registered office',
        value: 'Section# 11, Block# A, Mainroad# 3, Plot# 10, Pallabi, Mirpur, Dhaka - 1216, Bangladesh',
    },
    {
        icon: 'bi bi-clock-fill',
        label: 'Office hours',
        value: '9:00 AM – 5:00 PM, Sun to Thu',
    },
];

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

const FALLBACK_EMAIL = 'contact@big-matrix.com';

const Contact = () => {
    const [formData, setFormData] = useState(EMPTY);
    const [subjectInvalid, setSubjectInvalid] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    /* Scripts submit the moment the page parses. The endpoint discards anything
       returned faster than a person could plausibly type, so it needs to know
       when the form appeared. */
    const mountedAt = useRef(Date.now());
    const honeypotRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setStatus(null);
    };

    const handleSubjectChange = (value) => {
        setFormData((prev) => ({ ...prev, subject: value }));
        setSubjectInvalid(false);
        setStatus(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (submitting) return;

        // The custom combobox is not a real form control, so `required` cannot
        // cover it — the browser validates the other four fields for us.
        if (!formData.subject) {
            setSubjectInvalid(true);
            document.getElementById('contact-subject')?.focus();
            return;
        }

        setSubmitting(true);
        setStatus(null);

        try {
            /* Mail is sent by /functions/api/contact.js. It has to be a server
               call: the Mailtrap token cannot ship to the browser. */
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    company_website: honeypotRef.current?.value || '',
                    elapsed: Date.now() - mountedAt.current,
                }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.ok) {
                if (result.field === 'subject') setSubjectInvalid(true);
                setStatus({
                    type: 'error',
                    message:
                        result.error ||
                        `Something went wrong at our end. Please try again, or email ${FALLBACK_EMAIL}.`,
                });
                if (result.field) {
                    document.getElementById(`contact-${result.field}`)?.focus();
                }
                return;
            }

            setFormData(EMPTY);
            mountedAt.current = Date.now();
            setStatus({
                type: 'success',
                message:
                    'Thanks — your message is with the engineering team. A confirmation is on its way to your inbox, and we will reply within one business day.',
            });
        } catch {
            // Offline, DNS failure, blocked request: nothing the visitor can fix
            // by resubmitting, so hand them the direct address.
            setStatus({
                type: 'error',
                message: `We could not reach the server. Check your connection, or email us at ${FALLBACK_EMAIL}.`,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Seo
                title="Contact"
                description="Talk to the engineering team. Tell us the constraints and we will map them to an architecture."
                path="/contact"
            />
            <Breadcrumb pageTitle="Talk to the engineering team" breadcrumbItem="Contact" />

            <section className="bm-section">
                <div className="bm-container">
                    <SectionHead
                        eyebrow="Get in touch"
                        title="Tell us what you are building"
                        lead="Send the problem rather than a specification. We will come back with an architecture, a delivery plan and a realistic timeline — usually within one business day."
                    />

                    <div className="bm-contact">
                        <form
                            className="bm-form"
                            onSubmit={handleSubmit}
                            noValidate={false}
                            aria-busy={submitting || undefined}
                        >
                            <div className="bm-form__grid">
                                <p className="bm-field">
                                    <label htmlFor="contact-name">Your name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="Jane Rahman"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </p>

                                <p className="bm-field">
                                    <label htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="you@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </p>

                                <p className="bm-field">
                                    <label htmlFor="contact-phone">Phone</label>
                                    <input
                                        id="contact-phone"
                                        type="tel"
                                        name="phone"
                                        autoComplete="tel"
                                        placeholder="+880 …"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </p>

                                <div className="bm-field">
                                    <label htmlFor="contact-subject">What is it about?</label>
                                    <TopicSelect
                                        value={formData.subject}
                                        onChange={handleSubjectChange}
                                        invalid={subjectInvalid}
                                    />
                                </div>

                                <p className="bm-field bm-field--wide">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={6}
                                        placeholder="What are you trying to build, and what is in the way?"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </p>
                            </div>

                            {/* Honeypot. Positioned off-screen rather than
                                display:none, because plenty of bots skip hidden
                                inputs but fill anything with a tempting name.
                                A non-empty value makes the server drop the
                                submission silently. */}
                            <div className="bm-form__trap" aria-hidden="true">
                                <label htmlFor="contact-company-website">Company website</label>
                                <input
                                    id="contact-company-website"
                                    ref={honeypotRef}
                                    type="text"
                                    name="company_website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="bm-form__foot">
                                <button
                                    type="submit"
                                    className="bm-button"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Sending' : 'Send message'}
                                    {submitting ? (
                                        <span
                                            className="bm-button__spinner"
                                            aria-hidden="true"
                                        ></span>
                                    ) : (
                                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                    )}
                                </button>

                                {/* Rendered even when empty so the live region
                                    exists before there is anything to announce;
                                    CSS collapses it while it has no content. */}
                                <p
                                    className={`bm-form__status${status ? ` is-${status.type}` : ''}`}
                                    role="status"
                                    aria-live="polite"
                                >
                                    {status?.message}
                                </p>
                            </div>
                        </form>

                        <aside className="bm-contact__aside">
                            <p className="bm-contact__label">Direct lines</p>
                            <ul className="bm-contact__lines">
                                {DIRECT_LINES.map((line) => (
                                    <li key={line.label}>
                                        <span className="bm-contact__icon">
                                            <i className={line.icon} aria-hidden="true"></i>
                                        </span>
                                        <span className="bm-contact__text">
                                            <small>{line.label}</small>
                                            {line.href ? (
                                                <a href={line.href}>{line.value}</a>
                                            ) : (
                                                <strong>{line.value}</strong>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="bm-section bm-section--warm bm-map">
                <div className="bm-container">
                    <SectionHead eyebrow="Find us" title="Pallabi, Mirpur, Dhaka" />
                    <div className="bm-map__frame">
                        <iframe
                            title="Big-Matrix Solutions office location"
                            src="https://maps.google.com/maps?q=Section%2011%2C%20Block%20A%2C%20Main%20Road%203%2C%20Pallabi%2C%20Mirpur%2C%20Dhaka%201216&z=16&output=embed"
                            loading="lazy"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
