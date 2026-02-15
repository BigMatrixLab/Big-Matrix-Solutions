import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileMenu from './MobileMenu';
import FooterArea from './FooterArea';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    return (
        <>
            <Header />
            <MobileMenu />
            <Outlet />
            <FooterArea />
            <ScrollToTop />
            {/* Search Popup */}
            <div className="search-popup">
                <button className="close-search style-two"><span className="flaticon-multiply"><i className="bi bi-x-circle"></i></span></button>
                <button className="close-search"><i className="bi bi-arrow-up"></i></button>
                <form method="post" action="#">
                    <div className="form-group">
                        <input type="search" name="search-field" placeholder="Search Here" required="" />
                        <button type="submit"><i className="bi bi-search"></i></button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Layout;
