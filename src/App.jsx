import React, { lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
// Eager: the error boundary renders it when anything else fails to load.
import ServerError from './pages/ServerError';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTopOnNavigation from './components/ScrollToTopOnNavigation';

// Every page except Home is loaded on demand, so a visitor downloads only
// the code for the page they open. Pre-rendered HTML shows the page before
// its code arrives (scripts/prerender.js, src/main.jsx).
const AboutOne = lazy(() => import('./pages/AboutOne'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
// Team is parked: pages are kept in src/pages, routes are disabled so /team
// falls through to the 404 handler. Re-enable the import and the two routes
// below to bring the section back.
// import Team from './pages/Team';
// import TeamDetails from './pages/TeamDetails';
const Project = lazy(() => import('./pages/Project'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const ProjectBreastCancer = lazy(() => import('./pages/projects/ProjectBreastCancer'));
const ProjectManagement = lazy(() => import('./pages/projects/ProjectManagement'));
const ProjectXRaySegmentation = lazy(() => import('./pages/projects/ProjectXRaySegmentation'));
const ProjectScriptor = lazy(() => import('./pages/projects/ProjectScriptor'));
const ProjectAutoContouring = lazy(() => import('./pages/projects/ProjectAutoContouring'));
const ProjectLungCTReport = lazy(() => import('./pages/projects/ProjectLungCTReport'));
const ProjectIELTSTutors = lazy(() => import('./pages/projects/ProjectIELTSTutors'));
const ProjectRxCloud = lazy(() => import('./pages/projects/ProjectRxCloud'));
const ProjectDicomViewer = lazy(() => import('./pages/projects/ProjectDicomViewer'));
const ProjectDosemetric = lazy(() => import('./pages/projects/ProjectDosemetric'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const Careers = lazy(() => import('./pages/Careers'));
const CareerDetails = lazy(() => import('./pages/CareerDetails'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Mission = lazy(() => import('./pages/Mission'));
const Contact = lazy(() => import('./pages/Contact'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Forbidden = lazy(() => import('./pages/Forbidden'));

function App() {
  useEffect(() => {
    // The preloader only exists on pages that were not pre-rendered (the app
    // shell, local dev). It used to stay for a fixed 3 seconds; it now fades as
    // soon as the app has mounted. Pre-rendered pages ship without it
    // (scripts/prerender.js), so their content shows on first paint.
    const preloader = document.getElementById('preloader');
    document.body.classList.add('loaded');
    if (!preloader) return undefined;

    // Remove from the layout once the CSS fade has finished.
    const timer = setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
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
            <Route path="/terms-and-conditions" element={<LegalPage slug="terms-and-conditions" />} />
            <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
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


