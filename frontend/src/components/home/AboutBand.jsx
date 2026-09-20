import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function AboutBand() {
  const { t } = useLang();

  return (
    <section className="section" id="preFoot">
      <div className="container">
        <div className="about-band reveal">
          <div
            className="floaty"
            style={{
              width: '96px',
              height: '96px',
              top: '14px',
              right: '7%',
              color: '#ECEEF1',
              opacity: 0.13
            }}
          >
            <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
              <circle cx="20" cy="15" r="8" />
              <circle cx="44" cy="15" r="8" />
              <circle cx="32" cy="27" r="13" />
              <ellipse cx="32" cy="45" rx="16" ry="14" />
              <circle cx="26" cy="27" r="2.4" fill="#0F3B3E" />
              <circle cx="38" cy="27" r="2.4" fill="#0F3B3E" />
              <path d="M27 34q5 4 10 0" stroke="#0F3B3E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div
            className="floaty"
            style={{
              width: '64px',
              height: '64px',
              bottom: '18px',
              left: '9%',
              color: '#7ED8B1',
              opacity: 0.2,
              animationDelay: '2.4s'
            }}
          >
            <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
              <circle cx="20" cy="15" r="8" />
              <circle cx="44" cy="15" r="8" />
              <circle cx="32" cy="27" r="13" />
              <ellipse cx="32" cy="45" rx="16" ry="14" />
              <circle cx="26" cy="27" r="2.4" fill="#0F3B3E" />
              <circle cx="38" cy="27" r="2.4" fill="#0F3B3E" />
              <path d="M27 34q5 4 10 0" stroke="#0F3B3E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <h2>
            BONEKAKU {t('merupakan jasa pembuatan')} <em>{t('boneka dan bantal-bantal')}</em>{' '}
            {t(
              'untuk boneka promosi, boneka souvenir, boneka desain khusus, suvenir pernikahan / boneka wedding, ulang tahun, dll.'
            )}
          </h2>
          <Link className="btn btn-light" to="/kontak">
            {t('Kontak Kami')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
