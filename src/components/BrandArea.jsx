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
            0: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
        }
    };

    // Fallback if twitter-x is not available in older versions
    const safeBrandIcons = [
        "bi bi-google",
        "bi bi-microsoft",
        "bi bi-apple",
        "bi bi-github",
        "bi bi-facebook",
        "bi bi-twitter",
        "bi bi-linkedin",
        "bi bi-youtube"
    ];

    return (
        <div className="brand-area style-two">
            <div className="container">
                <div className="row">
                    <Swiper {...swiperOptions} className="brand-list-1">
                        {safeBrandIcons.map((icon, index) => (
                            <SwiperSlide key={index}>
                                <div className="col-lg-12">
                                    <div className="single-brand-box hook-box">
                                        <div className="brand-thumb">
                                            <i className={icon} style={{ fontSize: '3rem', color: '#6c757d', transition: '0.3s' }}></i>
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

export default BrandArea;
