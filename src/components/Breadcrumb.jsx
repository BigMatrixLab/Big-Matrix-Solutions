import { Link } from 'react-router-dom';

/**
 * Page header. An editorial band under the fixed navigation: mono breadcrumb
 * trail, display title on the left and the page description set beside it so
 * the full width is used. Pages without a description get a single column.
 */
const Breadcrumb = ({ pageTitle, breadcrumbItem, description }) => {
    return (
        <header className={`bm-pagehead${description ? '' : ' bm-pagehead--bare'}`}>
            <span className="bm-pagehead__matrix" aria-hidden="true"></span>

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

                <div className="bm-pagehead__body">
                    <h1 className="bm-pagehead__title">{pageTitle}</h1>
                    {description && <p className="bm-pagehead__lead">{description}</p>}
                </div>
            </div>
        </header>
    );
};

export default Breadcrumb;
