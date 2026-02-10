import React, { useState } from 'react';

const VideoArea = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="video-area style-two">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title center style-two">
                            <h4>Watch Now</h4>
                            <h1>Our Best Working Process System</h1>
                            <h1>with Team Expert Leaders</h1>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="video-button">
                            {/* In a real React app, you'd update state to show a modal here */}
                            <a className="video-vemo-icon" href="https://www.youtube.com/watch?v=e6R6VsgD8yQ&t=179s" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-play-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoArea;
