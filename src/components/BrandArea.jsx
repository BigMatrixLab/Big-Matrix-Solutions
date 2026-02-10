import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BrandArea = () => {

    const swiperOptions = {
        modules: [Autoplay],
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
        }
    };

    return (
        <div className="brand-area style-two">
            <div className="container">
                <div className="row">
                    <Swiper {...swiperOptions} className="brand-list-1">
                        <SwiperSlide>
                            <div className="col-lg-12">
                                <div className="single-brand-box">
                                    <div className="brand-thumb">
                                        <img src="/assets/images/home-2/brand-1.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12">
                                <div className="single-brand-box">
                                    <div className="brand-thumb">
                                        <img src="/assets/images/home-2/brand-2.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12">
                                <div className="single-brand-box">
                                    <div className="brand-thumb">
                                        <img src="/assets/images/home-2/brand-3.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12">
                                <div className="single-brand-box">
                                    <div className="brand-thumb">
                                        <img src="/assets/images/home-2/brand-4.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12">
                                <div className="single-brand-box">
                                    <div className="brand-thumb">
                                        <img src="/assets/images/home-2/brand-5.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col-lg-12">
                                <div className="single-brand-box">
                                    <div className="brand-thumb">
                                        <img src="/assets/images/home-2/brand-4.png" alt="" />
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

export default BrandArea;
