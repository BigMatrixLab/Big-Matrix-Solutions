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
import ProjectBreastCancer from './pages/projects/ProjectBreastCancer';
import ProjectManagement from './pages/projects/ProjectManagement';
import ProjectXRaySegmentation from './pages/projects/ProjectXRaySegmentation';
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
    // Handle Loader - show for at least one full sequence (3 seconds)
    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        // Add the loaded class to trigger CSS transition
        document.body.classList.add('loaded');
        
        // Remove from DOM entirely after transition finishes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader is now in index.html for instant rendering */}

      <ScrollToTopOnNavigation />
      
      <Routes>
       
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutOne />} />
          <Route path="/service" element={<Services />} />
          <Route path="/service/:slug" element={<ServiceDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<TeamDetails />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/nsu_ctrg_2021_2022_breast_cancer" element={<ProjectBreastCancer />} />
          <Route path="/project/bm-project-management" element={<ProjectManagement />} />
          <Route path="/project/x-ray-segmentation-editor" element={<ProjectXRaySegmentation />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;


