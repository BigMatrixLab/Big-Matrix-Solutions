import React from 'react';
import CountUp from 'react-countup';

const CounterArea = () => {
    return (
        <div className="counter-area style-two">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-md-6">
                        <div className="counter-box">
                            <div className="counter-content">
                                <h4 className="counterup">
                                    <CountUp end={10} duration={3} />
                                </h4>
                                <span>K+</span>
                                <p>happy customers</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="counter-box">
                            <div className="counter-content">
                                <h4 className="counterup">
                                    <CountUp end={20} duration={3} />
                                </h4>
                                <span>K+</span>
                                <p>Works Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="counter-box">
                            <div className="counter-content">
                                <h4 className="counterup">
                                    <CountUp end={99} duration={3} />
                                </h4>
                                <span>+</span>
                                <p>Expert Members</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="counter-box">
                            <div className="counter-content">
                                <h4 className="counterup">
                                    <CountUp end={100} duration={3} />
                                </h4>
                                <span>%</span>
                                <p>Satisfaction Rates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterArea;
