import React from 'react';
import { useLang } from '../../context/LangContext';

export default function Testimonials() {
  const { t } = useLang();

  const reviews = [
    {
      quote: '"Bantalnya benar empuk lembut kainnya, gemesin , jahitan rapi dan kuat..rekomended..."',
      name: 'Hud Hud Tours',
      role: 'Travel Agent',
      avatar: 'https://bonekaku.co.id/wp-content/uploads/2021/02/hud-hud-tours.jpg'
    },
    {
      quote: '"Barangnya lucu-lucu banget!! udah gitu kualitasnya bagus dan proses produksinya cepet banget !! sukaaaa"',
      name: 'Daniel Julian',
      role: 'Pengusaha',
      avatar: 'https://bonekaku.co.id/wp-content/uploads/2021/02/unnamed.png'
    },
    {
      quote: '"Material bahannya bagus, lembut, dan aman buat anak², lucu² bentuknya 😀👍"',
      name: 'Mamat Arohman',
      role: 'Pengusaha',
      avatar: 'https://bonekaku.co.id/wp-content/uploads/2021/02/unnamed-1.png'
    }
  ];

  return (
    <section className="section" id="testimoni">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t('Testimoni')}</span>
          <h2 className="h-display">
            {t('Yang Dikatakan')} <em>{t('Mereka')}</em>
          </h2>
        </div>

        <div className="testi-grid">
          {reviews.map((rev, idx) => (
            <div className="testi reveal" key={idx}>
              <p className="quote">{rev.quote}</p>
              <div className="who">
                <img decoding="async" src={rev.avatar} alt={rev.name} loading="lazy" />
                <div>
                  <b>{rev.name}</b>
                  <small>{t(rev.role)}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
