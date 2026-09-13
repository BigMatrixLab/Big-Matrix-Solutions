import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

const heroStats = [
    { icon: 'bi bi-arrow-repeat', num: 'Full Loop', label: 'Public booking, appointment, consultation, prescription, records, billing and follow-up in one platform' },
    { icon: 'bi bi-file-earmark-medical', num: '8+', label: 'Prescription templates and designs, assigned per doctor without a code fork' },
    { icon: 'bi bi-capsule', num: '21,600+', label: 'Brand-name drugs with brand-first autocomplete across ~1,660 generics' },
    { icon: 'bi bi-translate', num: 'Bilingual', label: 'English and Bangla throughout, including printed prescriptions' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'RxCloud' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Clinic and practice management SaaS' },
    { icon: 'bi bi-broadcast', label: 'Status', value: 'Live in production' },
    { icon: 'bi bi-geo-alt', label: 'Market', value: 'Bangladesh' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-globe', label: 'Live URL', value: 'rxcloud.care' },
];

const problems = [
    {
        icon: 'bi bi-telephone',
        title: 'Booking Is A Phone Queue',
        desc: 'A patient spends up to half an hour on the phone for a slot, and nothing exists as a record until somebody writes it in a book.',
    },
    {
        icon: 'bi bi-folder2-open',
        title: 'The Record Lives Wherever The Paper Is',
        desc: "History, prescriptions and lab reports don't travel to the doctor's other chamber, let alone to the patient's home.",
    },
    {
        icon: 'bi bi-hourglass-split',
        title: 'The Doctor Is The Admin Bottleneck',
        desc: 'Prescriptions, records, billing and follow-up all queue behind the one person who should be consulting.',
    },
    {
        icon: 'bi bi-shield-exclamation',
        title: 'Handing Work To Staff Means Handing Over Trust',
        desc: 'Without a permission and approval layer, delegating record-keeping to a receptionist means letting them alter clinical documents.',
    },
];

const capabilities = [
    { icon: 'bi bi-file-earmark-medical', title: 'Structured Prescriptions', desc: 'A 5–6 step writer with custom templates, print-grade PDFs, Body-Only printing onto existing pads, and a brand-first drug library.' },
    { icon: 'bi bi-geo-alt', title: 'Multi-Chamber Booking', desc: 'Clinic, portal, phone and walk-in sources. Per-branch schedules, fees, availability and collision detection from one account.' },
    { icon: 'bi bi-receipt', title: 'Invoicing With PDF', desc: 'Sequential codes, line items, discount and tax, and a server-rendered invoice PDF. Payments are recorded by hand against cash, card, bKash, Nagad, Rocket or bank.' },
    { icon: 'bi bi-people', title: 'Staff Permissions And Approval', desc: 'Nine independent capability flags, branch scoping, and a unified doctor inbox so drafts do not go live until they are approved.' },
    { icon: 'bi bi-person', title: 'Global Patient Records', desc: 'One row per person, shared across clinics and cities, with explicit consent, OTP-verified access requests and a full access audit log.' },
    { icon: 'bi bi-file-earmark-arrow-up', title: 'Document OCR And Auto-Promotion', desc: 'A scanned lab report becomes structured parameters; a scanned prescription becomes a real prescription the doctor can pull into the form.' },
    { icon: 'bi bi-robot', title: 'Doctor AI Assistant', desc: 'Plain-language questions over authorised patient history only. Decision support — the clinician verifies the output.' },
    { icon: 'bi bi-camera-video', title: 'Invite-Link Video Consults', desc: 'The doctor starts a call; the patient joins from a browser with no login and no app install.' },
    { icon: 'bi bi-globe2', title: 'A Public Site Per Doctor', desc: 'A full bilingual marketing site on the doctor\'s own subdomain, with chamber cards, maps and booking that writes into the clinic schedule.' },
];

const prescriptionFeatures = [
    { icon: 'bi bi-layers', title: 'Four Concerns, Decoupled', desc: 'Type (which fields exist), design (how it looks), template (the assignable format) and identity (name, credentials, signature) vary independently. A new bespoke pad is a config change, not a code fork.' },
    { icon: 'bi bi-ui-checks', title: 'A Three-Pane Clinical Workspace', desc: 'Patient list, patient context (history, visits, labs, AI assistant) and the authoring panel. Opening from an appointment pulls in that chamber and any vitals already recorded at reception.' },
    { icon: 'bi bi-search', title: 'Brand-First Autocomplete', desc: 'Bangladeshi doctors type brand names. Ranking places brand prefix matches first, so typing "nap" surfaces Napa. Strength auto-fills. This is a prefix index, not a model.' },
    { icon: 'bi bi-translate', title: 'Bangla Dose Language As Default', desc: 'Frequency, duration and instruction options ship in Bangla — ১+০+০, ৩ দিন, খাওয়ার পরে — not translations bolted on afterwards.' },
    { icon: 'bi bi-shield-exclamation', title: 'Safety Checks While Typing', desc: 'Allergy conflicts and drug interactions recompute on every keystroke and pin to the medication card before save. The server re-runs the same check. Advisory, not blocking.' },
    { icon: 'bi bi-lock', title: 'Issued Prescriptions Stay Frozen', desc: 'Schema and design are pinned to a versioned file path per prescription. Changing a layout publishes v2; last year\'s scripts still render from v1. Doctor identity is resolved live, so a corrected signature propagates.' },
];

const printDetails = [
    'The same HTML drives the on-screen preview and the print output, so what the doctor sees is what prints.',
    'Chromium via Playwright renders Jinja to PDF. Fonts and logos are embedded as data URIs, which is how Bengali text shaping works without a font server.',
    'A two-pass render measures the page count and pins the signature block to the bottom of the final page.',
    'Body-Only mode prints clinical content into a configurable blank frame — adjustable margins as percentages of A4 — so doctors keep the pre-printed stationery they already own.',
];

const staffPermissions = [
    { icon: 'bi bi-toggles', title: 'Nine Independent Flags', desc: 'Create and view patients, upload records, prepare records, create and update prescriptions, manage availability, manage certificates, book appointments, process payments, view reports. Plus branch-level scoping.' },
    { icon: 'bi bi-inbox', title: 'One Unified Inbox', desc: 'Staff drafts enter one of six states and wait. Prescriptions, certificates, invoices and availability changes share a single inbox with a total badge count.' },
    { icon: 'bi bi-pencil-square', title: 'Review In The Same Panel', desc: 'Opening a staff draft opens the same authoring panel, fully editable. The doctor can fix and approve in one pass instead of rejecting and asking for a redo.' },
    { icon: 'bi bi-clock-history', title: 'A Sensible Edit Window', desc: 'The doctor can edit their own issued prescriptions within 24 hours, after which the record locks. Any content edit invalidates the cached PDF. Every outcome writes to the staff activity log.' },
];

const approvalBehaviour = [
    'Approving auto-signs the prescription if it is not already signed.',
    'Approving a deletion request soft-deletes and preserves the audit trail; rejecting it restores the row and attaches the reason.',
    'Staff-proposed availability changes stay invisible to patients until approved.',
    'Staff are assigned per branch, so a receptionist at one chamber sees only that chamber.',
];

const siteFeatures = [
    { icon: 'bi bi-window', title: 'A Full Site, Not A Profile Page', desc: 'Hero with credentials, biography, credential timeline, chamber cards with live maps and tap-to-call numbers, treatment grids, a patient success-story carousel with video, FAQ, and a booking dialog.' },
    { icon: 'bi bi-translate', title: 'Bilingual End To End', desc: 'The public site toggles fully between English and Bangla. Clinical and profile content carries paired fields, with English fallback when Bangla is blank.' },
    { icon: 'bi bi-cloud', title: 'One Template, Many Doctors', desc: 'Content comes from a public-site API keyed by subdomain. Onboarding is a database record plus one management command — no frontend build, live immediately on a Cloudflare wildcard route.' },
    { icon: 'bi bi-calendar-check', title: 'Booking Writes Into The Clinic', desc: 'Patients choose a chamber and an available time on the public site. The booking lands in the clinic\'s schedule.' },
];

const aiFeatures = [
    {
        icon: 'bi bi-file-earmark-arrow-up',
        title: 'Document OCR And Extraction',
        prompt: 'Upload a scan. Get structured lab values, medications and an impression.',
        desc: 'A background job routes each page: text-layer PDFs are parsed directly; scans go to a vision model. A recognised lab report becomes a PatientReport; a recognised prescription becomes a Prescription. Not instant — multi-page scans take minutes.',
    },
    {
        icon: 'bi bi-chat-square-text',
        title: 'History Assistant In The Writer',
        prompt: 'What changed in this patient\'s labs since the last visit?',
        desc: 'A real model call, scoped to authorised records for that one patient before any context is assembled. Answers only from the records, says so when data is missing, and never invents values. Decision support. The clinician verifies.',
    },
];

const aiHonesty = [
    'AI reads the document and extracts structured data. The summary line is assembled in code from those fields, not written by a model.',
    'Drug search, dose suggestions and interaction alerts are deterministic. Call them smart autocomplete, not AI.',
    'The assistant answers only from records the doctor is authorised to access. It is not a prescription writer.',
];

const patientFeatures = [
    { icon: 'bi bi-calendar-plus', title: 'Book', desc: 'Browse doctors, filter by city, see computed slots and submit. Deep-links from public doctor sites land on the right doctor.' },
    { icon: 'bi bi-calendar2-check', title: 'Appointments', desc: 'Own bookings, cancel with a reason, and a live queue view showing now-serving and how many are ahead. Other patients\' names are never exposed.' },
    { icon: 'bi bi-folder2', title: 'Records', desc: 'Prescriptions plus a merged document library spanning doctor-uploaded and self-uploaded files, with search, filters and a share toggle.' },
    { icon: 'bi bi-shield-lock', title: 'Permissions And Audit', desc: 'Which doctors have access, with revoke; a privacy-level control; OTP-verified access requests; 4-hour emergency access; and a full log of who viewed the record and when.' },
];

const engineering = [
    {
        icon: 'bi bi-layers',
        title: 'A Design System That Survives Catalogue Changes',
        desc: 'Adding a custom template is a fixed five-step recipe: a versioned HTML design extending the shared base, a registered type, two manifest entries, one sync command, then an admin assignment. The render engine is never touched. The sync is validation-first and idempotent, and it never deletes, so doctor assignments survive every catalogue change. A build-time lint fails if doctor identity leaks into template branding.',
    },
    {
        icon: 'bi bi-lock',
        title: 'An Issued Prescription Must Reproduce Exactly',
        desc: 'If the template changes next year, last year\'s prescription still has to print as issued. RxCloud freezes both the resolved field schema and a design descriptor pinned to a versioned file path. Design files are append-only. Doctor identity is deliberately not frozen, so a corrected signature or updated credentials propagate everywhere.',
    },
    {
        icon: 'bi bi-printer',
        title: 'Print That Matches The Preview, Including Existing Pads',
        desc: 'A two-pass render measures the page count and pins the signature to the bottom of the last page, with a safety net that discards the second pass if it would spill onto an extra page. Body-Only mode prints just the clinical content into a configurable blank frame so doctors keep using the stationery they already own.',
    },
    {
        icon: 'bi bi-diagram-3',
        title: 'One Patient Record Across Every Chamber',
        desc: 'Clinic is the top-level tenant and owns branches; doctors belong to a clinic. Patients are global records reachable across clinics and cities through an explicit relationship layer with emergency access and dormancy rules. That global record is what makes cross-chamber continuity possible.',
    },
];

const architecture = [
    {
        icon: 'bi bi-window-stack',
        title: 'One App, Multi-Tenant By Subdomain',
        desc: 'React 19 on TanStack Start with SSR, 71 file-based routes, TanStack Query and a scoped design-token layer. Deployed to Cloudflare Workers on a wildcard route, so every doctor site and the main app share one frontend.',
    },
    {
        icon: 'bi bi-server',
        title: 'Eighteen Domain Apps, Explicit Routes',
        desc: 'Django 5 with DRF across accounts, tenancy, patients, prescriptions, labs, scheduling, documents, billing and the rest. Around 150 endpoints, each an explicit view class — no auto-generated routers — documented via OpenAPI. JWT with 15-minute access tokens and refresh rotation.',
    },
    {
        icon: 'bi bi-database',
        title: 'Shared Schema, Foreign-Key Scoped',
        desc: 'Single MySQL 8 database, utf8mb4, strict mode. Redis backs Celery for OCR and scheduled work on Asia/Dhaka time. Patients are global; everything else is scoped to clinic and branch through foreign keys.',
    },
];

// const numbers = [
//     { icon: 'bi bi-code-slash', num: '115K', label: 'Lines of source across ~685 files' },
//     { icon: 'bi bi-hdd-network', num: '150', label: 'API endpoints across 24 route modules' },
//     { icon: 'bi bi-diagram-2', num: '18', label: 'Backend domain apps' },
//     { icon: 'bi bi-table', num: '68', label: 'Database models' },
//     { icon: 'bi bi-signpost-split', num: '71', label: 'Frontend file-based routes' },
//     { icon: 'bi bi-grid', num: '145', label: 'Radix-based UI components' },
//     { icon: 'bi bi-file-earmark-medical', num: '16.3K', label: 'Lines in the prescription subsystem alone' },
//     { icon: 'bi bi-layout-text-window', num: '8 / 6', label: 'Prescription templates and designs' },
// ];

const stack = [
    { icon: 'bi bi-filetype-jsx', title: 'Frontend', desc: 'React 19, TanStack Start with SSR, TanStack Query and Tailwind 4.' },
    { icon: 'bi bi-server', title: 'Backend', desc: 'Python, Django 5, Django REST Framework, Gunicorn and nginx, fronted by Cloudflare Tunnel.' },
    { icon: 'bi bi-database', title: 'Data', desc: 'MySQL 8 on utf8mb4 in strict mode, Redis 7, Celery worker and beat.' },
    { icon: 'bi bi-cpu', title: 'AI', desc: 'Vision-model OCR in a background job, and a scoped LLM assistant over authorised patient history.' },
    { icon: 'bi bi-camera-video', title: 'Video', desc: 'Agora RTC, code-split into its own chunk and excluded from SSR. Patients join by invite link.' },
    { icon: 'bi bi-cloud', title: 'Infrastructure', desc: 'Cloudflare Workers via Wrangler, wildcard subdomain routing, structured JSON logging and Sentry.' },
    { icon: 'bi bi-translate', title: 'Bilingual By Design', desc: 'Paired English/Bangla fields, Bangla-first dose vocabulary, and a Bengali-capable embedded font so PDF shaping works without a font server.' },
];

const trustItems = [
    'Authenticated access with JWT, short-lived tokens and refresh rotation.',
    'Role and branch permissions decide what staff can see and do.',
    'Doctor–patient relationship checks run before clinical context is assembled.',
    'Patients can see an access audit log of who viewed their record and when.',
    'Clinical rows soft-delete. Staff activity and approval outcomes are recorded.',
    'Document share links are tokenised and revocable.',
];

/** The same numbered row list the homepage uses for its solutions index. */
const Ledger = ({ items }) => (
    <div className="bm-rows">
        {items.map((item, index) => (
            <div className="bm-row" key={item.title}>
                <span className="bm-row__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="bm-row__icon">
                    <i className={item.icon} aria-hidden="true"></i>
                </span>
                <div className="bm-row__body">
                    <h3 className="bm-row__title">{item.title}</h3>
                    <p className="bm-row__text">{item.desc}</p>
                </div>
            </div>
        ))}
    </div>
);

/** One framed datasheet instead of a row of separate cards. */
const SpecGrid = ({ items }) => (
    <div className="bc-specgrid">
        {items.map((item) => (
            <div key={item.title}>
                <span className="bc-spec-label">
                    <i className={item.icon} aria-hidden="true"></i>
                    {item.title}
                </span>
                <p>{item.desc}</p>
            </div>
        ))}
    </div>
);

const ProjectRxCloud = () => {
    return (
        <>
            <Seo
                title="RxCloud practice management"
                description="Patients, appointments, prescriptions and billing in one platform, with direct patient booking. Practice management doctors actually trust."
                path="/project/rxcloud"
            />
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-hospital"></i> Clinic and practice management · Bangladesh
                            </span>
                            <h1>RxCloud: The Practice Management Platform Doctors Trust</h1>
                            <p className="bc-hero-sub">
                                Manage patients, appointments, prescriptions and billing in one place.
                                Patients book directly. You focus on care.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <a
                                className="bc-hero-figure__link"
                                href="https://rxcloud.care/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the live RxCloud platform at rxcloud.care in a new tab"
                            >
                                <img src="/assets/images/projects/RXCloud.png" alt="RxCloud Platform" />
                                <span className="bc-hero-figure__cue">
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                    Open live site
                                </span>
                            </a>
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-stars"></i>
                                <span>
                                    <strong>Efficient Care, Everywhere</strong>
                                    <span>A Big-Matrix Solutions product</span>
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <div className="bc-stats" id="overview">
                <div className="bc-container">
                    <div className="bc-stats-grid">
                        {heroStats.map((stat) => (
                            <div className="bc-stat-card" key={stat.num + stat.label}>
                                <span className="bc-stat-icon"><i className={stat.icon}></i></span>
                                <div className="bc-stat-num">{stat.num}</div>
                                <div className="bc-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    <ShowcaseFacts items={projectFacts} />
                </div>
            </div>

            {/* ── The problem ── */}
            <section className="bc-section bc-alt" id="problem">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it matters</span>
                        <h2>The Problem</h2>
                        <p>
                            Private specialist practice in Bangladesh runs on phone calls, paper registers
                            and handwritten prescription pads. One consultant may hold chambers in three or
                            four locations across two cities, each with its own receptionist, its own
                            schedule and its own drawer of files. Nothing is shared.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
                        {problems.map((item) => (
                            <div className="bc-card bc-problem" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Capabilities ── */}
            <section className="bc-section" id="capabilities">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What it does</span>
                        <h2>One Platform, The Full Loop</h2>
                        <p>
                            Public booking through appointment, queue, consultation, prescription, records,
                            billing and follow-up. Doctors, clinic staff and patients each get their own
                            surface onto the same data, with role permissions, per-branch scoping and
                            doctor approval deciding who can do what.
                        </p>
                    </div>

                    <Ledger items={capabilities} />
                </div>
            </section>

            {/* ── Prescriptions ── */}
            <section className="bc-section bc-alt" id="prescriptions">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The deepest subsystem</span>
                        <h2>The Piece Of Paper The Patient Carries Home</h2>
                        <p>
                            A doctor in Bangladesh has printed their prescription pad a particular way for
                            twenty years. Software that forces a generic layout on them gets rejected
                            regardless of how good the rest is. That is why the prescription platform is
                            the largest piece of the codebase — 97 files, about 16,300 lines — and the
                            thing the case study leads with.
                        </p>
                    </div>

                    <SpecGrid items={prescriptionFeatures} />

                    <div className="bc-grid bc-grid-2" style={{ marginTop: '40px' }}>
                        {printDetails.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-layout-text-window"></i></span>
                        <div>
                            <div className="bc-pub-label">Currently shipping</div>
                            <h4>Eight templates across six designs</h4>
                            <p>
                                General, radiology, cardiology, general medicine, medical-radiation-oncology,
                                a bespoke BIRDEM layout, and two test templates. Three of those share a
                                single design, which is the decoupling paying for itself.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Delegation ── */}
            <section className="bc-section" id="delegation">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The trust problem</span>
                        <h2>Delegation Without Losing Control</h2>
                        <p>
                            This is the feature most likely to close a sale, and the one competitors
                            usually skip. Staff can prepare the work. Nothing clinical or financial goes
                            live until the doctor says so.
                        </p>
                    </div>

                    <SpecGrid items={staffPermissions} />

                    <div className="bc-grid bc-grid-2" style={{ marginTop: '40px' }}>
                        {approvalBehaviour.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Doctor sites ── */}
            <section className="bc-section bc-alt" id="sites">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Public presence</span>
                        <h2>A Real Website For Every Doctor</h2>
                        <p>
                            Every doctor gets a full public marketing site on their own subdomain —
                            not a profile page. Easy to demo, hard to copy, and immediately legible
                            to a non-technical reader.
                        </p>
                    </div>

                    <SpecGrid items={siteFeatures} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-globe2"></i></span>
                        <div>
                            <div className="bc-pub-label">Search-ready, not search-ranked</div>
                            <h4>Server-rendered HTML with per-doctor metadata</h4>
                            <p>
                                Full HTML for crawlers, per-doctor titles and descriptions, and Physician
                                structured data, so each site is a fast, search-ready page of its own.
                                A registry allows a bespoke design per subdomain when a doctor wants one.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── AI ── */}
            <section className="bc-section" id="ai">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Described honestly</span>
                        <h2>Two Real AI Features. The Rest Are Not AI.</h2>
                        <p>
                            There is a vision-model pipeline for documents and a scoped assistant on
                            patient history. Drug search, interaction checks and on-screen summaries
                            are deterministic. The candour is a selling point in healthcare.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-2">
                        {aiFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p className="bc-prompt">&ldquo;{item.prompt}&rdquo;</p>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bc-grid bc-grid-3" style={{ marginTop: '40px' }}>
                        {aiHonesty.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Patient side ── */}
            <section className="bc-section bc-alt" id="patients">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The patient side</span>
                        <h2>A Portal With A Real Consent Layer</h2>
                        <p>
                            Patients book, cancel, read prescriptions, upload documents and decide which
                            doctors can see their record. The standout is not the booking screen. It is
                            the permission and audit layer.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
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

            {/* ── Engineering ── */}
            <section className="bc-section" id="engineering">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Under the hood</span>
                        <h2>Engineering Highlights</h2>
                        <p>
                            Four problems that took real work. Each one is the difference between a
                            feature that demos and a feature a doctor will actually print from.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-2">
                        {engineering.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Architecture ── */}
            {/* <section className="bc-section bc-alt" id="architecture">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it is built</span>
                        <h2>Architecture In Brief</h2>
                        <p>
                            Doctors, staff, patients and public visitors hit one React app, multi-tenant
                            by subdomain. Behind it, a Django API, MySQL, Redis and a Celery worker for
                            the jobs a request cannot finish in time.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {architecture.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ── Numbers ── */}
            {/* <section className="bc-section" id="numbers">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">By the numbers</span>
                        <h2>Scale Of The Build</h2>
                        <p>
                            The prescription subsystem being the largest single piece of the codebase is
                            the story in one number: the thing doctors judge the product on is the paper
                            they hand the patient, so that is where the work went.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-4">
                        {numbers.map((item) => (
                            <div className="bc-stat-card" key={item.label}>
                                <span className="bc-stat-icon"><i className={item.icon}></i></span>
                                <div className="bc-stat-num">{item.num}</div>
                                <div className="bc-stat-label">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ── Technology ── */}
            <section className="bc-section bc-alt" id="stack">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Technology</span>
                        <h2>The Stack</h2>
                        <p>Chosen so doctors, staff, patients and public doctor sites talk to the same system of record.</p>
                    </div>

                    <SpecGrid items={stack} />

                    <div className="bc-section-head" style={{ marginTop: '72px' }}>
                        <span className="bc-eyebrow">Trust</span>
                        <h2>Access, Permissions, Audit</h2>
                        <p>
                            Authenticated access, role and branch permissions, relationship checks, access
                            audit logs and soft deletion. That is the accurate wording. Stronger claims
                            are not supportable.
                        </p>
                    </div>
                    <div className="bc-grid bc-grid-2">
                        {trustItems.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-shield-check"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-hospital"></i></span>
                        <div>
                            <div className="bc-pub-label">Try it live</div>
                            <h4>RxCloud is live at rxcloud.care</h4>
                            <p>
                                Submit the Start your service form to plan a setup. Every doctor site is
                                a working demo of the public booking loop.
                            </p>
                            <a className="bc-pub-status" href="https://rxcloud.care/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-box-arrow-up-right"></i> rxcloud.care
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <CtaBand />
        </>
    );
};

export default ProjectRxCloud;
