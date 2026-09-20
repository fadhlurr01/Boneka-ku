import React from 'react';
import { useLang } from '../../context/LangContext';

export default function NewProducts() {
  const { t } = useLang();

  const items = [
    {
      img: 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.41-AM-1-1030x1030.jpeg',
      name: 'Produk Baru 1'
    },
    {
      img: 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.40-AM-1030x1030.jpeg',
      name: 'Produk Baru 2'
    },
    {
      img: 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.40-AM-2-1030x1030.jpeg',
      name: 'Produk Baru 3'
    },
    {
      img: 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.40-AM-1-1030x1030.jpeg',
      name: 'Produk Baru 4'
    },
    {
      img: 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.39-AM-1030x1030.jpeg',
      name: 'Produk Baru 5'
    },
    {
      img: 'https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.39-AM-1-1030x1030.jpeg',
      name: 'Produk Baru 6'
    }
  ];

  return (
    <section
      className="section"
      id="produk-baru"
      style={{
        background: 'linear-gradient(160deg, #0B2B2D, #0F3B3E)',
        color: '#fff'
      }}
    >
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow" style={{ color: '#7ED8B1' }}>
            {t('Terbaru')}
          </span>
          <h2 className="h-display" style={{ color: '#fff' }}>
            New <em style={{ color: '#7ED8B1' }}>Product</em>
          </h2>
          <p className="lead" style={{ color: 'rgba(230,238,240,.82)' }}>
            {t(
              'Produk terbaru dari workshop kami. Klik produk untuk menanyakan ketersediaan & pemesanan.'
            )}
          </p>
        </div>

        <div className="new-carousel">
          <div className="new-track">
            {items.concat(items).map((item, idx) => (
              <a
                className="new-tile"
                key={idx}
                href={`https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20tertarik%20dengan%20produk%20baru%20ini`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img decoding="async" src={item.img} alt={item.name} loading="lazy" />
                <span className="tile-label">
                  {t('Tanya / Order')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
