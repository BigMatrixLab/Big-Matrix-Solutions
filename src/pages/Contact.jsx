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
        label: 'Office',
        value: 'Bashundhara R/A, Dhaka 1229, Bangladesh',
    },
    {
        icon: 'bi bi-clock-fill',
        label: 'Office hours',
        value: '9:00 AM – 5:00 PM, Sun to Thu',
    },
];

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
    const [formData, setFormData] = useState(EMPTY);
    const [subjectInvalid, setSubjectInvalid] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (value) => {
        setFormData((prev) => ({ ...prev, subject: value }));
        setSubjectInvalid(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.subject) {
            setSubjectInvalid(true);
            document.getElementById('contact-subject')?.focus();
            return;
        }

        const subject = `Contact Form - ${formData.subject}`;
        const body =
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n` +
            `Subject: ${formData.subject}\n\n` +
            `Message:\n${formData.message}`;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=monirresearchlab@gmail.com&su=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
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
                        <form className="bm-form" onSubmit={handleSubmit} noValidate={false}>
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

                            <div className="bm-form__foot">
                                <button type="submit" className="bm-button">
                                    Send message
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </button>
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
                    <SectionHead eyebrow="Find us" title="Bashundhara R/A, Dhaka" />
                    <div className="bm-map__frame">
                        <iframe
                            title="Big-Matrix Solutions office location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0980914516545!2d90.4255566!3d23.815110699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64c103a8093%3A0xd660a4f50365294a!2sNorth%20South%20University!5e0!3m2!1sen!2sbd!4v1770986969556!5m2!1sen!2sbd"
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
