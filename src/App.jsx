import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutOne from './pages/AboutOne';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
// Team is parked: pages are kept in src/pages, routes are disabled so /team
// falls through to the 404 handler. Re-enable the import and the two routes
// below to bring the section back.
// import Team from './pages/Team';
// import TeamDetails from './pages/TeamDetails';
import Project from './pages/Project';
import ProjectDetails from './pages/ProjectDetails';
import ProjectBreastCancer from './pages/projects/ProjectBreastCancer';
import ProjectManagement from './pages/projects/ProjectManagement';
import ProjectXRaySegmentation from './pages/projects/ProjectXRaySegmentation';
import ProjectScriptor from './pages/projects/ProjectScriptor';
import ProjectAutoContouring from './pages/projects/ProjectAutoContouring';
import ProjectLungCTReport from './pages/projects/ProjectLungCTReport';
import ProjectIELTSTutors from './pages/projects/ProjectIELTSTutors';
import ProjectRxCloud from './pages/projects/ProjectRxCloud';
import ProjectDicomViewer from './pages/projects/ProjectDicomViewer';
import ProjectDosemetric from './pages/projects/ProjectDosemetric';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Careers from './pages/Careers';
import CareerDetails from './pages/CareerDetails';
import Faqs from './pages/Faqs';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import ServerError from './pages/ServerError';
import ErrorBoundary from './components/ErrorBoundary';
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

      {/* A render crash below here shows the 500 page instead of a blank screen. */}
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutOne />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service/:slug" element={<ServiceDetails />} />
            {/* Parked — handled by the catch-all 404 route below.
            <Route path="/team" element={<Team />} />
            <Route path="/team/:slug" element={<TeamDetails />} /> */}
            <Route path="/project" element={<Project />} />
            <Route path="/project/nsu_ctrg_2021_2022_breast_cancer" element={<ProjectBreastCancer />} />
            <Route path="/project/bm-project-management" element={<ProjectManagement />} />
            <Route path="/project/x-ray-segmentation-editor" element={<ProjectXRaySegmentation />} />
            <Route path="/project/scriptor" element={<ProjectScriptor />} />
            <Route path="/project/auto-contouring" element={<ProjectAutoContouring />} />
            <Route path="/project/lung-ct-report-generation" element={<ProjectLungCTReport />} />
            <Route path="/project/ielts-tutors" element={<ProjectIELTSTutors />} />
            <Route path="/project/rxcloud" element={<ProjectRxCloud />} />
            <Route path="/project/dicomviewer" element={<ProjectDicomViewer />} />
            <Route path="/project/dosemetric" element={<ProjectDosemetric />} />
            {/* Old name of Dosemetric; keeps shared links working. */}
            <Route path="/project/linac-qa-guardian" element={<Navigate to="/project/dosemetric" replace />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<CareerDetails />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/contact" element={<Contact />} />
            {/* About Us lives on the main About page; the old link redirects. */}
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="/privacy-policy" element={<LegalPage slug="privacy-policy" />} />
            <Route path="/refund-policy" element={<LegalPage slug="refund-policy" />} />
            <Route path="/delivery-policy" element={<LegalPage slug="delivery-policy" />} />

            {/* Error pages. 403 and 500 are addressable so hosting rules and
                internal tools can redirect to them; anything unmatched is a 404.
                All three keep the header and footer, so they are not dead ends. */}
            <Route path="/403" element={<Forbidden />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;


