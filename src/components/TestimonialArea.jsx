import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionHead from './SectionHead';
import testimonialsData from '../data/testimonials.json';

const pad = (n) => String(n).padStart(2, '0');

/** "Medical Director, United Hospital Ltd." -> "United Hospital Ltd." */
const orgOf = (designation) => {
    const at = designation.indexOf(', ');
    return at === -1 ? designation : designation.slice(at + 2);
};

/** Initials, ignoring honorifics: "Dr. Tahmina Rahman" -> "TR". */
const initialsOf = (name) =>
    name
        .replace(/^(Dr|Md|Mr|Mrs|Ms|Prof)\.?\s+/i, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();

const TestimonialArea = () => {
    const swiperRef = useRef(null);
    const [active, setActive] = useState(0);

    return (
        <section className="bm-section bm-section--surface bm-grid-wash bm-voices">
            <div className="bm-container">
                <SectionHead
                    eyebrow="Testimonials"
                    title="What our partners say"
                    lead="Hospitals, manufacturers, pharmaceutical groups and government teams on what changed once the systems went live."
                />

                <div className="bm-voices__layout">
                    <div className="bm-voices__index">
                        <p className="bm-voices__index-label">Selected partners</p>
                        <ul>
                            {testimonialsData.map((testimonial, i) => (
                                <li key={testimonial.id}>
                                    <button
                                        type="button"
                                        className={i === active ? 'is-active' : undefined}
                                        aria-pressed={i === active}
                                        onClick={() => swiperRef.current?.slideToLoop(i)}
                                    >
                                        <em>{pad(i + 1)}</em>
                                        <span>
                                            <strong>{testimonial.name}</strong>
                                            <small>{orgOf(testimonial.designation)}</small>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bm-voices__stage">
                        <Swiper
                            modules={[Autoplay]}
                            loop
                            autoplay={{ delay: 9000, disableOnInteraction: false }}
                            slidesPerView={1}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onSlideChange={(swiper) => setActive(swiper.realIndex)}
                        >
                            {testimonialsData.map((testimonial) => (
                                <SwiperSlide key={testimonial.id}>
                                    <figure className="bm-voice">
                                        <span className="bm-voice__mark" aria-hidden="true">&ldquo;</span>
                                        <blockquote className="bm-voice__text">{testimonial.feedback}</blockquote>
                                        <figcaption className="bm-voice__foot">
                                            <span className="bm-voice__monogram" aria-hidden="true">
                                                {initialsOf(testimonial.name)}
                                            </span>
                                            <span className="bm-voice__who">
                                                <strong>{testimonial.name}</strong>
                                                <small>{testimonial.designation}</small>
                                            </span>
                                            <ul
                                                className="bm-voice__stars"
                                                aria-label={`${testimonial.rating} out of 5`}
                                            >
                                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                    <li key={i}>
                                                        <i className="bi bi-star-fill" aria-hidden="true"></i>
                                                    </li>
                                                ))}
                                            </ul>
                                        </figcaption>
                                    </figure>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="bm-voices__controls">
                            <p className="bm-voices__counter">
                                <span>{pad(active + 1)}</span> / {pad(testimonialsData.length)}
                            </p>
                            <div className="bm-voices__nav">
                                <button
                                    type="button"
                                    aria-label="Previous testimonial"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                >
                                    <i className="bi bi-arrow-left" aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next testimonial"
                                    onClick={() => swiperRef.current?.slideNext()}
                                >
                                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialArea;
