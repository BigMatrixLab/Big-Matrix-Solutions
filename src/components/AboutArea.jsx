import React from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';

const CAPABILITIES = [
  { icon: 'bi-patch-check', title: 'Trusted research solutions' },
  { icon: 'bi-people', title: 'Dedicated engineering team' },
  { icon: 'bi-headset', title: '24/7 technical support' },
  { icon: 'bi-graph-up-arrow', title: 'Measured delivery outcomes' },
];

const STATS = [
  { value: '10', suffix: '+', label: 'Projects delivered' },
  { value: '6', suffix: '', label: 'Practice areas' },
  { value: '5', suffix: '', label: 'Partner institutions' },
];

const AboutArea = () => {
  return (
    <section className="bm-section bm-about">
      <div className="bm-container">
        <SectionHead
          eyebrow="Our dedicated lab"
          title="Transforming healthcare with AI-powered systems"
        />
        <div className="bm-about__grid">
          <div>
            <div className="bm-about__visual">
              <img
                src="/assets/images/home-2/about-thumb.png"
                alt="Big-Matrix research and development lab"
                loading="lazy"
              />
            </div>
            <dl className="bm-about__stats">
              {STATS.map((stat) => (
                <div className="bm-about__stat" key={stat.label}>
                  <dt>
                    {stat.value}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="bm-about__title">Big-Matrix Research &amp; Development Lab</h3>
            <p className="bm-about__body">
              We develop software and tooling for medical research and clinical workflows:
              AI-powered diagnostic systems, machine learning models, and data analytics
              platforms that shorten the path from discovery to patient outcome.
            </p>
            <ul className="bm-checks">
              {CAPABILITIES.map((item) => (
                <li key={item.title}>
                  <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <Link to="https://lab.big-matrix.com/" className="bm-button">
              Visit the lab
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutArea;
