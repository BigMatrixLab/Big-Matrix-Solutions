import React, { useEffect, useRef, useState } from 'react';
import '../../assets/css/ProjectShowcase.css';

const heroStats = [
    { icon: 'bi bi-hospital',        num: 'All-in-One',  label: 'Appointments, prescriptions, billing, lab, messaging, and AI in one platform' },
    { icon: 'bi bi-capsule',         num: '15,168',      label: 'Brand-name drugs in the searchable prescription catalog' },
    { icon: 'bi bi-people',          num: 'Multi-Role',  label: 'Built for doctors, clinic staff, and patients — each with their own experience' },
    { icon: 'bi bi-globe2',          num: 'Bilingual',   label: 'Full Bangla and English support across public pages and patient portal' },
];

const audienceCards = [
    { icon: 'bi bi-person-badge',    title: 'Doctors',        desc: 'Independent practitioners and specialists who need a modern, paperless practice.' },
    { icon: 'bi bi-building',        title: 'Clinics',        desc: 'Multi-branch practices that share a patient base across multiple locations and cities.' },
    { icon: 'bi bi-headset',         title: 'Support Staff',  desc: 'Receptionists and assistants who manage daily operations on behalf of doctors.' },
    { icon: 'bi bi-person-heart',    title: 'Patients',       desc: 'Anyone who wants to find a doctor, book an appointment, and access their health records online.' },
];

const patientFeatures = [
    { icon: 'bi bi-person-vcard',    title: 'Rich Patient Profiles',     desc: 'Full demographics: name, DOB, gender, blood group, phone, email, NID/passport, address, emergency contacts, and known allergies with severity levels.' },
    { icon: 'bi bi-upc-scan',        title: 'Global MRN',                desc: 'Every patient gets a unique Medical Record Number that persists across clinics and doctors — one identity, everywhere.' },
    { icon: 'bi bi-tags',            title: 'Tags & Filtering',          desc: 'Tag patients (VIP, Chronic, Uninsured, etc.) for instant filtering. Pin important patients to the top of your list.' },
    { icon: 'bi bi-search',          title: 'Powerful Search',           desc: 'Find any patient by name, phone, MRN, email, or NID in seconds.' },
    { icon: 'bi bi-timeline',        title: 'Patient Timeline',          desc: 'Complete history in one view — visits, prescriptions, lab reports, documents, and messages, ordered by date.' },
    { icon: 'bi bi-exclamation-triangle', title: 'Allergies & Deceased', desc: 'Track allergies (mild / moderate / severe / anaphylaxis). Mark patients as deceased with cause and date.' },
];

const appointmentFeatures = [
    { icon: 'bi bi-calendar2-plus',  title: 'Flexible Booking',          desc: 'Walk-in, scheduled, and follow-up appointments for in-person or video consultations. Daily serial numbers assigned automatically per branch.' },
    { icon: 'bi bi-arrow-repeat',    title: 'Full Lifecycle',            desc: 'Booked → Confirmed → Waiting → In Progress → Done, plus Cancelled and No-Show — every state tracked with timestamps.' },
    { icon: 'bi bi-clock',           title: 'Availability Config',       desc: 'Weekly recurring schedules or one-off dates per chamber. Set default duration, daily patient limit, and auto-confirmation preferences.' },
    { icon: 'bi bi-phone',           title: 'Self-Booking & Reminders',  desc: 'Patients self-book from the doctor\'s public page or patient portal. Reminders via SMS, email, WhatsApp, or push notification.' },
];

const prescriptionFeatures = [
    { icon: 'bi bi-capsule-pill',    title: 'Drug Catalog',              desc: '1,592 generic drugs and 15,168 brand names. Add dose, route, frequency, duration, and patient instructions per drug line.' },
    { icon: 'bi bi-shield-exclamation', title: 'Interaction Checking',   desc: 'Drug interaction checking built into the prescription flow — alerts surface before you confirm.' },
    { icon: 'bi bi-bookmark-star',   title: 'Reusable Templates',        desc: 'Save medication combos (e.g. "Asthma Protocol") and instruction note sets (individual or grouped) for repeated use.' },
    { icon: 'bi bi-activity',        title: 'Vitals on Prescription',    desc: 'Record BP, pulse, temperature, weight, height — BMI, BSA, and ideal body weight calculated automatically.' },
    { icon: 'bi bi-file-earmark-pdf', title: 'Instant PDF',              desc: 'Generate PDF prescriptions with custom header (credentials, signature, logo) and footer (hotline). Unique code per record (e.g. RX-00014283-0001).' },
    { icon: 'bi bi-check2-circle',   title: 'Approval Workflow',         desc: 'Staff draft prescriptions; they go live only after the doctor approves. Full audit trail on every change.' },
];

const clinicalFeatures = [
    { icon: 'bi bi-file-medical',    title: 'Medical Certificates',      desc: 'Sick leave, fitness, and referral letters. Set valid dates and rest days. PDF generation with staff-draft / doctor-approve workflow.' },
    { icon: 'bi bi-droplet',         title: 'Chemotherapy Orders',       desc: 'Dedicated chemo protocol module for oncologists. Structured tabular entry for pre/post hydration, pre/post medication, and chemo drugs — mirroring the standard paper form. BSA auto-calculated.' },
    { icon: 'bi bi-clipboard2-pulse', title: 'Lab Orders & Reports',     desc: 'Order from a standard panel library or enter custom tests. Routine / Urgent / STAT priority. Auto-flags individual values as normal, high, low, or critical against age- and sex-specific reference ranges.' },
    { icon: 'bi bi-robot',           title: 'AI Consultation Assistant', desc: 'Pre-visit questionnaires summarised by AI. In-chamber transcription (Bengali or English) with structured clinical summary. All sessions consent-gated.' },
    { icon: 'bi bi-camera-video',    title: 'Video Consultations',       desc: 'Agora-powered video calls launched from the appointment screen. Patients join from a browser — no app needed. Call status tracked: Waiting, Active, Ended.' },
    { icon: 'bi bi-file-earmark-arrow-up', title: 'Medical Documents',   desc: 'Upload any clinical file. AI-powered OCR extracts test results, medications, patient name, date, and impression automatically. Version history and time-limited shareable links.' },
];

const operationsFeatures = [
    { icon: 'bi bi-receipt',         title: 'Billing & Invoicing',       desc: 'Invoices linked to visits. Line items by type (consultation, procedure, lab, pharmacy). Discounts, tax, auto-totals. Payment by cash, card, bKash, Nagad, Rocket, or bank transfer.' },
    { icon: 'bi bi-chat-left-text',  title: 'Messaging',                 desc: 'One-on-one doctor–patient conversations. Staff can participate on behalf of the doctor. Broadcast messages to selected patient groups.' },
    { icon: 'bi bi-geo-alt',         title: 'Multi-Chamber Management',  desc: 'Multiple clinic locations across different cities. Chamber types: Consultation, Chemotherapy Day Care, Radiotherapy & Oncology. Bilingual details and Google Maps link per branch.' },
    { icon: 'bi bi-people-fill',     title: 'Staff Management',          desc: 'Add receptionists and assistants. All their actions (appointments, prescriptions, invoices) require doctor approval. Full staff activity log. Assign staff per branch.' },
    { icon: 'bi bi-check2-all',      title: 'Approvals Screen',          desc: 'One dedicated screen shows all pending staff actions — prescriptions, certificates, invoices, schedule changes. Approve or reject individually with reason.' },
    { icon: 'bi bi-bell',            title: 'Notifications',             desc: 'In-app notification centre for bookings, messages, payments, and lab results. Configurable per channel (in-app, SMS, email, push). Quiet hours and daily digest.' },
];

const portalFeatures = [
    { icon: 'bi bi-calendar-check',  title: 'Appointments',              desc: 'View appointment history and upcoming bookings. Self-book from the doctor\'s public page.' },
    { icon: 'bi bi-file-earmark-text', title: 'Records Access',          desc: 'View prescriptions and lab reports shared by your doctor. Upload your own documents and optionally share them.' },
    { icon: 'bi bi-chat-dots',        title: 'Messaging',                desc: 'Message your doctor directly through the portal.' },
    { icon: 'bi bi-shield-lock',      title: 'Privacy Controls',         desc: 'Three privacy levels: Open, Restricted, or Locked. Grant or revoke access per doctor with optional expiry. Per-record hiding and a full audit log of every access.' },
    { icon: 'bi bi-key',              title: 'OTP-Based Access',         desc: 'When a new doctor requests access to your record, you receive a one-time code — you decide whether to share it.' },
    { icon: 'bi bi-translate',        title: 'Language & Preferences',   desc: 'Toggle between Bengali and English. Manage notification settings from a single profile screen.' },
];

const securityItems = [
    'Email and phone verification for all accounts',
    'Two-factor authentication available',
    'Account lockout after repeated failed login attempts',
    'Every patient data access is logged with timestamp, access type, and consent basis',
    'Soft-delete on all medical records — nothing permanently erased without explicit action',
    'Document sharing links are time-limited and revocable',
    'All IDs use non-guessable UUIDs',
];

const pricingTiers = [
    { name: 'Starter',      best: 'Doctors just getting started',                                    limit: 'Up to 50 patients' },
    { name: 'Professional', best: 'Growing practices — prescriptions, billing, AI, documents',        limit: 'Up to 200 patients' },
    { name: 'Clinic',       best: 'Multi-location — multi-city chambers, team members, analytics',    limit: 'Unlimited patients' },
    { name: 'Enterprise',   best: 'Hospitals & health networks — white-labelling, dedicated infra',   limit: 'Custom pricing' },
];

const ProjectRxCloud = () => {
    const sectionRefs = useRef({});

    const reg = (id) => (el) => { sectionRefs.current[id] = el; };

    return (
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero" id="overview" ref={reg('overview')}>
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-hospital-fill"></i> Clinical Workflow Platform · Bangladesh
                            </span>
                            <h1>RxCloud: One Platform for Every Part of Your Practice</h1>
                            <p className="bc-hero-sub">
                                A cloud-based patient management and clinical workflow platform built for doctors,
                                clinics, and patients in Bangladesh. Appointments, prescriptions, lab reports,
                                billing, messaging, AI assistance, and more — in one place, from any device.
                            </p>
                            <div className="bc-meta">
                                <div className="bc-chip">
                                    <i className="bi bi-code-slash"></i>
                                    <div className="bc-chip-content">
                                        <span className="bc-chip-label">Backend</span>
                                        <span className="bc-chip-value">Django</span>
                                    </div>
                                </div>
                                <div className="bc-chip">
                                    <i className="bi bi-filetype-jsx"></i>
                                    <div className="bc-chip-content">
                                        <span className="bc-chip-label">Frontend</span>
                                        <span className="bc-chip-value">React</span>
                                    </div>
                                </div>
                                <div className="bc-chip">
                                    <i className="bi bi-cloud-check"></i>
                                    <div className="bc-chip-content">
                                        <span className="bc-chip-label">Deployment</span>
                                        <span className="bc-chip-value">Cloud SaaS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <figure className="bc-hero-figure">
                            <img src="/assets/images/projects/RXCloud.png" alt="RxCloud Platform" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-stars"></i>
                                <span>
                                    <strong>Paperless practice</strong>
                                    <span>Built for doctors and patients in Bangladesh</span>
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <div className="bc-stats">
                <div className="bc-container">
                    <div className="bc-stats-grid">
                        {heroStats.map((stat) => (
                            <div className="bc-stat-card" key={stat.num}>
                                <span className="bc-stat-icon"><i className={stat.icon}></i></span>
                                <div className="bc-stat-num">{stat.num}</div>
                                <div className="bc-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Who It's For ── */}
            <section className="bc-section bc-alt">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Who it's for</span>
                        <h2>Built for Everyone in the Practice</h2>
                        <p>RxCloud serves every role in a modern clinic — from the doctor writing prescriptions to the patient checking their results.</p>
                    </div>
                    <div className="bc-grid bc-grid-4">
                        {audienceCards.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Patient Management ── */}
            <section className="bc-section" id="patients" ref={reg('patients')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature Module</span>
                        <h2>Patient Management</h2>
                        <p>A complete patient record system — from registration and search to allergy tracking, tagging, and a full clinical timeline.</p>
                    </div>
                    <div className="bc-grid bc-grid-3">
                        {patientFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Appointments ── */}
            <section className="bc-section bc-alt" id="appointments" ref={reg('appointments')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature Module</span>
                        <h2>Appointments &amp; Scheduling</h2>
                        <p>Walk-in, scheduled, and follow-up bookings with a full lifecycle, configurable availability, self-booking for patients, and multi-channel reminders.</p>
                    </div>
                    <div className="bc-grid bc-grid-4">
                        {appointmentFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Prescriptions ── */}
            <section className="bc-section" id="prescriptions" ref={reg('prescriptions')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature Module</span>
                        <h2>Prescriptions</h2>
                        <p>A professional digital prescribing experience with a 15,000+ drug catalog, interaction checking, reusable templates, specialist layouts, and instant PDF generation.</p>
                    </div>
                    <div className="bc-grid bc-grid-3">
                        {prescriptionFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Clinical Tools ── */}
            <section className="bc-section bc-alt" id="clinical" ref={reg('clinical')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature Module</span>
                        <h2>Clinical Tools</h2>
                        <p>Medical certificates, structured chemotherapy protocol orders, lab ordering with auto-flagging, AI-assisted consultations, video calls, and AI-powered document OCR.</p>
                    </div>
                    <div className="bc-grid bc-grid-3">
                        {clinicalFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Operations ── */}
            <section className="bc-section" id="operations" ref={reg('operations')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature Module</span>
                        <h2>Operations &amp; Practice Management</h2>
                        <p>Billing, messaging, multi-chamber management, staff roles with approval workflows, and a configurable notification system — everything to run the practice day-to-day.</p>
                    </div>
                    <div className="bc-grid bc-grid-3">
                        {operationsFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Public Doctor Pages callout */}
                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon">
                            <i className="bi bi-globe" style={{ fontSize: '2rem', color: 'var(--bc-accent)' }}></i>
                        </span>
                        <div>
                            <div className="bc-pub-label">Public Presence</div>
                            <h4>Personal Doctor Pages &amp; Find-a-Doctor Directory</h4>
                            <p>
                                Every doctor gets a personal public website at their own subdomain
                                (e.g. <strong>doctorname.rxcloud.care</strong>) showing qualifications, chambers, schedules, maps,
                                and a bilingual toggle. A QR code links directly to the page — printable on brochures or
                                visiting cards. Patients can also browse a directory filtered by specialty, city, language,
                                and availability to discover and book new doctors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Patient Portal ── */}
            <section className="bc-section bc-alt" id="portal" ref={reg('portal')}>
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Patient Experience</span>
                        <h2>Patient Portal</h2>
                        <p>Patients get their own free account — book appointments, access records, message their doctor, upload documents, and control exactly who can see their data.</p>
                    </div>
                    <div className="bc-grid bc-grid-3">
                        {portalFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Security & Pricing ── */}
            <section className="bc-section" id="security" ref={reg('security')}>
                <div className="bc-container">

                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Trust & Compliance</span>
                        <h2>Security &amp; Privacy</h2>
                        <p>Patient data is handled with care at every level — from account access through to record sharing and deletion.</p>
                    </div>
                    <div className="bc-grid bc-grid-2" style={{ marginBottom: '72px' }}>
                        {securityItems.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-shield-check"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                   

                </div>
            </section>

        </div>
    );
};

export default ProjectRxCloud;
