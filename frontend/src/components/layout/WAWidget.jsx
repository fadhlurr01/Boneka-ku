import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../context/LangContext';

export default function WAWidget() {
  const [open, setOpen] = useState(false);
  const [showToTop, setShowToTop] = useState(false);
  const { t } = useLang();
  const widgetRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      setShowToTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Close panel on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Tombol Scroll to Top */}
      <button
        className={`to-top wa-top ${showToTop && !open ? 'visible show' : ''}`}
        id="toTop"
        type="button"
        aria-label="Kembali ke atas"
        onClick={scrollToTop}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Floating WhatsApp Widget */}
      <div className={`wa-widget ${open ? 'open panel-open' : ''}`} id="waWidget" ref={widgetRef}>
        <div className={`wa-panel ${open ? 'open' : ''}`} id="waPanel" role="dialog" aria-modal="true" aria-label="Hubungi kami via WhatsApp">
          <div className="wa-head">
            <div className="wa-head-top">
              <span className="wa-head-avatar" aria-hidden="true">
                BK<span className="online-dot"></span>
              </span>
              <span className="wa-head-info">
                <b>Bonekaku Care</b>
                <small>
                  <span className="dot" aria-hidden="true"></span> {t('Online · Biasanya membalas < 5 menit')}
                </small>
              </span>
              <button
                type="button"
                className="wa-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Tutup jendela chat"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="wa-body">
            <p className="wa-lead">{t('Pilih admin untuk mulai konsultasi seputar boneka & souvenir.')}</p>
            <div className="wa-options">
              <a
                className="wa-option"
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/62817204188?text=Halo%20Bonekaku,%20saya%20tertarik%20untuk%20konsultasi%20pemesanan%20boneka."
              >
                <span className="wa-option-avatar" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
                  </svg>
                </span>
                <span className="wa-option-body">
                  <b>Admin 1 (Sales & Order)</b>
                  <small>Respon Cepat · Pesanan Baru</small>
                </span>
                <span className="wa-option-cta">
                  Chat{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </a>

              <a
                className="wa-option"
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20ingin%20konsultasi%20custom%20order."
              >
                <span className="wa-option-avatar" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
                  </svg>
                </span>
                <span className="wa-option-body">
                  <b>Admin 2 (Custom & Desain)</b>
                  <small>Maskot, Bantal & Produksi</small>
                </span>
                <span className="wa-option-cta">
                  Chat{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        <button
          className={`wa-btn ${open ? 'close active' : ''}`}
          id="waBtn"
          type="button"
          aria-label={open ? 'Tutup WhatsApp' : 'Chat WhatsApp'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px' }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
              </svg>
              <span className="wa-badge" aria-hidden="true">1</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
