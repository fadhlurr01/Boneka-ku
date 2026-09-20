import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Categories() {
  const { t } = useLang();

  const items = [
    {
      title: 'Boneka Souvenir',
      desc: 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.',
      icon: 'https://user.uploads.dev/file/1b8f0c38c9e663178245b91cfb376a5b.png',
      link: '/katalog?cat=boneka-sovenir'
    },
    {
      title: 'Bantal Custom',
      desc: 'Bantal juga dapat dijadikan media promosi yang menarik dan efektif. Kami menyediakan dan alternatif desain bantal yang dapat anda pilih.',
      icon: 'https://user.uploads.dev/file/5a76381d42fc67530f7d373f71c7afc0.png',
      link: '/katalog?cat=bantal-custom'
    },
    {
      title: 'Boneka Custom',
      desc: 'Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.',
      icon: 'https://user.uploads.dev/file/b5e6f2b07d40ff3adebb5a54d69db8bb.png',
      link: '/katalog?cat=boneka-custom'
    },
    {
      title: 'Maskot / Badut',
      desc: 'Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.',
      icon: 'https://user.uploads.dev/file/2231926454d1ac833944a5f029bfdd9d.png',
      link: '/katalog?cat=boneka-maskot'
    }
  ];

  return (
    <section className="section" id="kategori">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t('Kami Membuat')}</span>
          <h2 className="h-display">
            {t('Jagonya')} <em>{t('Buat Boneka')}</em>
          </h2>
          <p className="lead">
            {t(
              'Ingin membuat souvenir yang unik? Souvenir yang mewakili produk / perusahaan anda di hadapan konsumen? dan yang disukai banyak orang? Kami siap mewujudkannya.'
            )}
          </p>
        </div>
        <div className="cat-grid">
          {items.map((cat, idx) => (
            <div className="cat-card reveal" key={idx}>
              <div className="cat-icon">
                <img decoding="async" src={cat.icon} alt={cat.title} loading="lazy" />
              </div>
              <h3>{t(cat.title)}</h3>
              <p>{t(cat.desc)}</p>
              <Link className="cat-more" to={cat.link}>
                {t('Lihat Katalog')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
