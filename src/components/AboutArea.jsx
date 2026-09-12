import SectionHead from './SectionHead';

const LAB_URL = 'https://lab.big-matrix.com/';

const CAPABILITIES = [
  {
    icon: 'bi-patch-check',
    title: 'Trusted research',
    desc: 'Reproducible pipelines, methods documented for peer review.',
  },
  {
    icon: 'bi-people',
    title: 'One resident team',
    desc: 'Clinicians, ML researchers and platform engineers in the same room.',
  },
  {
    icon: 'bi-headset',
    title: 'Support that stays',
    desc: 'Monitoring and response for every system we put into production.',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Measured outcomes',
    desc: 'Each engagement tracked against agreed clinical and ops targets.',
  },
];

const STATS = [
  { value: '10', suffix: '+', label: 'Projects delivered' },
  { value: '6', suffix: '', label: 'Practice areas' },
  { value: '5', suffix: '', label: 'Partner institutions' },
];

const AboutArea = () => {
  return (
    <section className="bm-section bm-section--parallax bm-lab">
      <div className="bm-container">
        <SectionHead
          eyebrow="Our dedicated lab"
          title="Transforming healthcare with AI-powered systems"
          lead="Big-Matrix Research &amp; Development Lab is where the research happens — models and tooling that graduate into the products our clients run every day."
        />

        <div className="bm-lab__split">
          <figure className="bm-lab__visual">
            <span className="bm-lab__tag">R&amp;D facility</span>
            <img
              src="/assets/images/home-2/about-thumb.png"
              alt="Big-Matrix research and development lab"
              loading="lazy"
            />
          </figure>

          <div className="bm-lab__intro">
            <h3 className="bm-lab__title">Big-Matrix Research &amp; Development Lab</h3>
            <p className="bm-lab__body">
              We build AI models, software, and tools for medical research and clinical workflows. Our work includes AI-powered diagnostic systems, machine learning models, and data platforms that help turn research into better patient outcomes.
            </p>

            <a
              className="bm-button bm-lab__cta"
              href={LAB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the lab
              <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
            </a>

            <dl className="bm-lab__stats">
              {STATS.map((stat) => (
                <div className="bm-lab__stat" key={stat.label}>
                  <dt>
                    {stat.value}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ul className="bm-lab__caps">
          {CAPABILITIES.map((item, index) => (
            <li key={item.title}>
              <span className="bm-lab__caps-meta">
                <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                <em>{String(index + 1).padStart(2, '0')}</em>
              </span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutArea;
