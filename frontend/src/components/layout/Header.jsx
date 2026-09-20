import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
      <div className="container header-inner">
        <Link className="brand" to="/">
          <img
            decoding="async"
            className="brand-on-dark"
            src="https://user.uploads.dev/file/010906d0ca68777d5bb1d6dd18a32a65.png"
            alt="Bonekaku – Pusat Souvenir dan Boneka terlengkap"
          />
          <img
            decoding="async"
            className="brand-on-light"
            src="https://user.uploads.dev/file/ff7baea119e28ffb2c6fa5772bfc40d7.png"
            alt="Bonekaku – Pusat Souvenir dan Boneka terlengkap"
          />
        </Link>

        <nav id="mainNav" className={navOpen ? 'open' : ''} aria-label="Navigasi utama">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            {t('Home')}
          </Link>
          <Link to="/katalog" className={`nav-link ${isActive('/katalog') ? 'active' : ''}`}>
            {t('Katalog')}
          </Link>
          <Link to="/layanan" className={`nav-link ${isActive('/layanan') ? 'active' : ''}`}>
            {t('Layanan')}
          </Link>
          <Link to="/tentang" className={`nav-link ${isActive('/tentang') ? 'active' : ''}`}>
            {t('Tentang Kami')}
          </Link>
          <Link to="/kontak" className={`nav-link ${isActive('/kontak') ? 'active' : ''}`}>
            {t('Kontak Kami')}
          </Link>
          <Link to="/artikel" className={`nav-link ${isActive('/artikel') ? 'active' : ''}`}>
            {t('Artikel')}
          </Link>
          <a
            className="btn btn-primary nav-cta nav-cta-mobile"
            href="https://wa.me/6281385508611"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Konsultasi Gratis')}
          </a>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" data-i18n-skip role="group" aria-label="Pilih bahasa / Choose language">
            <button
              type="button"
              className={lang === 'id' ? 'active' : ''}
              onClick={() => setLang('id')}
            >
              ID
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <button
            className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
            id="themeToggle"
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Ganti mode terang / gelap"
            title="Ganti mode terang / gelap"
            onClick={toggleTheme}
          >
            <span className="tt-knob">
              <svg className="tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <svg className="tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </button>

          <a
            className="btn btn-primary nav-cta nav-cta-desktop"
            href="https://wa.me/6281385508611"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Konsultasi Gratis')}
          </a>

          <button
            className={`nav-toggle ${navOpen ? 'open' : ''}`}
            id="navToggle"
            aria-label="Buka menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
