import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import BrandArea from '../components/BrandArea';

const Project = () => {
    const projects = [
        { title: "Analytics", category: "Database Design", image: "/assets/images/inner-images/project-1.jpg" },
        { title: "Marketing", category: "Digital Marketing", image: "/assets/images/inner-images/project-2.jpg" },
        { title: "Big-Matrix Solutions", category: "Tech Cover Industry", image: "/assets/images/inner-images/project-3.jpg" },
        { title: "Big-Matrix Solutions", category: "Software Development", image: "/assets/images/inner-images/project-3.jpg" },
        { title: "Global Solution", category: "IT Infrastructure", image: "/assets/images/inner-images/project-1.jpg" },
        { title: "Future Tech", category: "Cloud Computing", image: "/assets/images/inner-images/project-2.jpg" },
    ];

    return (
        <>
            <Breadcrumb pageTitle="Our Project" breadcrumbItem="Project" />

            {/* Project Area */}
            <div className="project-area inner-style">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title center inner-style">
                                <h4>latest works</h4>
                                <h1>Similar Completed Projects</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {projects.map((item, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="single-project-box">
                                    <div className="project-thumb">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="project-content">
                                        <h4>{item.title}</h4>
                                        <a href="#">{item.category}</a>
                                        <a className="project-button" href="/project-details">View Details<i className="bi bi-arrow-right-short"></i></a>
                                        <div className="project-shape">
                                            <img src="/assets/images/inner-images/project-shape.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscribe Area */}
            <div className="subscribe-area style-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="section-title left inner-style">
                                <h1>Get Latest Update from Big-Matrix Solutions</h1>
                                <h1>Stay Connect with Us</h1>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                <div className="single-subscribe-box">
                                    <input type="text" name="Email" placeholder="Enter your Email" required />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <BrandArea />
        </>
    );
};

export default Project;
