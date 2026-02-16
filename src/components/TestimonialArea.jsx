import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import testimonialsData from '../data/testimonials.json';

const TestimonialArea = () => {

    // Swiper options based on original owl carousel settings
    const swiperOptions = {
        modules: [Autoplay, Navigation],
        loop: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        // pagination: {
        //     clickable: true,
        //     bulletClass: 'swiper-pagination-bullet owl-dot',
        //     bulletActiveClass: 'swiper-pagination-bullet-active active',
        // },
        navigation: true, // You might need to style the swiper navigation buttons or create custom ones
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            992: { slidesPerView: 1 },
        }
    };

    return (
        <div className="testimonial-area style-one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            
                             <h2 style={{color: "#0C5ADB", paddingBottom:"10px"}}>Testimonial</h2>
                            <h1>Customer’s Awesome Feedback</h1>
                            <h1>About Our Services</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Swiper {...swiperOptions} className="testi-list-1">
                        {testimonialsData.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="col-lg-12 text-center">
                                    <div className="single-testimonial-box">
                                        <div className="testi-desc">
                                            <p
                                                style={
                                                    window.innerWidth <= 767
                                                        ? { paddingTop: 8, marginTop: 0 }
                                                        : undefined
                                                }
                                            >
                                                {testimonial.feedback}
                                            </p>
                                        </div>
                                        <div className="testi-rating">
                                            <ul>
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <li key={i}><i className="bi bi-star-fill"></i></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="testi-author">
                                            <h4>{testimonial.name}</h4>
                                            <p>{testimonial.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TestimonialArea;
