import '../../assets/css/ProjectShowcase.css';
import ShowcaseFacts from '../../components/showcase/ShowcaseFacts';
import CtaBand from '../../components/CtaBand';
import Seo from '../../components/Seo';

const heroStats = [
    { icon: 'bi bi-file-earmark-binary', num: '~9 MB', label: 'One native Windows executable with no Qt, VTK, DCMTK or Python dependency' },
    { icon: 'bi bi-grid-3x3', num: '5 × 5', label: 'Split-screen panels with synchronised slice, zoom and window' },
    { icon: 'bi bi-box', num: '3D', label: 'MPR, GPU volume rendering and surface models with STL export' },
    { icon: 'bi bi-hdd-network', num: 'PACS', label: 'C-FIND, C-MOVE and C-GET, a storage receiver and DICOMweb' },
];

const projectFacts = [
    { icon: 'bi bi-box', label: 'Product', value: 'DicomViewer' },
    { icon: 'bi bi-tag', label: 'Category', value: 'Medical Imaging / DICOM Viewer' },
    { icon: 'bi bi-people', label: 'Users', value: 'Radiologists, clinicians, researchers, clinic IT' },
    { icon: 'bi bi-windows', label: 'Platform', value: 'Windows desktop, single executable' },
    { icon: 'bi bi-file-earmark-medical', label: 'Formats', value: 'DICOM · DICOMDIR · NIfTI · TIFF' },
    { icon: 'bi bi-hourglass-split', label: 'Status', value: 'In development (v0.1.0)' },
    { icon: 'bi bi-building', label: 'Developed By', value: 'Big-Matrix Solutions' },
];

const problems = [
    {
        icon: 'bi bi-box-seam',
        title: 'Heavy Installs',
        desc: 'Many viewers pull in large runtimes and toolkits, which hospital IT has to approve, deploy and maintain on locked-down PCs.',
    },
    {
        icon: 'bi bi-hourglass-bottom',
        title: 'Slow On Large Studies',
        desc: 'Thin-slice CT and long fluoroscopy runs contain hundreds or thousands of images that have to stay responsive while scrolling.',
    },
    {
        icon: 'bi bi-square',
        title: '2D Only',
        desc: 'Reformatting, 3D rendering, PET-CT fusion and angiography subtraction are usually reserved for paid workstations.',
    },
    {
        icon: 'bi bi-plug',
        title: 'Disconnected From PACS',
        desc: 'Retrieving a prior study often means a separate tool or a request to IT, so comparisons happen late or not at all.',
    },
];

const core = [
    {
        icon: 'bi bi-search',
        title: 'Background Scanning',
        desc: 'A scanner reads DICOM headers from a folder, disc or DICOMDIR and groups them into studies and series while the first images are already on screen.',
    },
    {
        icon: 'bi bi-cpu',
        title: 'Multi-Core Decoding',
        desc: 'Images are decoded on several CPU cores into a shared pixel cache that feeds the 2D panels, the 3D volume builder and exports.',
    },
    {
        icon: 'bi bi-fast-forward',
        title: 'Read-Ahead',
        desc: 'The viewer reads ahead along the series in the direction the user is scrolling, so moving through a stack does not wait for the disk.',
    },
];

const reading = [
    { icon: 'bi bi-collection', title: 'Fast Series Browsing', desc: 'Multi-core decoding with read-ahead keeps large CT and MR stacks responsive. The series bar shows load progress for each series.' },
    { icon: 'bi bi-grid-3x3-gap', title: 'Split Screen And Sync', desc: 'Grid layouts from 1 × 1 to 5 × 5, with slice, zoom-and-pan and window synchronisation and cross-reference lines between panels.' },
    { icon: 'bi bi-brightness-high', title: 'Window And Display', desc: 'Mouse windowing, CT presets, full-dynamic and custom windows, negative, sharpening filters, rotation and flipping.' },
    { icon: 'bi bi-play-circle', title: 'Cine', desc: 'Playback of multi-frame and dynamic series with adjustable speed.' },
];

const measurement = [
    { icon: 'bi bi-rulers', title: 'Measurement Tools', desc: 'Length, ellipse, rectangle, polygon and freehand ROIs with area and pixel statistics, plus polyline, angle, Cobb angle, deviation, arrows and a 3D cursor.' },
    { icon: 'bi bi-calculator', title: 'Calculations', desc: 'Length ratio and ellipsoid or bullet volume calculated from drawn lengths.' },
    { icon: 'bi bi-graph-up', title: 'Time-Intensity Curves', desc: 'Mean ROI value plotted across the images of a dynamic series, with the values copyable as CSV.' },
    { icon: 'bi bi-files', title: 'Measurement Editing', desc: 'Copy, paste and duplicate measurements across panels or across a whole series.' },
];

const reconstruction = [
    { icon: 'bi bi-layers', title: '3D MPR', desc: 'Three linked planes with oblique rotation, and MIP, MinIP and average slabs of adjustable thickness.' },
    { icon: 'bi bi-badge-3d', title: 'Volume Rendering', desc: 'GPU ray casting with nine presets, including angiography, bone and MIP views, plus lasso sculpting with undo and 3D snapshots.' },
    { icon: 'bi bi-printer', title: 'Surface Models', desc: 'Iso-surface rendering with STL export for 3D printing, and rotating movies exported to MP4.' },
];

const fusion = [
    {
        icon: 'bi bi-intersect',
        title: 'PET-CT Fusion',
        desc: 'A second series is resampled through patient coordinates and overlaid in colour on the first, with a selectable colour scale and adjustable opacity.',
    },
    {
        icon: 'bi bi-heart-pulse',
        title: 'Digital Subtraction Angiography',
        desc: 'The mask frame is subtracted from every fluoroscopy image to leave contrast-filled vessels. Manual and automatic pixel-shift, a split mask for left and right halves, and a local "magic mask" correction computed in the background.',
    },
];

const archive = [
    { icon: 'bi bi-hdd-stack', title: 'Local Archive', desc: 'Import from folders, CDs and DVDs into a searchable SQLite database with thumbnails.' },
    { icon: 'bi bi-hdd-network', title: 'PACS Access', desc: 'C-ECHO, C-FIND, C-MOVE and C-GET to configured PACS nodes, a storage receiver for incoming studies, and DICOMweb nodes over HTTPS.' },
    { icon: 'bi bi-box-arrow-up', title: 'Export And Print', desc: 'JPEG, PNG, BMP and DICOM images, WMV and MP4 movies, clipboard copy and printing of one or all panels.' },
    { icon: 'bi bi-incognito', title: 'Anonymisation', desc: 'Template-based removal or replacement of patient tags before files leave the site.' },
];

const workflow = [
    { title: 'Open The Data', desc: 'Open a folder, files, a CD or DVD, a study from the local archive, or a PACS search result. The scanner groups images into studies and series and shows thumbnails in the series bar.' },
    { title: 'Read In 2D', desc: 'Drag series into panels, scroll with the wheel, adjust the window with the mouse and arrange a split-screen layout. Synchronised panels follow each other.' },
    { title: 'Measure And Annotate', desc: 'Measurement tools draw on the image. ROI labels show area and pixel statistics and update as the ROI is moved.' },
    { title: 'Reconstruct', desc: 'For a series of three or more slices, open 3D MPR or volume rendering. The volume is built in the background, with a coarse preview first for large series.' },
    { title: 'Apply Advanced Views', desc: 'Fusion overlays a PET series on CT in another panel. Subtraction turns a fluoroscopy run into a DSA sequence, and the mask can be shifted until bone edges disappear.' },
    { title: 'Share The Result', desc: 'Export images, movies or DICOM files, anonymise them if needed, print, or copy to the clipboard.' },
];

const stack = [
    { icon: 'bi bi-window', title: 'Interface', desc: 'Dear ImGui (docking) on GLFW and OpenGL. Immediate-mode UI keeps the executable small and redraws quickly during interaction.' },
    { icon: 'bi bi-image', title: 'Imaging', desc: 'In-house DICOM parser and codecs, OpenJPEG 2.5 and zlib. Full control over decoding speed and no large imaging toolkit to ship.' },
    { icon: 'bi bi-box', title: '3D', desc: 'Custom MPR reslicing, GPU volume ray casting and marching cubes. Reconstructions run on the graphics card, with a CPU fallback.' },
    { icon: 'bi bi-server', title: 'Data', desc: 'SQLite 3.46. A single-file local archive that needs no database server.' },
    { icon: 'bi bi-diagram-3', title: 'Networking', desc: 'In-house DIMSE over Winsock and DICOMweb over WinHTTP. Direct PACS connectivity using only components built into Windows.' },
    { icon: 'bi bi-film', title: 'Video', desc: 'Windows Media Foundation for MP4 and WMV export, without bundling a video library.' },
    { icon: 'bi bi-gear', title: 'Build', desc: 'CMake and MSVC, producing a single-file Release executable that can be copied or deployed on managed hospital PCs.' },
];

const role = [
    'Product design and user interface, following the layout and shortcut conventions of widely used desktop viewers.',
    'DICOM decoding, DICOM networking and the 3D rendering engine, written in-house in C++17.',
    'Desktop application development and single-file release builds.',
];

const futureDirections = [
    'Sending studies to PACS from the viewer.',
    'PDF report export.',
    'Undo and redo for annotations.',
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

const ProjectDicomViewer = () => {
    return (
        <>
            <Seo
                title="DicomViewer"
                description="A native Windows DICOM viewer in one small executable: 2D reading, measurements, 3D MPR and volume rendering, PET-CT fusion, angiography subtraction and PACS access."
                path="/project/dicomviewer"
            />
        <div className="bc-showcase">

            {/* ── Hero ── */}
            <section className="bc-hero">
                <div className="bc-container">
                    <div className="bc-hero-grid">
                        <div className="bc-hero-text">
                            <span className="bc-hero-badge">
                                <i className="bi bi-file-earmark-medical"></i> Medical Imaging / DICOM Viewer
                            </span>
                            <h1>DicomViewer: 2D, 3D And PACS In One Native Windows Executable</h1>
                            <p className="bc-hero-sub">
                                A desktop application for opening, reading and sharing medical images. It loads CT, MR,
                                PET, ultrasound, X-ray and fluoroscopy studies from folders, discs, a local archive or a
                                PACS server, and lets the reader scroll, measure, reconstruct in 3D and export without
                                installing a server or a runtime.
                            </p>
                        </div>
                        <figure className="bc-hero-figure">
                            <img src="/assets/images/projects/Dicom Viewer.png" alt="DicomViewer showing a CT study in the main reading window" />
                            <figcaption className="bc-figure-tag">
                                <i className="bi bi-file-earmark-binary"></i>
                                <span>
                                    <strong>About 9 MB, one file</strong>
                                    <span>No Qt, VTK, DCMTK or Python</span>
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
                            Clinics and patients regularly receive imaging studies on CDs, USB drives or from a remote
                            PACS, and the people who need to look at them are often not at a radiology workstation.
                            Full workstation software is expensive and heavy to deploy, and free viewers tend to give
                            up speed, 3D or connectivity.
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
                        <h2>A Self-Contained Viewer Around A Fast 2D Core</h2>
                        <p>
                            DICOM parsing, image decoding, DICOM networking and 3D rendering are implemented in our own
                            code. Everything else in the application sits on three pieces of plumbing that keep the
                            first image fast and every image after it faster.
                        </p>
                    </div>

                    <Cards items={core} cols={3} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-ui-checks-grid"></i></span>
                        <div>
                            <div className="bc-pub-label">Interface</div>
                            <h4>Only the commands that apply to what is on screen</h4>
                            <p>
                                The layout, toolbar and keyboard shortcuts follow the conventions of widely used desktop
                                viewers, so experienced readers can work without retraining. Commands enable themselves
                                as they become relevant: a user who has not loaded data yet sees only the ways to open it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Reading ── */}
            <section className="bc-section bc-alt" id="reading">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 01</span>
                        <h2>Reading And Navigation</h2>
                        <p>
                            The 2D core is where readers spend most of their time, so it carries the performance work:
                            multi-core decoding, read-ahead and layouts that stay in sync.
                        </p>
                    </div>
                    <Ledger items={reading} />
                </div>
            </section>

            {/* ── Measurement ── */}
            <section className="bc-section" id="measurement">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 02</span>
                        <h2>Measurement And Analysis</h2>
                        <p>
                            Measurements draw directly on the image and update their statistics as they are moved,
                            resized or copied to another panel.
                        </p>
                    </div>
                    <SpecGrid items={measurement} />
                </div>
            </section>

            {/* ── 3D ── */}
            <section className="bc-section bc-alt" id="3d">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 03</span>
                        <h2>3D Reconstruction</h2>
                        <p>
                            Any series of three or more slices can be opened in 3D. The volume is built in the
                            background, with a coarse preview first for large series.
                        </p>
                    </div>
                    <Cards items={reconstruction} cols={3} />
                </div>
            </section>

            {/* ── Fusion and subtraction ── */}
            <section className="bc-section" id="fusion">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 04</span>
                        <h2>Fusion And Subtraction</h2>
                        <p>
                            Two views that are usually reserved for paid workstations, built on the same pixel pipeline
                            as ordinary images so windowing, ROI statistics and export behave the same way.
                        </p>
                    </div>
                    <Cards items={fusion} cols={2} />
                </div>
            </section>

            {/* ── Archive, network and export ── */}
            <section className="bc-section bc-alt" id="archive">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Feature group 05</span>
                        <h2>Archive, Network And Export</h2>
                        <p>
                            A local archive for imported studies, a built-in DICOM network stack for PACS search,
                            retrieve and receive, and the export paths needed to share a result.
                        </p>
                    </div>
                    <SpecGrid items={archive} />
                </div>
            </section>

            {/* ── Workflow ── */}
            <section className="bc-section" id="workflow">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">How it works</span>
                        <h2>From Disc To Shared Result</h2>
                        <p>The main reading workflow, from loading a study to sending the result on.</p>
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
                        <p>C++17 throughout, with each dependency chosen so the result still ships as one file.</p>
                    </div>

                    <SpecGrid items={stack} />

                    <div className="bc-pub" style={{ marginTop: '48px' }}>
                        <span className="bc-pub-icon"><i className="bi bi-memory"></i></span>
                        <div>
                            <div className="bc-pub-label">Key architectural decision</div>
                            <h4>One shared pixel cache, decoded once</h4>
                            <p>
                                Decoded frames, already converted to modality values, serve the 2D panels, the read-ahead
                                planner, the 3D volume builder, fusion, subtraction and exports, so each image is decoded
                                once however many views use it. Window and level are applied as the last step, which lets
                                subtracted and fused images reuse the same windowing, ROI statistics and export path as
                                ordinary images.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Our role ── */}
            <section className="bc-section" id="role">
                <div className="bc-container">
                    <div className="bc-section-head">
                        <span className="bc-eyebrow">Our role</span>
                        <h2>Built End To End By Big-Matrix</h2>
                        <p>Design, engine and application, from the DICOM parser up to the release build.</p>
                    </div>
                    <div className="bc-grid bc-grid-3">
                        {role.map((item) => (
                            <div className="bc-benefit" key={item}>
                                <i className="bi bi-check-circle-fill"></i>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
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
                        <span className="bc-pub-icon"><i className="bi bi-shield-exclamation"></i></span>
                        <div>
                            <div className="bc-pub-label">Status</div>
                            <h4>In development, not for diagnostic use</h4>
                            <p>
                                DicomViewer is at version 0.1.0. It carries no regulatory clearance and should not be
                                used as the basis for a clinical diagnosis.
                            </p>
                            <span className="bc-pub-status"><i className="bi bi-gear"></i> C++17 + OpenGL + DICOM</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <CtaBand />
        </>
    );
};

export default ProjectDicomViewer;
