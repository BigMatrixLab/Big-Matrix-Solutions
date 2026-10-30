import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileMenu from './MobileMenu';
import FooterArea from './FooterArea';
import ScrollToTop from './ScrollToTop';
import Announcement from './Announcement';

const Layout = () => {
    return (
        <>
            <a className="bm-skip-link" href="#main-content">Skip to content</a>
            <Announcement />
            <Header />
            <MobileMenu />
            <main id="main-content">
                <Outlet />
            </main>
            <FooterArea />
            <ScrollToTop />
        </>
    );
};

export default Layout;
