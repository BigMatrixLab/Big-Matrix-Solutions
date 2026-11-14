import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileMenu from './MobileMenu';
import FooterArea from './FooterArea';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    return (
        <>
            <a className="bm-skip-link" href="#main-content">Skip to content</a>
            <Header />
            <MobileMenu />
            <main id="main-content">
                {/* Pages load on demand (App.jsx); header and footer stay put. */}
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </main>
            <FooterArea />
            <ScrollToTop />
        </>
    );
};

export default Layout;
