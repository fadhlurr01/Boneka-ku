import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function SpecialProduct() {
  const [playingVideo, setPlayingVideo] = useState(false);
  const { t } = useLang();

  return (
    <section className="section" id="special">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t('Produk Spesial')}</span>
          <h2 className="h-display">
            Special <em>Product</em>
          </h2>
        </div>

        <div className="special-showcase">
          <div className="special-media reveal">
            <div className="special-video">
              {playingVideo ? (
                <iframe
                  src="https://www.youtube.com/embed/2bfaB0CAz4I?autoplay=1"
                  title="Video BEAN BAG BONEKAKU"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', minHeight: '320px', borderRadius: '18px' }}
                ></iframe>
              ) : (
                <button
                  className="video-btn"
                  type="button"
                  onClick={() => setPlayingVideo(true)}
                  aria-label="Putar video BEAN BAG BONEKAKU"
                >
                  <img
                    decoding="async"
                    src="https://i.ytimg.com/vi/2bfaB0CAz4I/maxresdefault.jpg"
                    alt="Video BEAN BAG BONEKAKU"
                    loading="lazy"
                  />
                  <span className="video-play">
                    <span className="ring">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </span>
                    {t('Putar Video Bean Bag')}
                  </span>
                </button>
              )}
              <span className="video-flag">
                <i></i>
                {t('Video Produk')}
              </span>
            </div>

            <div className="special-media-bar">
              <div className="smb-info">
                <span className="smb-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23 12s0-3.85-.49-5.7a2.97 2.97 0 0 0-2.09-2.1C18.6 3.7 12 3.7 12 3.7s-6.6 0-8.42.5a2.97 2.97 0 0 0-2.1 2.1C1 8.15 1 12 1 12s0 3.85.48 5.7c.26 1.04 1.04 1.86 2.1 2.1 1.82.5 8.42.5 8.42.5s6.6 0 8.42-.5a2.97 2.97 0 0 0 2.09-2.1C23 15.85 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                </span>
                <div className="smb-text">
                  <b>Bean Bag Bonekaku</b>
                  <small>{t('Proses & hasil produksi bean bag kami')}</small>
                </div>
              </div>
              <a
                className="yt-btn"
                href="https://youtu.be/2bfaB0CAz4I"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                {t('Tonton di YouTube')}
              </a>
            </div>
          </div>

          <div className="special-info reveal">
            <span className="eyebrow">{t('Bean Bag Premium')}</span>
            <h3 className="special-title">
              {t('Duduk Santai Jadi')} <em>{t('Lebih Nyaman')}</em>
            </h3>
            <p className="lead">
              {t(
                'Bean Bag adalah tempat duduk yang bentuknya menyerupai sebuah kacang-kacangan dengan berisikan butiran-butiran sterofoam dengan berbagai kegunaan, biasanya selain tempat duduk bisa digunakan sebagai bantal. Makanya sangat tepat juga bagi beberapa orang ada yang menyebutnya sebagai tempat duduk malas, karena mungkin sekali duduk di bean bag kita jadi susah beranjak lagi.'
              )}
            </p>
            <ul className="special-points">
              <li>
                {t('Isi butiran')} <b>{t('sterofoam premium')}</b> — {t('empuk, ringan, dan tidak mudah kempes.')}
              </li>
              <li>
                {t('Pilihan bahan')} <b>waterproof</b> {t('hingga sintetic leather yang tebal dan halus.')}
              </li>
              <li>
                {t('Bisa')} <b>{t('custom ukuran, warna & bahan')}</b> {t('sesuai kebutuhan anda.')}
              </li>
            </ul>

            <div className="special-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20ingin%20tanya%20produk%20Bean%20Bag."
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Order via WhatsApp')}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
                </svg>
              </a>
              <Link className="btn btn-outline" to="/katalog">
                {t('Lihat Katalog')}
              </Link>
            </div>
          </div>
        </div>

        <div className="price-head-row reveal">
          <h3>{t('Harga Bean Bag Bonekaku')}</h3>
          <p>{t('Berkualitas dan lembut — tersedia dalam beberapa pilihan ukuran dan bahan.')}</p>
        </div>

        <div className="price-grid reveal">
          <div className="price-card">
            <div className="price-head">
              <h4>{t('Ukuran 90 × 135 cm')}</h4>
              <span className="price-badge">{t('Paling Laris')}</span>
            </div>
            <ul>
              <li>
                <span>
                  Bahan Polyster Balon <small>waterproof</small>
                </span>
                <b>Rp 290.000</b>
              </li>
              <li>
                <span>Bahan Katun Waterproof</span>
                <b>Rp 320.000</b>
              </li>
              <li>
                <span>
                  Bahan Sintetic Leather <small>tebal &amp; waterproof</small>
                </span>
                <b>Rp 340.000</b>
              </li>
            </ul>
          </div>

          <div className="price-card">
            <div className="price-head">
              <h4>{t('Ukuran 75 × 125 cm')}</h4>
            </div>
            <ul>
              <li>
                <span>
                  Bahan Polyster Balon <small>waterproof</small>
                </span>
                <b>Rp 220.000</b>
              </li>
              <li>
                <span>
                  Bahan Katun Waterproof <small>permukaan cover halus</small>
                </span>
                <b>Rp 240.000</b>
              </li>
            </ul>
          </div>

          <div className="price-card price-card-cta">
            <div className="price-head">
              <h4>{t('Butuh Ukuran / Bahan Lain?')}</h4>
            </div>
            <p>
              {t(
                'Kami siap memproduksi bean bag sesuai kebutuhan anda — ukuran, warna, dan bahan custom sesuai permintaan.'
              )}
            </p>
            <a
              className="btn btn-light"
              href="https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20ingin%20konsultasi%20Bean%20Bag%20custom."
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Konsultasi Gratis')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
