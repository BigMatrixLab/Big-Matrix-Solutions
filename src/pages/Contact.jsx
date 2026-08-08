import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHead from '../components/SectionHead';

const SUBJECTS = [
    { value: 'research', label: 'Research collaboration' },
    { value: 'software', label: 'Software solutions' },
    { value: 'consulting', label: 'AI consulting' },
    { value: 'partnership', label: 'Partnership inquiry' },
    { value: 'other', label: 'Something else' },
];

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
        value: 'ratimshariar@gmail.com',
        href: 'mailto:ratimshariar@gmail.com',
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const subject = `Contact Form - ${formData.subject || 'General Inquiry'}`;
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

                                <p className="bm-field">
                                    <label htmlFor="contact-subject">What is it about?</label>
                                    <select
                                        id="contact-subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a topic</option>
                                        {SUBJECTS.map((item) => (
                                            <option value={item.value} key={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </p>

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
