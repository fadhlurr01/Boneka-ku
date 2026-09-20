import React from 'react';
import Testimonials from '../components/home/Testimonials';
import ClientsMarquee from '../components/home/ClientsMarquee';
import { useLang } from '../context/LangContext';
import useScrollReveal from '../hooks/useScrollReveal';

export default function TentangPage() {
  const { t } = useLang();
  useScrollReveal();

  return (
    <section className="page active" id="page-tentang">
      <div className="page-hero">
        <div
          className="floaty"
          style={{
            width: '120px',
            height: '120px',
            right: '7%',
            bottom: '-22px',
            color: '#7ED8B1',
            opacity: 0.3
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
            width: '74px',
            height: '74px',
            left: '6%',
            top: '22px',
            color: '#ECEEF1',
            opacity: 0.18,
            animationDelay: '1.6s'
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
        <div className="container">
          <h1>{t('Tentang Kami')}</h1>
          <p>
            {t(
              'BONEKAKU merupakan jasa pembuatan boneka dan bantal-bantal untuk boneka promosi, boneka souvenir, boneka desain khusus, suvenir pernikahan / boneka wedding, ulang tahun, dll.'
            )}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-welcome">
            <div className="about-welcome-text reveal">
              <h2>
                SELAMAT DATANG DI <em>BONEKAKU.ID</em>
              </h2>
              <p className="about-q">{t('Ingin membuat souvenir yang unik?')}</p>
              <p className="about-q">
                {t('Souvenir yang mewakili produk/ perusahaan anda dihadapan konsumen?')}
              </p>
              <p className="about-q">{t('dan yang disukai banyak orang?')}</p>
              <p>
                {t(
                  'Anda sudah benar. Boneka-boneka lucu, boneka custom, bantal karakter, bantal custom dapat menjadi pilihan souvenir yang cocok untuk promosi. Kami memiliki aneka pilihan model dan desain yang dapat menghiasi momen spesial anda seperti untuk promo produk, acara perusahaan, wedding, ulang tahun, baby shower, wisuda dan lain-lain. Anda dapat memesan boneka atau bantal custom dengan berbagai ukuran, beragam pilihan bahan berkualitas dan isian kapas terbaik sehingga terjaga kualitas bentuknya serta aman digunakan oleh semua usia.'
                )}
              </p>
              <p>
                Di <b>BONEKAKU.ID</b>{' '}
                {t('kebutuhan souvenir anda dapat kami wujudkan dalam bentuk boneka, bantal, tas, maskot ataupun badut.')}
              </p>
              <p>{t('Berikanlah konsumen dan tamu anda dengan souvenir yang tak terlupakan.')}</p>
            </div>
            <div className="about-welcome-media reveal">
              <img
                decoding="async"
                src="https://bonekaku.co.id/wp-content/uploads/2018/06/Boneka_Custome.png"
                alt="Boneka custom Bonekaku dengan logo Anda"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t('Kategori')}</span>
            <h2 className="h-display">
              {t('Jagonya')} <em>{t('Buat Boneka')}</em>
            </h2>
            <p className="lead">
              {t('Berbagai kategori produk yang kami produksi sesuai kebutuhan promosi, souvenir maupun koleksi anda.')}
            </p>
          </div>
          <div className="cat-grid">
            <div className="cat-card reveal">
              <div className="cat-icon">
                <img
                  decoding="async"
                  src="https://user.uploads.dev/file/1b8f0c38c9e663178245b91cfb376a5b.png"
                  alt="Boneka Souvenir"
                  loading="lazy"
                />
              </div>
              <h3>{t('Boneka Souvenir')}</h3>
              <p>{t('Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.')}</p>
            </div>
            <div className="cat-card reveal">
              <div className="cat-icon">
                <img
                  decoding="async"
                  src="https://user.uploads.dev/file/5a76381d42fc67530f7d373f71c7afc0.png"
                  alt="Bantal Custom"
                  loading="lazy"
                />
              </div>
              <h3>{t('Bantal Custom')}</h3>
              <p>
                {t(
                  'Bantal juga dapat dijadikan media promosi yang menarik dan efektif. Kami menyediakan dan alternatif desain bantal yang dapat anda pilih.'
                )}
              </p>
            </div>
            <div className="cat-card reveal">
              <div className="cat-icon">
                <img
                  decoding="async"
                  src="https://user.uploads.dev/file/b5e6f2b07d40ff3adebb5a54d69db8bb.png"
                  alt="Boneka Custom"
                  loading="lazy"
                />
              </div>
              <h3>{t('Boneka Custom')}</h3>
              <p>
                {t(
                  'Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.'
                )}
              </p>
            </div>
            <div className="cat-card reveal">
              <div className="cat-icon">
                <img
                  decoding="async"
                  src="https://user.uploads.dev/file/2231926454d1ac833944a5f029bfdd9d.png"
                  alt="Maskot dan Badut"
                  loading="lazy"
                />
              </div>
              <h3>{t('Maskot / Badut')}</h3>
              <p>{t('Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.')}</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <ClientsMarquee />
    </section>
  );
}
