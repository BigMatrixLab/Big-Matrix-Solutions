import Hero from '../components/Hero';
import FeatureArea from '../components/FeatureArea';
import AboutArea from '../components/AboutArea';
import ServiceArea from '../components/ServiceArea';
import PortfolioArea from '../components/PortfolioArea';
import BlogArea from '../components/BlogArea';
import CtaBand from '../components/CtaBand';
import Seo from '../components/Seo';
import { graph, organisation, website } from '../utils/structuredData';

const Home = () => {
    return (
        <>
            <Seo
                description="Big-Matrix Solutions builds production AI systems: medical imaging and diagnostics, hospital platforms, industrial automation and predictive analytics."
                path="/"
                schema={graph(organisation(), website())}
            />
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
