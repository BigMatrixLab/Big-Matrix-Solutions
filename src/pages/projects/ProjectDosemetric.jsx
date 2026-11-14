import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

const heroStats = [
    { icon: 'bi bi-ui-checks', num: '26 Sections', label: 'Daily, weekly and monthly department QA forms built in' },
    { icon: 'bi bi-speedometer2', num: 'Live', label: 'Tolerance check on every measurement as it is typed, in millimetres or percent' },
    { icon: 'bi bi-layers', num: 'Versioned', label: 'Every assignment pinned to the form version it was issued with' },
    { icon: 'bi bi-people', num: 'Two-Person', label: 'Sign-off: the person who submits a check can never verify it' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'Dosemetric' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical Physics / Radiotherapy QA' },
    { icon: 'bi bi-hospital', label: 'Client', value: 'Labaid Cancer Hospital & Super Speciality Center' },
    { icon: 'bi bi-person-badge', label: 'Users', value: 'Technologists, medical physicists, administrators' },
    { icon: 'bi bi-display', label: 'Platform', value: 'Web app (desktop and mobile), self-hosted' },
    { icon: 'bi bi-calendar3', label: 'Timeline', value: 'May 2026 – October 2026' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'In development' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-globe', label: 'Live URL', value: 'dosemetric.big-matrix.com' },
];

const problems = [
    {
        icon: 'bi bi-calculator',
        title: 'Manual Tolerance Checks',
        desc: 'Every reading has to be compared against its reference and limit by hand, across dozens of checks in a single session.',
    },
    {
        icon: 'bi bi-question-circle',
        title: 'Unclear Ownership',
        desc: 'Sections are split between staff, and it is hard to see who is responsible for which check on which day.',
    },
    {
        icon: 'bi bi-alarm',
        title: 'Missed Checks Surface Late',
        desc: 'A skipped daily check tends to be noticed after the fact rather than at the moment the deadline passes.',
    },
    {
        icon: 'bi bi-folder2-open',
        title: 'Scattered History',
        desc: 'Past measurements are difficult to collect into a series that shows how a machine drifts over months.',
    },
];

const layers = [
    {
        icon: 'bi bi-file-earmark-ruled',
        title: 'Form Layer',
        desc: 'Holds the department\u2019s built-in daily, weekly and monthly QA documents and a drag-and-drop builder for custom forms, all stored as versioned schemas.',
    },
    {
        icon: 'bi bi-calendar-week',
        title: 'Scheduling Layer',
        desc: 'Turns a published form version into assignments: specific sections, given to specific staff, on specific dates, with a deadline and optional supervisors.',
    },
    {
        icon: 'bi bi-diagram-3',
        title: 'Workflow Layer',
        desc: 'Takes each assignment through draft, submission, verification or rejection, sends in-app notifications at each step, and flags anything past its deadline.',
    },
];

const forms = [
    { icon: 'bi bi-journal-check', title: 'Department Forms Built In', desc: 'The daily, weekly and monthly forms cover 26 sections, including safety interlocks, lasers, the telemeter, Winston–Lutz isocentre size, MLC picket fence and transmission, couch movements, electron and photon output, profiles and PDD, and CBCT HU constancy.' },
    { icon: 'bi bi-check2-circle', title: 'Live Tolerance Flags', desc: 'Each measurement is checked against its reference and limit as it is typed, in millimetres or percent, and shows pass or fail with the deviation.' },
    { icon: 'bi bi-cloud-check', title: 'Autosaved Drafts', desc: 'Work in progress saves to the server, so a session can be resumed on another device.' },
    { icon: 'bi bi-printer', title: 'Print-Ready Export', desc: 'A completed form prints as a formatted QA document or saves as a PDF from the browser.' },
];

const builder = [
    { icon: 'bi bi-input-cursor-text', title: 'Eight Field Types', desc: 'Checklist items, pass/fail, measurements with unit and tolerance, measurement tables, short text, notes, dropdowns and dates.' },
    { icon: 'bi bi-arrows-move', title: 'Drag-And-Drop Layout', desc: 'Sections and fields can be reordered with a mouse or with the keyboard.' },
    { icon: 'bi bi-lock', title: 'Immutable Versions', desc: 'Edits happen on a single draft and are published as a numbered version with a change note. Versions in use cannot be deleted, and a form in use is archived instead of removed.' },
];

const scheduling = [
    { icon: 'bi bi-grid-3x3', title: 'Section-Level Assignment', desc: 'A staff-by-section matrix shows which technologist covers which part of a form, with coverage shown for each row.' },
    { icon: 'bi bi-calendar-range', title: 'Yearly Plans', desc: 'One action generates a year of assignments: daily QA on weekdays, weekly QA on Mondays and monthly QA on the first of the month.' },
    { icon: 'bi bi-alarm', title: 'Overdue Detection', desc: 'The server scans every five minutes, marks late assignments overdue and notifies the assignee and administrators once.' },
];

const review = [
    { icon: 'bi bi-shield-check', title: 'Separation Of Duties', desc: 'Only a physicist, administrator or named supervisor can verify a submission, and never the person who submitted it.' },
    { icon: 'bi bi-arrow-return-left', title: 'Reject With A Reason', desc: 'Rejected work returns to the technologist with the reviewer\u2019s comment shown above the form.' },
    { icon: 'bi bi-pen', title: 'Role-Scoped Sign-Off', desc: 'Assignee, supervisor and coordinator each add a typed signature and remarks in their own slot only.' },
];

const dashboards = [
    { icon: 'bi bi-speedometer', title: 'Role-Specific Dashboards', desc: 'Counts for pending, overdue, awaiting verification and completed work, tailored to each role.' },
    { icon: 'bi bi-bar-chart-line', title: 'Programme Analytics', desc: 'Completion by month, overdue trend, volume by QA type and status distribution, over week, month, year or custom ranges.' },
    { icon: 'bi bi-bell', title: 'In-App Notifications', desc: 'Alerts for new assignments, submissions, verifications, rejections and overdue work, with an unread badge on desktop and mobile.' },
];

const workflow = [
    { title: 'Prepare The Form', desc: 'An administrator uses a built-in QA form or publishes a new version from the form builder.' },
    { title: 'Assign The Work', desc: 'In a three-step wizard, the administrator picks a form (assignments are pinned to its current default version), maps staff to sections, sets the deadline and supervisors, and issues one-off assignments or a full-year plan. Each technologist is notified.' },
    { title: 'Perform The Checks', desc: 'The technologist opens the task from their dashboard, enters measurements and sees each value flagged against its tolerance. Drafts save automatically.' },
    { title: 'Submit', desc: 'The submission locks the responses, stores every numeric reading as a time-series point and notifies the physicists.' },
    { title: 'Review', desc: 'A physicist opens the review queue, inspects the form and verifies it or rejects it with a reason. The technologist is notified either way.' },
    { title: 'Track The Programme', desc: 'Missed deadlines are flagged overdue automatically, and administrators follow completion and overdue trends on the calendar and analytics pages.' },
];

const stack = [
    { icon: 'bi bi-filetype-jsx', title: 'Frontend', desc: 'React 19, TanStack Start, Tailwind CSS 4, Recharts and dnd-kit. A server-rendered app with typed routes, charts and keyboard-accessible drag-and-drop.' },
    { icon: 'bi bi-server', title: 'Backend', desc: 'FastAPI, Pydantic 2 and Python 3.13. Typed request validation and generated API documentation.' },
    { icon: 'bi bi-hdd-stack', title: 'Data', desc: 'SQLite via SQLAlchemy 2, with Alembic migrations that run on startup. A single database file that is easy to back up for one department.' },
    { icon: 'bi bi-box', title: 'Infrastructure', desc: 'Docker Compose with nginx, Node SSR and FastAPI. One command deploys the whole system on a single self-hosted server.' },
    { icon: 'bi bi-clipboard-check', title: 'Testing', desc: 'pytest, with 18 backend tests covering sessions, user rules, form versioning and the QA workflow.' },
];

const security = [
    'Every endpoint checks the session, and write operations check the user\u2019s role on the server, not just in the interface.',
    'The browser only talks to a same-origin API behind the reverse proxy.',
    'State-changing requests must carry a custom header, which blocks cross-site form posts.',
];

const role = [
    'Digitising the department\u2019s daily, weekly and monthly QA documents into structured form schemas.',
    'Product design and UI for desktop and mobile.',
    'Backend API, data model and workflow engine.',
    'Migration of data from an earlier version of the application.',
    'Containerised deployment setup.',
];

const futureDirections = [
    'Password-based or single sign-on authentication and HTTPS before production use.',
    'Trend charts driven by the time-series data captured from real submissions.',
    'Filtering trends and reports by individual machine.',
];

/** The same numbered row list used on the homepage and other showcase pages. */
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

const Cards = ({ items, cols }) => (
    <div className={`bc-grid bc-grid-${cols}`}>
        {items.map((item) => (
            <div className="bc-card" key={item.title}>
                <span className="bc-card-icon"><i className={item.icon} aria-hidden="true"></i></span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
            </div>
        ))}
    </div>
);

const Checklist = ({ items, cols }) => (
    <div className={`bc-grid bc-grid-${cols}`}>
        {items.map((item) => (
            <div className="bc-benefit" key={item}>
                <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                <p>{item}</p>
            </div>
        ))}
    </div>
);

const ProjectDosemetric = () => {
    return (
        <>
            <Seo
                title="Dosemetric"
                description="Web platform that schedules, records and signs off daily, weekly and monthly linear accelerator QA, with live tolerance checks and version-controlled forms."
                path="/project/dosemetric"
            />
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-radioactive"></i> Medical Physics / Radiotherapy QA
                            </span>
                            <h1>Dosemetric: Linear Accelerator QA, Scheduled, Recorded And Signed Off</h1>
                            <p className="bc-hero-sub">
                                A web application for the Radiation Oncology Department at Labaid Cancer Hospital. It
                                manages the daily, weekly and monthly QA checks run on the department&apos;s linear
                                accelerators: who performs each section, when it is due, what was measured, and who
                                verified it.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <img fetchpriority="high" src="/assets/images/projects/Dosemetric.webp" alt="Dosemetric dashboard" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-layers"></i>
                                <span>
                                    <strong>Versioned QA forms</strong>
                                    <span>Changing a form never alters past records</span>
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

            {/* ── Problem ── */}
            <section className="bc-section bc-alt" id="problem">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Why it matters</span>
                        <h2>The Problem</h2>
                        <p>
                            A radiotherapy department checks each linear accelerator every working day, week and month,
                            from door interlocks and lasers to beam output, flatness and symmetry for every energy, MLC
                            leaf positions and CBCT image quality. Each value must be compared against a reference and
                            tolerance, then signed off by a physicist other than the person who measured it. Without a
                            shared system, that work depends on individual discipline and is hard to audit.
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

            {/* ── What we built ── */}
            <section className="bc-section" id="approach">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The approach</span>
                        <h2>QA Forms As Versioned Data, Not Fixed Screens</h2>
                        <p>
                            The department&apos;s three standard QA documents are built in, a form builder lets
                            administrators adapt them without code changes, and each assignment is pinned to the form
                            version it was issued with. The application is three connected layers on top of that idea.
                        </p>
                    </div>

                    <Cards items={layers} cols={3} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-graph-up"></i></span>
                        <div>
                            <div className="bc-pub-label">Built for the whole department</div>
                            <h4>One dashboard per role, and every reading kept as a time series</h4>
                            <p>
                                Technologists see their tasks, physicists a review queue, and administrators the
                                calendar, forms, users and analytics. On submission, the server also stores every
                                numeric reading in a time-series table keyed by form, section and variable, ready for
                                trend analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Digitised forms ── */}
            <section className="bc-section bc-alt" id="forms">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 01</span>
                        <h2>Digitised QA Forms</h2>
                        <p>
                            The department&apos;s paper QA documents, turned into forms that check each value as it is
                            entered and keep the session safe until it is submitted.
                        </p>
                    </div>
                    <Ledger items={forms} />
                </div>
            </section>

            {/* ── Form builder ── */}
            <section className="bc-section" id="builder">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 02</span>
                        <h2>Form Builder And Versioning</h2>
                        <p>
                            Administrators adapt forms without code changes. Every change becomes a new published
                            version, so a record always matches the form it was filled in on.
                        </p>
                    </div>
                    <Cards items={builder} cols={3} />
                </div>
            </section>

            {/* ── Scheduling ── */}
            <section className="bc-section bc-alt" id="scheduling">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 03</span>
                        <h2>Scheduling And Assignment</h2>
                        <p>
                            Ownership is set per section, not per form, and the schedule for a whole year can be
                            generated at once.
                        </p>
                    </div>
                    <SpecGrid items={scheduling} />
                </div>
            </section>

            {/* ── Review ── */}
            <section className="bc-section" id="review">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 04</span>
                        <h2>Review And Sign-Off</h2>
                        <p>
                            The rule that a physicist other than the person who measured must sign off is enforced by
                            the system rather than left to habit.
                        </p>
                    </div>
                    <Cards items={review} cols={3} />
                </div>
            </section>

            {/* ── Dashboards ── */}
            <section className="bc-section bc-alt" id="dashboards">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 05</span>
                        <h2>Dashboards And Notifications</h2>
                        <p>Each role sees the work that is waiting for it, and administrators see the programme as a whole.</p>
                    </div>
                    <SpecGrid items={dashboards} />
                </div>
            </section>

            {/* ── Workflow ── */}
            <section className="bc-section" id="workflow">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it works</span>
                        <h2>From Form To Verified Record</h2>
                        <p>The full QA cycle, from preparing a form to following the programme over the year.</p>
                    </div>
                    <div className="bc-timeline">
                        {workflow.map((step, index) => (
                            <div className="bc-step" key={step.title}>
                                <div className="bc-step-num">{index + 1}</div>
                                <div className="bc-step-body">
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Technology ── */}
            <section className="bc-section bc-alt" id="stack">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Technology</span>
                        <h2>The Stack</h2>
                        <p>Chosen so a single department can run the whole system on one self-hosted server.</p>
                    </div>

                    <SpecGrid items={stack} />

                    <div className="bc-pub" style={{ marginTop: '48px', marginBottom: '40px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-diagram-2"></i></span>
                        <div>
                            <div className="bc-pub-label">Key architectural decision</div>
                            <h4>One storage model for built-in and custom forms</h4>
                            <p>
                                Built-in and custom forms share one storage model, one JSON document per assignment
                                section, so both run through the same submission, review and time-series pipeline.
                            </p>
                        </div>
                    </div>

                    <Checklist items={security} cols={3} />
                </div>
            </section>

            {/* ── Our role ── */}
            <section className="bc-section" id="role">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Our role</span>
                        <h2>Built End To End By Big-Matrix</h2>
                        <p>From the department&apos;s paper QA documents to a containerised deployment.</p>
                    </div>
                    <Checklist items={role} cols={2} />
                </div>
            </section>

            {/* ── Future ── */}
            <section className="bc-section bc-alt" id="future">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">What&apos;s next</span>
                        <h2>Planned Work</h2>
                        <p>Features on the roadmap that are not in the current build.</p>
                    </div>
                    <div className="bc-grid bc-grid-3" style={{ marginBottom: '40px' }}>
                        {futureDirections.map((item) => (
                            <div className="bc-future-card" key={item}>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bc-pub">
                        <span className="bc-pub-icon"><i className="bi bi-hourglass-split"></i></span>
                        <div>
                            <div className="bc-pub-label">Status</div>
                            <h4>In development for Labaid Cancer Hospital</h4>
                            <p>
                                Authentication hardening and HTTPS are planned before the system goes into production
                                use in the Radiation Oncology Department.
                            </p>
                            <span className="bc-pub-status"><i className="bi bi-gear"></i> React + FastAPI + Docker</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <CtaBand />
        </>
    );
};

export default ProjectDosemetric;
