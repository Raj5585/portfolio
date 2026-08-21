import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './app.css';
import BackToTop from './components/helper/back-to-top/back-to-top';
import ChangeTheme from './components/helper/change-theme/change-theme';
import ScrollToTop from './components/helper/scroll-to-top';
import { ThemeContext } from './contexts/theme-context';
import HomePage from './pages/home';

const ProjectPage = lazy(() => import('./pages/project'));

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.secondary }}>
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/projects' element={<ProjectPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>
      </Router>
      <BackToTop />
      <ChangeTheme />
    </div>
  );
}

export default App;
