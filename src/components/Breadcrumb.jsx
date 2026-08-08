import { Link } from 'react-router-dom';

/**
 * Page header. A band under the fixed navigation carrying the mono breadcrumb
 * trail and the page title, set full width at display scale.
 */
const Breadcrumb = ({ pageTitle, breadcrumbItem }) => {
    return (
        <header className="bm-pagehead">
            <div className="bm-container">
                <nav className="bm-pagehead__crumbs" aria-label="Breadcrumb">
                    <ol>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page">{breadcrumbItem || pageTitle}</li>
                    </ol>
                </nav>

                <h1 className="bm-pagehead__title">{pageTitle}</h1>
            </div>
        </header>
    );
};

export default Breadcrumb;
