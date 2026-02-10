import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TestimonialArea = () => {

    // Swiper options based on original owl carousel settings
    const swiperOptions = {
        modules: [Autoplay, Navigation],
        loop: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
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
                            <h4>Testimonial</h4>
                            <h1>Customer’s Awesome Feedback</h1>
                            <h1>About Our Services</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Swiper {...swiperOptions} className="testi-list-1">
                        <SwiperSlide>
                            <div className="col-lg-12 text-center">
                                <div className="single-testimonial-box">
                                    <div className="testi-desc">
                                        <p>Completely extend leveraged customer service rather than performance based imperatives.
                                            magnetic relationships rather than leveraged e-markets. Rapidiously transform timely niches
                                            technology. Enthusiastically e-enable global e-markets for cooperative e-business.
                                            Authoritatively deliver highly efficient expertise</p>
                                    </div>
                                    <div className="testi-rating">
                                        <ul>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                        </ul>
                                    </div>
                                    <div className="testi-author">
                                        <h4>Venkatesh Iyer</h4>
                                        <p>UI Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12 text-center">
                                <div className="single-testimonial-box">
                                    <div className="testi-desc">
                                        <p>Completely extend leveraged customer service rather than performance based imperatives.
                                            magnetic relationships rather than leveraged e-markets. Rapidiously transform timely niches
                                            technology. Enthusiastically e-enable global e-markets for cooperative e-business.
                                            Authoritatively deliver highly efficient expertise</p>
                                    </div>
                                    <div className="testi-rating">
                                        <ul>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                        </ul>
                                    </div>
                                    <div className="testi-author">
                                        <h4>John D. Alexon</h4>
                                        <p>UI Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12 text-center">
                                <div className="single-testimonial-box">
                                    <div className="testi-desc">
                                        <p>Completely extend leveraged customer service rather than performance based imperatives.
                                            magnetic relationships rather than leveraged e-markets. Rapidiously transform timely niches
                                            technology. Enthusiastically e-enable global e-markets for cooperative e-business.
                                            Authoritatively deliver highly efficient expertise</p>
                                    </div>
                                    <div className="testi-rating">
                                        <ul>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                        </ul>
                                    </div>
                                    <div className="testi-author">
                                        <h4>Alex Brock </h4>
                                        <p>UI Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12 text-center">
                                <div className="single-testimonial-box">
                                    <div className="testi-desc">
                                        <p>Completely extend leveraged customer service rather than performance based imperatives.
                                            magnetic relationships rather than leveraged e-markets. Rapidiously transform timely niches
                                            technology. Enthusiastically e-enable global e-markets for cooperative e-business.
                                            Authoritatively deliver highly efficient expertise</p>
                                    </div>
                                    <div className="testi-rating">
                                        <ul>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                            <li><i className="bi bi-star-fill"></i></li>
                                        </ul>
                                    </div>
                                    <div className="testi-author">
                                        <h4>Abhishek Sharma</h4>
                                        <p>UI Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TestimonialArea;
