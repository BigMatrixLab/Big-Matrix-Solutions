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

function App() {
  useEffect(() => {
    // Handle Loader
    document.body.classList.add('loaded');
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutOne />} />
        <Route path="/service" element={<Services />} />
        <Route path="/service/:slug" element={<ServiceDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team-details" element={<TeamDetails />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;
