import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutOne from './pages/AboutOne';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Team from './pages/Team';
import TeamDetails from './pages/TeamDetails';
import Project from './pages/Project';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Careers from './pages/Careers';
import Faqs from './pages/Faqs';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollToTopOnNavigation from './components/ScrollToTopOnNavigation';

function App() {
  useEffect(() => {
    // Handle Loader - show for at least 1 second
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTopOnNavigation />
      <Routes>
        {/* Routes with Layout (Header/Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutOne />} />
          <Route path="/service" element={<Services />} />
          <Route path="/service/:slug" element={<ServiceDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<TeamDetails />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* 404 Page without Layout for full-screen aesthetic experience */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
