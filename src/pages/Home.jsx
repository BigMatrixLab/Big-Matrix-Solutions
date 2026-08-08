import Hero from '../components/Hero';
import FeatureArea from '../components/FeatureArea';
import AboutArea from '../components/AboutArea';
import ServiceArea from '../components/ServiceArea';
import PortfolioArea from '../components/PortfolioArea';
import BlogArea from '../components/BlogArea';
import CtaBand from '../components/CtaBand';

const Home = () => {
    return (
        <>
            {/* Hero carries the trusted-by rail and fills the first viewport. */}
            <Hero />
            <FeatureArea />
            <AboutArea />
            <ServiceArea />
            <PortfolioArea />
            <BlogArea />
            <CtaBand />
        </>
    );
};

export default Home;
