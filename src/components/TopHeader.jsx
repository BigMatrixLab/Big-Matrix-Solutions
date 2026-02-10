import React from 'react';

const TopHeader = () => {
    return (
        <div className="top-header-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="header-info">
                            <ul>
                                <li><i className="bi bi-geo-alt-fill"></i>New market Sandigo - California</li>
                                <li><i className="bi bi-envelope"></i>example@example.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="top-header-social-icon">
                            <ul>
                                <li className="time-line"><i className="bi bi-alarm"></i>9.10 am - 5.30 pm</li>
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
