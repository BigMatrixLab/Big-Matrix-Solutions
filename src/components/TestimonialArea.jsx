import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionHead from './SectionHead';
import testimonialsData from '../data/testimonials.json';

const TestimonialArea = () => {
    const swiperRef = useRef(null);

    return (
        <section className="bm-section">
            <div className="bm-container">
                <SectionHead eyebrow="Testimonials" title="What our partners say" />

                <Swiper
                    modules={[Autoplay]}
                    loop
                    autoplay={{ delay: 9000, disableOnInteraction: false }}
                    slidesPerView={1}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                >
                    {testimonialsData.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <figure className="bm-quote">
                                <span className="bm-quote__mark" aria-hidden="true">“</span>
                                <blockquote className="bm-quote__text">{testimonial.feedback}</blockquote>
                                <ul className="bm-quote__stars" aria-label={`${testimonial.rating} out of 5`}>
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <li key={i}><i className="bi bi-star-fill" aria-hidden="true"></i></li>
                                    ))}
                                </ul>
                                <figcaption>
                                    <p className="bm-quote__name">{testimonial.name}</p>
                                    <p className="bm-quote__role">{testimonial.designation}</p>
                                </figcaption>
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="bm-quote-nav">
                    <button type="button" aria-label="Previous testimonial" onClick={() => swiperRef.current?.slidePrev()}>
                        <i className="bi bi-arrow-left" aria-hidden="true"></i>
                    </button>
                    <button type="button" aria-label="Next testimonial" onClick={() => swiperRef.current?.slideNext()}>
                        <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialArea;
