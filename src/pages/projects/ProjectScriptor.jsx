import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

const heroStats = [
    { icon: 'bi bi-window-stack', num: '7 Formats', label: 'LaTeX, Word, PowerPoint, Markdown, PDF, whiteboard and knowledge graph in one project' },
    { icon: 'bi bi-collection', num: '6,000+', label: 'LaTeX, Word and PowerPoint templates across 12 categories' },
    { icon: 'bi bi-tools', num: '79 Tools', label: 'Structural document-editing tools across three AI agents' },
    { icon: 'bi bi-people', num: 'Real-Time', label: 'Live co-editing with named cursors on all three editing surfaces' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'Scriptor' },
    { icon: 'bi bi-tag', label: 'Category', value: 'SaaS / AI Document Workspace' },
    { icon: 'bi bi-broadcast', label: 'Status', value: 'Live in production' },
    { icon: 'bi bi-phone', label: 'Platforms', value: 'Web and Android (iOS in progress)' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
    { icon: 'bi bi-globe', label: 'Live URL', value: 'scriptor.space' },
];

const problems = [
    {
        icon: 'bi bi-diagram-3',
        title: 'Six Tools, Six Handoffs',
        desc: 'The paper is written in one editor, the report in another, the deck in a third, the notes in a fourth, the diagrams in a fifth and reviewer PDFs in a sixth. Every handoff loses context.',
    },
    {
        icon: 'bi bi-shield-exclamation',
        title: 'No Single Source of Truth',
        desc: "A project's state — who can access it, what changed, what it used to say — lives in six systems with six different answers. No shared version history, collaborator list or permission model.",
    },
    {
        icon: 'bi bi-bug',
        title: 'LaTeX Fails On Its Own Toolchain',
        desc: 'A missing package. Then a missing font. Then it compiles, but every citation renders as [?] because the build needed three passes and ran one. Most tools print the raw log and leave the user to decode it.',
    },
    {
        icon: 'bi bi-clipboard-x',
        title: 'AI That Never Touches The File',
        desc: 'Most writing assistants produce text in a chat window that the user copies out by hand. That is close to useless for structured formats, where the real work is structural rather than textual.',
    },
];

const capabilities = [
    { icon: 'bi bi-braces', title: 'Pro-Level LaTeX Editor', desc: 'Full LaTeX authoring in the browser. Upload existing projects, compile in real time, and start from thousands of templates for papers, theses and CVs.' },
    { icon: 'bi bi-file-earmark-word', title: 'Word Document Editor', desc: 'Create and edit .docx with a live, fully interactive editing surface. Start from report, letter or recipe templates; download as Word or PDF.' },
    { icon: 'bi bi-easel', title: 'PowerPoint Editor', desc: 'Slide editing from a blank deck or a pitch-deck template, with AI-assisted refinement of structure and copy.' },
    { icon: 'bi bi-robot', title: 'AI Writing Assistant', desc: 'Context-aware chat that rewrites, restructures and expands Word, PowerPoint and LaTeX content, applying every change directly to the file.' },
    { icon: 'bi bi-markdown', title: 'Real-Time Markdown', desc: 'Live rendered preview as you type, with GitHub-flavoured Markdown, math blocks, syntax highlighting and custom themes.' },
    { icon: 'bi bi-easel2', title: 'Whiteboarding', desc: 'Infinite canvas or paged mode for structured visual notes, diagrams and presentation-ready boards.' },
    { icon: 'bi bi-file-earmark-pdf', title: 'PDF Annotation', desc: 'Open any PDF and annotate it through a drawing overlay. The source file is never modified.' },
    { icon: 'bi bi-share', title: 'Knowledge Graph', desc: 'Interactive map of the connections between notes, documents and projects, so related work surfaces itself.' },
    { icon: 'bi bi-clock-history', title: 'Full Version History', desc: 'Every save versioned automatically, including AI edits, with per-author change highlighting and one-click restore.' },
];

const officeFeatures = [
    { icon: 'bi bi-file-earmark-plus', title: 'Templates To Start From', desc: 'Report, letter and recipe layouts for Word; blank and pitch-deck for PowerPoint. Or upload your own .docx and .pptx.' },
    { icon: 'bi bi-download', title: 'Export In Place', desc: 'Download as Word, PowerPoint, RTF or PDF without leaving the workspace.' },
    { icon: 'bi bi-robot', title: 'A Dedicated AI Agent Per Format', desc: 'Word and PowerPoint each get their own agent with structural editing tools, not a generic text generator.' },
    { icon: 'bi bi-paperclip', title: 'Reference Attachments', desc: 'Attach PDFs or Word files to a chat turn to give the agent extra context for the edit you are asking for.' },
    { icon: 'bi bi-arrow-clockwise', title: 'Automatic Preview Refresh', desc: 'The rendered document reloads itself after every AI edit, so what you see is always the current file.' },
    { icon: 'bi bi-clock-history', title: 'Versioned Like Everything Else', desc: 'Office edits are captured as project versions, on the same timeline as LaTeX, Markdown and mobile saves.' },
];

const collaborationSurfaces = [
    { icon: 'bi bi-code-square', title: 'Code Editor — Markdown, LaTeX, Plain Text', desc: 'Coloured live carets with names and avatars. Concurrent typing in the same paragraph merges cleanly instead of overwriting.' },
    { icon: 'bi bi-file-earmark-word', title: 'Word', desc: 'A shared live session: edits and cursors are live inside the document itself.' },
    { icon: 'bi bi-easel', title: 'PowerPoint', desc: 'A shared live session: edits and cursors are live inside the deck.' },
];

const collaborationBehaviour = [
    'Every cursor has a name. Collaborators appear as named, coloured carets in the document and in the file tree, so you can see who is working where.',
    'Nobody\u2019s edits get lost. Concurrent edits converge rather than resolving to last-write-wins.',
    'Reviewers stay reviewers. Read-only collaborators follow along live and can still compile and export, enforced independently at every layer rather than hidden in the UI.',
    'Consistent identity colours. A collaborator\u2019s caret colour is the same colour their changes get in version history, so the cursor list and the diff match.',
    'Invitations by email as viewer or editor, on a whole project, a folder or a single file, with inline accept or decline and push notifications on mobile.',
];

const agents = [
    {
        icon: 'bi bi-braces',
        title: 'LaTeX',
        prompt: 'Resolve the compilation errors and update every figure reference.',
        desc: 'Reads the whole multi-file project, edits any file or the preamble, compiles the project itself, and iterates until it builds.',
    },
    {
        icon: 'bi bi-file-earmark-word',
        title: 'Word',
        prompt: 'Expand the findings section and turn the comparison into a table.',
        desc: 'Fills named sections, creates and populates tables, inserts sections that clone the surrounding style, and manages headers, footers, comments, footnotes and images.',
    },
    {
        icon: 'bi bi-easel',
        title: 'PowerPoint',
        prompt: 'Add a summary slide and tighten the bullets across this deck.',
        desc: 'Adds and deletes slides, rewrites bullet lists, sets shape text and backgrounds, and restructures whole decks.',
    },
];

const agentGuardrails = [
    'It verifies its own work. If the agent claims it finished without a single editing tool having run, the reply is retracted and it is required to use tools. After editing, it must re-read the document and confirm the change landed before it is allowed to say it is done.',
    'It can see the result. The agent renders a page of the compiled or converted document to an image and looks at it, so it judges its own layout instead of trusting that the markup was right.',
    'It cannot thrash. Identical repeated tool calls are rejected, and after any failed lookup the agent must re-read the document before it is allowed to modify anything.',
];

const engineering = [
    {
        icon: 'bi bi-wrench-adjustable',
        title: 'A LaTeX Compiler That Repairs Its Own Environment',
        desc: 'Compilation is a state machine with three recovery stages, narrated into a log a person can actually read. The engine is auto-detected from the document itself — magic comments, document class, font packages, CJK commands and source encoding decide between pdfLaTeX, XeLaTeX and LuaLaTeX. Missing packages are parsed out of the log, resolved against the distribution index, installed, and the compile retried. Missing fonts install themselves, then degrade gracefully: if a font package cannot be installed, the source is rewritten to safe equivalents so the document renders with the wrong font rather than not rendering at all.',
    },
    {
        icon: 'bi bi-arrow-repeat',
        title: 'Bibliography-Aware Multi-Pass Builds',
        desc: 'After the first pass the auxiliary file is inspected to choose the right bibliography processor, then compilation continues for as long as LaTeX keeps asking for a rerun. The subtle part: TeX wraps log lines at about 79 columns and breaks them mid-word, so a rerun request can arrive split across two lines and a naive match misses it — costing a pass and leaving every citation unresolved. Detection checks literal hints, the same hints against a whitespace-stripped copy of the log, and a catch-all pattern, with a dedicated regression test behind it.',
    },
    {
        icon: 'bi bi-shield-lock',
        title: 'Keeping A Live Office Session And An AI Agent Apart',
        desc: 'A user has a Word file open and asks the AI to add a section. The agent rewrites the file, but the live editing session is still holding its own in-memory copy, and its next autosave would push that stale copy back over the agent\u2019s work. The fix is an edit guard: for 90 seconds after a turn in which the agent modified the file, incoming saves from the live session are acknowledged as successful and their contents discarded. The session sees a clean save and reloads; the AI edit survives.',
    },
    {
        icon: 'bi bi-files',
        title: 'Real-Time Editing That Cannot Duplicate A File',
        desc: 'Two people open the same file at the same moment. If each client seeds its own shared document from stored content, a conflict-free merge correctly keeps both insertions — and the file now contains itself twice. Scriptor runs an authoritative document room per file that seeds exactly once, from the database, while holding a lock. Writes back to storage are debounced after typing stops, force-flushed on a ceiling and on teardown, and a repetition guard refuses to persist content that is a verbatim repeat of what was last stored.',
    },
];

const degradation = [
    { icon: 'bi bi-clock-history', title: 'Version Capture Fails', desc: 'Logged and surfaced as a degraded indicator. The save still commits — a failure inside history never fails the user\u2019s save.' },
    { icon: 'bi bi-speedometer', title: 'Rate Limiter Unavailable', desc: 'Fails open rather than locking users out of their own documents.' },
    { icon: 'bi bi-coin', title: 'Credit Metering Fails', desc: 'Fails open and the AI turn proceeds.' },
    { icon: 'bi bi-image', title: 'A Figure Is Missing At Compile Time', desc: 'Compiles anyway, so LaTeX itself can report the absent graphic in context.' },
    { icon: 'bi bi-wifi-off', title: 'Live Collaboration Service Down', desc: 'Falls back to normal autosave. The file stays editable.' },
    { icon: 'bi bi-hdd', title: 'Cache Unavailable', desc: 'Automatic in-memory fallback.' },
];

const architecture = [
    {
        icon: 'bi bi-hdd-stack',
        title: 'One System Of Record',
        desc: 'The core API owns users, projects, files, permissions, billing and version history. It is the only component in the platform that can authorise anything.',
    },
    {
        icon: 'bi bi-boxes',
        title: 'Specialised Services, No Databases',
        desc: 'Long-lived connections, AI turns that stream for minutes, document format manipulation and office session hosting each get their own service. None owns a database. Each verifies a short-lived signed token from the core API that carries the user, the resource, and whether that user may edit it — so a read-only collaborator stays read-only in every service independently.',
    },
    {
        icon: 'bi bi-shield-check',
        title: 'Everything Is Same-Origin',
        desc: 'A single reverse proxy serves the app and fronts every service, so the browser never makes a cross-origin request and sessions work without special cases. The stack composes by profile, scaling from a five-container development stack to the full ten-container production deployment behind a zero-trust edge tunnel with no inbound ports open.',
    },
];

// const numbers = [
//     { icon: 'bi bi-code-slash', num: '196K', label: 'Lines of application code across 938 files' },
//     { icon: 'bi bi-hdd-network', num: '107', label: 'API endpoints across 15 backend modules' },
//     { icon: 'bi bi-tools', num: '79', label: 'AI editing tools across 3 format agents' },
//     { icon: 'bi bi-git', num: '434', label: 'Commits over roughly 5 months to production' },
//     { icon: 'bi bi-diagram-2', num: '34', label: 'Data models behind projects, files and billing' },
//     { icon: 'bi bi-box-seam', num: '10', label: 'Production containers, 4 backend services' },
//     { icon: 'bi bi-clipboard-check', num: '58', label: 'Backend test files, roughly 16,100 lines' },
//     { icon: 'bi bi-broadcast-pin', num: '6', label: 'Real-time channels for presence and live documents' },
// ];

const plans = [
    {
        name: 'Free',
        credits: '100 credits / mo',
        rows: [
            { label: 'LaTeX compiles / day', value: '30' },
            { label: 'Compile timeout', value: '500 s' },
            { label: 'Live office sessions', value: '1' },
            { label: 'Storage', value: '5 GB' },
            { label: 'History retention', value: '1 day' },
        ],
    },
    {
        name: 'Pro',
        credits: '500 credits / mo',
        rows: [
            { label: 'LaTeX compiles / day', value: '100' },
            { label: 'Compile timeout', value: '700 s' },
            { label: 'Live office sessions', value: '3' },
            { label: 'Storage', value: '25 GB' },
            { label: 'History retention', value: '15 days' },
        ],
    },
    {
        name: 'Pro Plus',
        credits: '1,000 credits / mo',
        rows: [
            { label: 'LaTeX compiles / day', value: '200' },
            { label: 'Compile timeout', value: '900 s' },
            { label: 'Live office sessions', value: '5' },
            { label: 'Storage', value: '50 GB' },
            { label: 'History retention', value: '30 days' },
        ],
    },
];

const stack = [
    { icon: 'bi bi-filetype-jsx', title: 'Frontend', desc: 'React, TypeScript, Vite and Tailwind CSS.' },
    { icon: 'bi bi-server', title: 'Backend', desc: 'Python, Django and Django REST Framework, async task workers, Redis, PostgreSQL and SQLite.' },
    { icon: 'bi bi-lightning-charge', title: 'Document Services', desc: 'Python and FastAPI over WebSockets for live documents, office sessions and AI turns.' },
    { icon: 'bi bi-phone', title: 'Mobile', desc: 'React Native, published on Google Play. iOS in progress.' },
    { icon: 'bi bi-cpu', title: 'AI', desc: 'A managed frontier language model with agentic tool-calling, prompt caching and vision.' },
    { icon: 'bi bi-braces-asterisk', title: 'LaTeX', desc: 'A full TeX distribution with pdfLaTeX, XeLaTeX and LuaLaTeX, bibliography processing and source-to-PDF navigation.' },
    { icon: 'bi bi-box', title: 'Infrastructure', desc: 'Docker with profile-based composition, a single-origin reverse proxy and a zero-trust edge tunnel.' },
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

const ProjectScriptor = () => {
    return (
        <>
            <Seo
                title="Scriptor document workspace"
                description="LaTeX, Word, PowerPoint, Markdown, whiteboards and PDF annotation in a single project, with one permission model and one version history."
                path="/project/scriptor"
            />
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-journal-code"></i> AI-Powered Document Workspace
                            </span>
                            <h1>Scriptor: Every Document Format In One AI-Powered Workspace</h1>
                            <p className="bc-hero-sub">
                                Scriptor puts LaTeX, Word, PowerPoint, Markdown, whiteboards and PDF annotation in a
                                single project — with one permission model, one version history, real-time
                                collaboration on every surface, and AI agents that edit documents structurally
                                instead of generating text you paste in.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <a
                                className="bc-hero-figure__link"
                                href="https://scriptor.space/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the live Scriptor workspace at scriptor.space in a new tab"
                            >
                                <img fetchpriority="high" src="/assets/images/projects/Scriptor.webp" alt="Scriptor Workspace" />
                                <span className="bc-hero-figure__cue">
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                    Open live site
                                </span>
                            </a>
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-stars"></i>
                                <span>
                                    <strong>Seven formats, one project</strong>
                                    <span>One folder tree, one collaborator list, one version history</span>
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
                            Technical and academic writing is spread across tools that do not talk to each other.
                            The cost is not the window-switching. It is that one project&apos;s state lives in six
                            systems that each answer differently.
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
                        <h2>Nine Capabilities, One Project</h2>
                        <p>
                            A single project holds a LaTeX manuscript, its Word cover letter, the PowerPoint of its
                            results, linked Markdown notes, whiteboards and annotated PDFs — under one folder tree,
                            one collaborator list and one attributed version history.
                        </p>
                    </div>

                    <Ledger items={capabilities} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-layout-sidebar-inset"></i></span>
                        <div>
                            <div className="bc-pub-label">The workspace shell</div>
                            <h4>What ties the nine surfaces together</h4>
                            <p>
                                Split-view editing with draggable panels, browser-like tabs across multiple projects,
                                tag-based organisation, a command palette, and search across the whole workspace.
                                The formats change; the environment around them does not.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Word and PowerPoint ── */}
            <section className="bc-section bc-alt" id="office">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">The largest addition</span>
                        <h2>Word And PowerPoint, In The Browser</h2>
                        <p>
                            This is the capability that turns Scriptor from a technical writing tool into a general
                            document workspace. Files open in a live, fully interactive office editing surface — real
                            formatting, real tables, real slide layouts — rendered server-side and driven from the
                            browser. Changes sync back into the project automatically, so an office file is a
                            first-class member of the folder tree rather than an attachment.
                        </p>
                    </div>

                    <SpecGrid items={officeFeatures} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-diagram-3"></i></span>
                        <div>
                            <div className="bc-pub-label">What it took</div>
                            <h4>Three pieces of infrastructure behind one feature</h4>
                            <p>
                                A document-session service to host live editing, a file-serving protocol layer so the
                                editing surface can read and write project files under Scriptor&apos;s own permissions,
                                and a conflict guard for the case where an AI agent and a live editing session write
                                to the same file at the same moment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Collaboration ── */}
            <section className="bc-section" id="collaboration">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Share securely</span>
                        <h2>Real-Time Collaboration On Every Surface</h2>
                        <p>
                            Invite by email as viewer or editor, on a whole project, a folder or a single file. Live
                            co-editing works across all three editing surfaces, not just one.
                        </p>
                    </div>

                    <SpecGrid items={collaborationSurfaces} />

                    <div className="bc-grid bc-grid-2" style={{ marginTop: '40px' }}>
                        {collaborationBehaviour.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── AI ── */}
            <section className="bc-section bc-alt" id="ai">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Agentic editing</span>
                        <h2>AI That Edits Your Documents, Not Just Chat</h2>
                        <p>
                            The assistant is a tool-calling agent rather than a text generator. Each format has its own
                            agent with structural editing tools, and every change is applied directly to the file.
                            Every plan includes credit-based AI access, starting free with 100 credits.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {agents.map((agent) => (
                            <div className="bc-card" key={agent.title}>
                                <span className="bc-card-icon"><i className={agent.icon}></i></span>
                                <h4>{agent.title}</h4>
                                <p className="bc-prompt">&ldquo;{agent.prompt}&rdquo;</p>
                                <p>{agent.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bc-grid bc-grid-3" style={{ marginTop: '40px' }}>
                        {agentGuardrails.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{item}</p>
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
                            Four problems that took real work. Each one is the difference between a feature that demos
                            and a feature that holds up on somebody&apos;s deadline.
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

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-quote"></i></span>
                        <div>
                            <div className="bc-pub-label">From the codebase</div>
                            <h4>Why three passes, not one</h4>
                            <p>
                                &ldquo;natbib/BibTeX needs three passes minimum: pass 1 writes the citation records to
                                the auxiliary file, the bibliography is built, pass 2 reads it back, and only pass 3
                                can resolve the citations in the body.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Reliability ── */}
            <section className="bc-section bc-alt" id="reliability">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Failure behaviour</span>
                        <h2>Auxiliary Systems Degrade Instead Of Breaking Your Work</h2>
                        <p>
                            One invariant runs through the platform: nothing on the side of the user&apos;s document is
                            allowed to take the document down with it.
                        </p>
                    </div>

                    <SpecGrid items={degradation} />
                </div>
            </section>

            {/* ── Architecture ── */}
            <section className="bc-section" id="architecture">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it is built</span>
                        <h2>Architecture In Brief</h2>
                        <p>
                            A web and Android client behind a single origin, a core API that owns the truth, and
                            specialised services for the work a request/response API cannot do.
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
            </section>

            {/* ── Numbers ── */}
            {/* <section className="bc-section bc-alt" id="numbers">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">By the numbers</span>
                        <h2>Scale Of The Build</h2>
                        <p>Roughly five months from first commit to production, across a web app, an Android app, a core API and four services.</p>
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

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-file-earmark-ruled"></i></span>
                        <div>
                            <div className="bc-pub-label">Engineering process</div>
                            <h4>Specs first, and the requirement numbers live in the code</h4>
                            <p>
                                Larger subsystems were written as formal specs before implementation. The version
                                history spec alone is 294 lines of numbered requirements plus a 638-line design
                                document, and those requirement numbers are cited in the source itself, so the reason
                                a given line exists is discoverable from the code. Testing pairs property-based tests
                                on the version-history invariants and core state machines with conventional
                                example-based tests.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ── Plans ── */}
            {/* <section className="bc-section" id="plans">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Plans</span>
                        <h2>Free To Start, Metered By Credits</h2>
                        <p>
                            Every plan includes AI access. Cost is metered per turn against a transactional credit
                            ledger with monthly grants, and one-time top-ups are available on any plan.
                        </p>
                    </div>

                    <div className="bc-grid bc-grid-3">
                        {plans.map((plan) => (
                            <div className="bc-card bc-premium-card" key={plan.name}>
                                <h4 className="bc-premium-name">{plan.name}</h4>
                                <div className="bc-premium-price">{plan.credits}</div>
                                <ul className="bc-premium-list">
                                    {plan.rows.map((row) => (
                                        <li key={row.label}>
                                            {row.label}
                                            <strong>{row.value}</strong>
                                        </li>
                                    ))}
                                </ul>
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
                        <p>Chosen so every surface — browser, mobile, compiler and AI agent — talks to the same system of record.</p>
                    </div>

                    <SpecGrid items={stack} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon bc-pub-icon-logo"><img src="/assets/images/scriptor_logo.png" alt="Scriptor logo" /></span>
                        <div>
                            <div className="bc-pub-label">Try it live</div>
                            <h4>Scriptor is live, and the free plan needs no card</h4>
                            <p>
                                Start with 100 AI credits, 30 LaTeX compiles a day and 5 GB of storage. Available on
                                the web and on Android, with iOS in progress.
                            </p>
                            <a className="bc-pub-status" href="https://scriptor.space/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-box-arrow-up-right"></i> scriptor.space
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

export default ProjectScriptor;
