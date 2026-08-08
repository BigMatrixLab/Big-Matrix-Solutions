import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page header. Renders a breadcrumb trail above the page title on a
 * light, grid-washed band that sits directly under the fixed navigation.
 */
const Breadcrumb = ({ pageTitle, breadcrumbItem, description }) => {
    return (
        <section className="breadcumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="breadcumb-content">
                            <nav aria-label="Breadcrumb">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li aria-hidden="true">/</li>
                                    <li aria-current="page">{breadcrumbItem || pageTitle}</li>
                                </ul>
                            </nav>
                            <h4>{pageTitle}</h4>
                            {description && <p className="bm-lead" style={{ marginTop: 'var(--bm-4)' }}>{description}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;
