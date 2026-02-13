import Hero from '../components/Hero';
import FeatureArea from '../components/FeatureArea';
import AboutArea from '../components/AboutArea';
import ServiceArea from '../components/ServiceArea';
import TeamArea from '../components/TeamArea';
import PortfolioArea from '../components/PortfolioArea';
import CounterArea from '../components/CounterArea';
import TestimonialArea from '../components/TestimonialArea';
import ContactInfoArea from '../components/ContactInfoArea';
import PricingArea from '../components/PricingArea';
import BlogArea from '../components/BlogArea';

const Home = () => {
    return (
        <>
            <Hero />
            <FeatureArea />
            <AboutArea />
            <ServiceArea />
            <TeamArea />
            <CounterArea />
            <PortfolioArea />
            {/* <TestimonialArea />
            <ContactInfoArea />
            <PricingArea /> */}
            <BlogArea />
        </>
    );
};

export default Home;
