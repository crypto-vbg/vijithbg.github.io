import './App.css';
import React, { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About/About';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import useMousePosition from './hooks/useMousePosition';
import useScrollProgress from './hooks/useScrollProgress';
import performanceMonitor from './utils/performanceMonitoring';
import performanceAuditor from './utils/performanceAudit';

// Lazy load heavy components
const StarfieldCanvas = lazy(() => import('./components/3D/StarfieldCanvas'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Contact = lazy(() => import('./components/Contact/Contact'));

// Mark component load times
performanceMonitor.mark('app-render-start');

// Loading spinner component
const LoadingSpinner = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClass}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse shadow-lg shadow-violet-500/50"></div>
        </div>
      </div>
      {fullScreen && (
        <p className="absolute mt-24 text-cyan-400/70 text-sm animate-pulse">
          Loading...
        </p>
      )}
    </div>
  );
};

function App() {
  const mousePosition = useMousePosition();
  const scrollProgress = useScrollProgress();

  // Measure initial render
  React.useEffect(() => {
    performanceMonitor.mark('app-render-complete');
    performanceMonitor.measure('app-initial-render', 'app-render-start', 'app-render-complete');
    
    // Initialize performance auditor
    performanceAuditor.init();
  }, []);

  return (
    <ErrorBoundary errorMessage="We encountered an error while loading the portfolio. Please try refreshing the page.">
      <div className="App relative min-h-screen bg-black text-white">
        {/* Skip to Content Link for Screen Readers */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* 3D Starfield Background - Lazy loaded with error boundary */}
        <ErrorBoundary 
          errorMessage="3D graphics failed to load. Showing simplified version."
          fallback={
            <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
              <div className="absolute inset-0 opacity-50">
                {[...Array(100)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          }
        >
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <StarfieldCanvas mousePosition={mousePosition} scrollProgress={scrollProgress} />
          </Suspense>
        </ErrorBoundary>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main id="main-content" className="relative z-10 pointer-events-auto">
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Projects Section - Lazy loaded */}
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
          
          {/* Skills Section - Lazy loaded */}
          <Suspense fallback={<LoadingSpinner />}>
            <Skills />
          </Suspense>
          
          {/* Experience Section - Lazy loaded */}
          <Suspense fallback={<LoadingSpinner />}>
            <Experience />
          </Suspense>
          
          {/* Contact Section - Lazy loaded */}
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
          
          {/* Footer */}
          <Footer />
        </main>


      </div>
    </ErrorBoundary>
  );
}

export default App;
