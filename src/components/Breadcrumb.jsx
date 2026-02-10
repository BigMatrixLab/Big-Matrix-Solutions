import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ pageTitle, breadcrumbItem }) => {
    return (
        <div className="breadcumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcumb-content">
                            <h4>{pageTitle}</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li>&gt;</li>
                                <li>{breadcrumbItem || pageTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
