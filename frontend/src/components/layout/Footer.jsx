import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/">
              <img
                decoding="async"
                src="https://user.uploads.dev/file/010906d0ca68777d5bb1d6dd18a32a65.png"
                alt="Bonekaku"
              />
            </Link>
            <p>{t('Pusat souvenir dan boneka terlengkap. Proses cepat, bisa custom — kami jagonya.')}</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/bonekaku_store/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.facebook.com/kajian.teori" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-7h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.49-1.46h1.6V4.5c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4v2.62H8v3h2.35v7h3.15z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@bonekakuid9160" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 12s0-3.85-.49-5.7a2.97 2.97 0 0 0-2.09-2.1C18.6 3.7 12 3.7 12 3.7s-6.6 0-8.42.5a2.97 2.97 0 0 0-2.1 2.1C1 8.15 1 12 1 12s0 3.85.48 5.7c.26 1.04 1.04 1.86 2.1 2.1 1.82.5 8.42.5 8.42.5s6.6 0 8.42-.5a2.97 2.97 0 0 0 2.09-2.1C23 15.85 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>{t('Menu')}</h4>
            <ul>
              <li><Link to="/">{t('Home')}</Link></li>
              <li><Link to="/katalog">{t('Katalog')}</Link></li>
              <li><Link to="/layanan">{t('Layanan')}</Link></li>
              <li><Link to="/tentang">{t('Tentang Kami')}</Link></li>
              <li><Link to="/kontak">{t('Kontak Kami')}</Link></li>
              <li><Link to="/artikel">{t('Artikel')}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t('Katalog')}</h4>
            <ul>
              <li><Link to="/katalog?cat=most-favorite">Most Favorite</Link></li>
              <li><Link to="/katalog?cat=animal">Animal Series</Link></li>
              <li><Link to="/katalog?cat=boneka-sovenir">Boneka Souvenir</Link></li>
              <li><Link to="/katalog?cat=bantal-custom">Bantal Custom</Link></li>
              <li><Link to="/katalog?cat=boneka-custom">Boneka Custom</Link></li>
              <li><Link to="/katalog?cat=boneka-wisuda">Boneka Wisuda</Link></li>
              <li><Link to="/katalog?cat=boneka-maskot">Maskot / Badut</Link></li>
              <li><Link to="/katalog?cat=masker">Masker</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t('Kontak')}</h4>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jl. Katelia Raya Blok AS-3 No. 35, Jatisampurna, Bekasi, Jawa Barat 17433</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jln. Bogor-Bekasi No.61 Ciketing Udik, Bantar Gebang, Bekasi</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.6 2.81.72A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:6281385508611">0813-8550-8611</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                <a href="mailto:marketingbonekaku@gmail.com">marketingbonekaku@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="fb-left">© 2026 BONEKAKU.CO.ID All Rights Reserved</span>
          <Link to="/admin" className="footer-admin">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
