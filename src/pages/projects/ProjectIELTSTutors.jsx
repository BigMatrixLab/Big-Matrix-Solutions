import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';

const heroStats = [
    { icon: 'bi bi-4-circle', num: '4 Skills', label: 'Writing, Speaking, Reading and Listening — full exam coverage under real conditions' },
    { icon: 'bi bi-robot', num: 'AI Grading', label: 'Band scores across all four official IELTS criteria, returned instantly after every submission' },
    { icon: 'bi bi-phone', num: 'Web & Android', label: 'Desktop-optimised web app and full-featured Android app with feature parity' },
    { icon: 'bi bi-graph-up-arrow', num: 'Mistake Vault', label: 'Auto-tracks recurring errors with Worsening / Improving / Stable trend badges' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'IELTS Tutors' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Education / AI Platform' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-phone', label: 'Platforms', value: 'Web · Android · iOS (in progress)' },
    { icon: 'bi bi-calendar3', label: 'Year', value: '2026' },
];

const problems = [
    {
        icon: 'bi bi-currency-dollar',
        title: 'Human Tutors Are Expensive And Hard To Schedule',
        desc: 'A tutor who can grade writing against the four official criteria, conduct a realistic speaking exam and identify recurring errors costs money most candidates do not have and time that is hard to find.',
    },
    {
        icon: 'bi bi-stopwatch',
        title: 'Practice Without Exam Conditions Does Not Transfer',
        desc: 'Mock tests without real time constraints, question formats and section structures produce candidates who know the content but not the pressure. Familiarity with the format is not optional.',
    },
    {
        icon: 'bi bi-chat-square-text',
        title: 'AI Feedback That Never Touches The Document',
        desc: 'Most AI writing tools generate a comment in a side panel. For IELTS, what matters is per-criterion band scoring, a model answer rewrite and identification of recurring errors — not a generic suggestion to paste in.',
    },
    {
        icon: 'bi bi-graph-down',
        title: 'No Way To Know If You Are Actually Improving',
        desc: 'Without automatic error extraction and trend analysis, candidates practise their strong skills and avoid their weak ones, with no objective signal on whether specific error types are getting better or worse.',
    },
];

const writingModules = [
    { icon: 'bi bi-pencil-square', title: 'Writing Mock Test', desc: 'Full timed mock with Task 1 and Task 2, Cambridge-style prompts, real chart images for Academic Task 1 and auto-save. Single-task mocks (Task 1 only or Task 2 only) also available.' },
    { icon: 'bi bi-journals', title: 'Writing Lab', desc: 'Free-form practice: enter your own prompt and write against a 60-minute timer. The same AI grading pipeline applies.' },
    { icon: 'bi bi-stars', title: 'AI Feedback & Band 9 Rewrite', desc: 'After any submission: band score per criterion, overall band, examiner-style comment and a Band 9 model answer rewrite for direct comparison.' },
    { icon: 'bi bi-chat-left-dots', title: 'Task 1 Mentor', desc: 'Conversational AI coach for Academic Task 1. Pick chart type and mode (Introduction Only or Full Response). Real-time streaming with a resizable split pane on web.' },
    { icon: 'bi bi-chat-dots', title: 'Task 2 Mentor', desc: 'Conversational coaching for Task 2. Choose essay type and mode (Intro Only or Full Essay by section). Detailed structural feedback with band-level identification for each section.' },
    { icon: 'bi bi-mortarboard', title: 'Introduction Mastery', desc: 'Mini-course covering all five Task 2 essay types, an essay-type identification quiz and free-practice with AI feedback — targeting the sub-skill that blocks most candidates from Band 7+.' },
    { icon: 'bi bi-clock-history', title: 'Writing Practice History', desc: 'Unified timeline of all writing activity — essays, AI mentor chats and mocks — with filters for Task 1, Task 2 and Mock.' },
    { icon: 'bi bi-bullseye', title: 'Mistake Practice', desc: 'Drill specifically on weak areas identified by the Mistake Vault. AI verdict on each answer with sound cues on success.' },
];

const speakingModules = [
    { icon: 'bi bi-mic', title: 'Speaking Mock Test', desc: 'Full AI-conducted 3-part exam with randomly selected examiner personas. Silence detection auto-submits after 6 seconds — matching real exam conditions. Animated orb shows mic activity. Scored across all four official criteria.' },
    { icon: 'bi bi-chat-heart', title: 'Fun Practice', desc: 'Casual conversation with a friendly AI tutor. No structured format — speak freely and receive inline vocabulary and grammar tips. Voice or text input.' },
    { icon: 'bi bi-collection', title: 'Speaking History', desc: 'Full log of all speaking sessions with overall band scores and dates. Tap any session to revisit the complete feedback report.' },
];

const readingFeatures = [
    { icon: 'bi bi-book', title: 'Practice & Mock Test Library', desc: 'Academic and General Training tests showing your best previous band score, question count and duration. Premium tests clearly labelled.' },
    { icon: 'bi bi-layout-split', title: 'Full Exam Interface', desc: 'Resizable split pane, all official question types (MCQ, TFNG, YNNG, Short Answer, Fill in Blanks, Matching Headings, Matching Information), a question palette, floating timer and an answer review panel before submission.' },
];

const listeningFeatures = [
    { icon: 'bi bi-headphones', title: 'Mock Mode', desc: '30-minute, 4-part test. Audio plays automatically and advances per section. No rewinding — exactly like the real exam. Animated waveform visualiser throughout.' },
    { icon: 'bi bi-sliders', title: 'Practice Mode', desc: 'Full audio controls: play/pause, restart, ±15s seek, scrubable progress bar. 10-minute timer per part. Auto-saves answers and position so you can resume where you left off.' },
];

const analysisFeatures = [
    { icon: 'bi bi-speedometer2', title: 'Dashboard', desc: 'Daily study streak with flame icon, weekly activity bar chart (minutes per day) and a rotating promo carousel showing streak, target band and upgrade prompts.' },
    { icon: 'bi bi-pie-chart', title: 'Radar Chart', desc: 'Visual overview of relative strengths across all four skills in one glance.' },
    { icon: 'bi bi-graph-up', title: 'Band Trend Chart', desc: 'Line chart tracking your band score trend over your last 10 attempts per skill.' },
    { icon: 'bi bi-lightbulb', title: 'AI Recommendations', desc: 'Personalised suggestions for where to focus next, weakest topics with band scores and most frequent errors with occurrence counts.' },
];

const gamificationFeatures = [
    { icon: 'bi bi-fire', title: 'Daily Streak', desc: 'Study every day to build a streak shown on home and profile. Sound cue plays the first time your streak increments each day.' },
    { icon: 'bi bi-trophy', title: 'Target Band', desc: 'Set your target band (4.0–9.0 in 0.5 steps). The app tracks progress toward it and personalises motivational copy.' },
    { icon: 'bi bi-patch-check', title: 'Level-Up Milestones', desc: 'Celebratory sound when you first hit your target band or cross a major milestone (7.0, 8.0, 9.0). Fires once per skill — never stale.' },
    { icon: 'bi bi-calendar2-week', title: 'Study Scheduler', desc: 'Weekly schedule with task creation (skill, time, duration, repeat pattern), conflict detection, edit/delete by occurrence or series and 5-minute push notification reminders.' },
];

const platforms = [
    { icon: 'bi bi-android2', title: 'Android', desc: 'Built with React Native / Expo. Full feature parity with Web including offline mode and push reminders. Available on Google Play.' },
    { icon: 'bi bi-display', title: 'Web', desc: 'Optimised for desktop. Adds resizable split panes for side-by-side reading, writing and chart layouts that match the real computer-based exam interface.' },
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

const ProjectIELTSTutors = () => {
    return (
        <>
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero" id="overview">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-mortarboard-fill"></i> AI-Powered IELTS Preparation
                            </span>
                            <h1>IELTS Tutors: Your AI-Powered Path to Your Target Band</h1>
                            <p className="bc-hero-sub">
                                All four IELTS skills under real exam conditions, with live AI feedback and
                                tracking that shows a candidate exactly what to fix next. Available on Android
                                and web, with the kind of detailed, actionable coaching a human tutor would provide.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <img src="/assets/images/projects/IELTS.png" alt="IELTS Tutors App" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-stars"></i>
                                <span>
                                    <strong>Full exam experience</strong>
                                    <span>Every skill. Real simulations. Instant AI feedback.</span>
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
                            Preparing for IELTS is expensive if you do it right and ineffective if you don&apos;t.
                            The available alternatives fall short in ways that directly affect the candidate&apos;s score.
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

            {/* ── Writing ── */}
            <section className="bc-section" id="writing">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Skill Module 01</span>
                        <h2>Writing</h2>
                        <p>
                            The most comprehensive module on the platform. Writing is the skill candidates
                            struggle with most and get the least useful feedback on — every tool from
                            free-form practice through full mock exams to AI coaching is here.
                        </p>
                    </div>
                    <Ledger items={writingModules} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-journal-x" style={{ fontSize: '2rem', color: 'var(--bc-accent)' }}></i></span>
                        <div>
                            <div className="bc-pub-label">Automatic error intelligence</div>
                            <h4>Mistake Vault</h4>
                            <p>
                                Errors from every Writing and Speaking session are automatically extracted and
                                categorised by AI — no manual logging needed. Each tracked error shows how often
                                it appears, across how many sessions, and carries a trend badge:{' '}
                                <strong>Worsening</strong>, <strong>Improving</strong>, or <strong>Stable</strong>.
                                Hit the Practise button on any error to drill it immediately.
                            </p>
                            <p style={{ marginTop: '8px' }}>
                                A candidate who can see not just their band score but which specific error types
                                are getting worse — and which are improving — has a fundamentally different
                                preparation experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Speaking ── */}
            <section className="bc-section bc-alt" id="speaking">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Skill Module 02</span>
                        <h2>Speaking</h2>
                        <p>
                            Speaking is the hardest IELTS skill to practise alone. A fully AI-conducted exam
                            with realistic examiner personas, silence detection and per-criterion scoring
                            makes it possible.
                        </p>
                    </div>
                    <Ledger items={speakingModules} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-info-circle"></i></span>
                        <div>
                            <div className="bc-pub-label">Why the distinctions matter</div>
                            <h4>Mock mode and Fun Practice serve different purposes</h4>
                            <p>
                                The mock exam applies real-exam restrictions — 6-second silence auto-submit,
                                randomised examiner personas, structured 3-part format — because that is what
                                builds exam reflex. Fun Practice removes all structure so candidates can build
                                fluency without performance anxiety. Both are needed; neither replaces the other.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Reading ── */}
            <section className="bc-section" id="reading">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Skill Module 03</span>
                        <h2>Reading</h2>
                        <p>
                            Academic and General Training test libraries with a full-featured exam interface,
                            every official question type and a resizable split pane on desktop that matches
                            the real computer-based exam layout.
                        </p>
                    </div>
                    <Ledger items={readingFeatures} />
                </div>
            </section>

            {/* ── Listening ── */}
            <section className="bc-section bc-alt" id="listening">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Skill Module 04</span>
                        <h2>Listening</h2>
                        <p>
                            Mock mode mirrors the real exam exactly — no rewinding. Practice mode gives
                            full audio controls. Both auto-save your position so you can always pick up
                            where you left off.
                        </p>
                    </div>
                    <Ledger items={listeningFeatures} />
                </div>
            </section>

            {/* ── Analysis ── */}
            <section className="bc-section" id="analysis">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Progress &amp; insights</span>
                        <h2>Analysis &amp; Progress Tracking</h2>
                        <p>
                            A full picture of where you stand — radar charts, band trend lines, AI-generated
                            recommendations, weakest topics and most frequent errors, all in one place.
                        </p>
                    </div>
                    <SpecGrid items={analysisFeatures} />
                </div>
            </section>

            {/* ── Gamification ── */}
            <section className="bc-section bc-alt" id="gamification">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Engagement &amp; planning</span>
                        <h2>Gamification &amp; Study Scheduler</h2>
                        <p>
                            Consistent daily practice is the single biggest predictor of IELTS improvement.
                            Streaks, milestones, a target band tracker and a conflict-aware weekly planner
                            keep preparation on track.
                        </p>
                    </div>
                    <div className="bc-grid bc-grid-4">
                        {gamificationFeatures.map((item) => (
                            <div className="bc-card" key={item.title}>
                                <span className="bc-card-icon"><i className={item.icon}></i></span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-calendar2-check"></i></span>
                        <div>
                            <div className="bc-pub-label">Scheduler detail</div>
                            <h4>Conflict detection before saving, not after</h4>
                            <p>
                                A candidate who sets overlapping study sessions gets a warning before saving —
                                not a silent collision that corrupts their weekly plan. Tasks support repeat
                                patterns and can be edited or deleted by occurrence or by series.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Platform ── */}
            <section className="bc-section" id="platform">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Availability</span>
                        <h2>Platform</h2>
                        <p>Available on Android and web with close feature parity across both.</p>
                    </div>
                    <SpecGrid items={platforms} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-google-play"></i></span>
                        <div>
                            <div className="bc-pub-label">Available now</div>
                            <h4>Android app on Google Play · Web app at IELTS Tutors</h4>
                            <p>
                                Full feature parity across Android and web. iOS is in progress.
                                The free tier covers all four skills with no card required.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <CtaBand />
        </>
    );
};

export default ProjectIELTSTutors;
