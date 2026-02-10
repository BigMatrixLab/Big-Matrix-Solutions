import React from 'react';
import { Link } from 'react-router-dom';

const TeamArea = () => {
    return (
        <div className="team-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="section-title left style-two">
                            <h4>Dedicated Team</h4>
                            <h1>Meet Our Dedicated Member</h1>
                            <h1>For Any Enquery</h1>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="toptech-button style-one">
                            <Link to="/team">All Member<i className="bi bi-arrow-right-circle-fill"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-team-box">
                            <div className="team-thumb">
                                <img src="/assets/images/team/team-1.png" alt="" />
                            </div>
                            <div className="team-content">
                                <h4><Link to="/team-details">John D. Alexon</Link></h4>
                                <p>UI Designer</p>
                                <div className="team-shape">
                                    <img src="/assets/images/team/team-shape.png" alt="" />
                                </div>
                            </div>
                            <div className="team-socila-icon-box">
                                <div className="team-share">
                                    <div className="team-share-icon">
                                        <span><i className="bi bi-share"></i></span>
                                    </div>
                                </div>
                                <div className="team-social-icon">
                                    <ul>
                                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-team-box">
                            <div className="team-thumb">
                                <img src="/assets/images/team/team-2.png" alt="" />
                            </div>
                            <div className="team-content">
                                <h4><Link to="/team-details">Alexina Gomez</Link></h4>
                                <p>HR Manager</p>
                                <div className="team-shape">
                                    <img src="/assets/images/team/team-shape.png" alt="" />
                                </div>
                            </div>
                            <div className="team-socila-icon-box">
                                <div className="team-share">
                                    <div className="team-share-icon">
                                        <span><i className="bi bi-share"></i></span>
                                    </div>
                                </div>
                                <div className="team-social-icon">
                                    <ul>
                                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-team-box">
                            <div className="team-thumb">
                                <img src="/assets/images/team/team-3.png" alt="" />
                            </div>
                            <div className="team-content">
                                <h4><Link to="/team-details">Antoine Brown</Link></h4>
                                <p>Developer</p>
                                <div className="team-shape">
                                    <img src="/assets/images/team/team-shape.png" alt="" />
                                </div>
                            </div>
                            <div className="team-socila-icon-box">
                                <div className="team-share">
                                    <div className="team-share-icon">
                                        <span><i className="bi bi-share"></i></span>
                                    </div>
                                </div>
                                <div className="team-social-icon">
                                    <ul>
                                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-team-box">
                            <div className="team-thumb">
                                <img src="/assets/images/team/team-4.png" alt="" />
                            </div>
                            <div className="team-content">
                                <h4><Link to="/team-details">Carolina Scott</Link></h4>
                                <p>UI Designer</p>
                                <div className="team-shape">
                                    <img src="/assets/images/team/team-shape.png" alt="" />
                                </div>
                            </div>
                            <div className="team-socila-icon-box">
                                <div className="team-share">
                                    <div className="team-share-icon">
                                        <span><i className="bi bi-share"></i></span>
                                    </div>
                                </div>
                                <div className="team-social-icon">
                                    <ul>
                                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                        <li><Link to="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamArea;
