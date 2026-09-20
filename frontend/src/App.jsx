import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import WAWidget from './components/layout/WAWidget';
import Lightbox from './components/shared/Lightbox';

import HomePage from './pages/HomePage';
import KatalogPage from './pages/KatalogPage';
import LayananPage from './pages/LayananPage';
import TentangPage from './pages/TentangPage';
import KontakPage from './pages/KontakPage';
import ArtikelPage from './pages/ArtikelPage';
import ArtikelDetailPage from './pages/ArtikelDetailPage';
import AdminPage from './pages/AdminPage';

function AppShell() {
  const location = useLocation();
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  const handleOpenLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
  };

  const handleCloseLightbox = () => {
    setLightbox({ open: false, src: '', alt: '' });
  };

  return (
    <div className="site-wrapper">
      {!isAdminRoute && <ScrollProgress />}
      {!isAdminRoute && <Header />}

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage onOpenLightbox={handleOpenLightbox} />} />
          <Route path="/katalog" element={<KatalogPage onOpenLightbox={handleOpenLightbox} />} />
          <Route path="/katalog/:cat" element={<KatalogPage onOpenLightbox={handleOpenLightbox} />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/artikel" element={<ArtikelPage />} />
          <Route path="/artikel/:slug" element={<ArtikelDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WAWidget />}
      {lightbox.open && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Router>
          <AppShell />
        </Router>
      </LangProvider>
    </ThemeProvider>
  );
}
