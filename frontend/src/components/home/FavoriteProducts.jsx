import React from 'react';
import { useLang } from '../../context/LangContext';

export default function FavoriteProducts({ onOpenLightbox }) {
  const { t } = useLang();

  const favoriteList = [
    {
      name: 'Bear Boy-Girl, 20cm standing',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Boy-Girl-outfit-1536x1152.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Boy-Girl-outfit-scaled.jpg'
    },
    {
      name: 'Bear Arnold, 20cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Arnold-20-3outfit-1536x1152.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Arnold-20-3outfit-scaled.jpg'
    },
    {
      name: 'Bear Luna, 20cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Luna-20-3Outfit-1536x1121.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Luna-20-3Outfit-scaled.jpg'
    },
    {
      name: 'Bear Kempins, 22cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Kempinski-22-3outfit-1536x1152.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Kempinski-22-3outfit-scaled.jpg'
    },
    {
      name: 'Bear Jeslyn, 12cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Jeslyn-12-outfit-1536x1149.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Jeslyn-12-outfit-scaled.jpg'
    },
    {
      name: 'Bear Vico, 15cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Vico-3outfit-1536x1149.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Vico-3outfit-scaled.jpg'
    },
    {
      name: 'Bear Mayna, 15cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Mayna-3outfit-1536x1152.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Mayna-3outfit-scaled.jpg'
    },
    {
      name: 'Bear Bobby, 18cm',
      image: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Bobby-18-outfit2-1536x1152.jpg',
      fullImage: 'https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Bobby-18-outfit2-scaled.jpg'
    }
  ];

  return (
    <section className="section section-alt" id="favorite">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t('Paling Diminati')}</span>
          <h2 className="h-display">
            {t('Souvenir')} <em>Most Favorite</em>
          </h2>
          <p className="lead">
            {t('Koleksi boneka terfavorit yang sering dipesan pelanggan kami untuk berbagai acara.')}
          </p>
        </div>
        <div className="prod-grid">
          {favoriteList.map((item, idx) => (
            <div className="prod-card reveal" key={idx}>
              <a
                className="prod-media"
                href={item.fullImage}
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenLightbox) onOpenLightbox(item.fullImage, item.name);
                }}
              >
                <img decoding="async" src={item.image} alt={item.name} loading="lazy" />
              </a>
              <div className="prod-body">
                <h3>{item.name}</h3>
                <a
                  className="prod-order"
                  href={`https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20mau%20order%20${encodeURIComponent(
                    item.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Order via WhatsApp"
                  aria-label={`Order ${item.name} via WhatsApp`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
