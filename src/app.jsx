import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Ambience from './components/ambience';
import BackToTop from './components/back-to-top';
import Footer from './components/footer';
import HomePage from './pages/home';

const ProjectsPage = lazy(() => import('./pages/projects'));

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Ambience />
      <Suspense fallback={null}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
