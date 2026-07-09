import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import NotificationPopup from './components/NotificationPopup';

// Public Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Skills from './pages/Skills';
import Faculty from './pages/Faculty';
import Achievements from './pages/Achievements';
import Achievers from './pages/Achievers';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Admin Panel
import AdminPanel from './admin/AdminPanel';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Mock initial premium loader screen
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(loaderTimer);
    };
  }, []);

  const renderPage = () => {
    // Basic prefix routing
    if (currentPath.startsWith('#programs/')) {
      const programId = currentPath.split('/')[1];
      return <Programs selectedId={programId} />;
    }
    if (currentPath.startsWith('#skills/')) {
      const skillId = currentPath.split('/')[1];
      return <Skills selectedId={skillId} />;
    }

    switch (currentPath) {
      case '#home':
      case '':
        return <Home />;
      case '#programs':
        return <Programs />;
      case '#skills':
        return <Skills />;
      case '#faculty':
        return <Faculty />;
      case '#achievements':
        return <Achievements />;
      case '#achievers':
        return <Achievers />;
      case '#gallery':
        return <Gallery />;
      case '#contact':
        return <Contact />;
      case '#admin':
        return <AdminPanel />;
      default:
        return <Home />; // Fallback
    }
  };

  const isAdmin = currentPath.startsWith('#admin');

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-logo">
          <img src="/logo.png" className="logo-spin" alt="Jai Sai Academy Logo" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '1px solid hsl(var(--card-border))' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Jai Sai Academy</span>
        </div>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <DataProvider>
      <div className="app-shell">
        {!isAdmin && <Navigation currentPath={currentPath} />}
        
        <main className={!isAdmin ? "page-wrapper" : ""}>
          {renderPage()}
        </main>

        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppFloat />}
        {!isAdmin && <NotificationPopup />}
      </div>
    </DataProvider>
  );
}
