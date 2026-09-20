import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Hero() {
  const { t } = useLang();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.25 + 0.05
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 184, 77, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-media">
        <img
          decoding="async"
          src="https://user.uploads.dev/file/542180cda4db296f51173b93a206494b.jpg"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="hero-overlay"></div>
      <canvas ref={canvasRef} className="hero-dolls" id="dollBg" aria-hidden="true"></canvas>

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">{t('Pusat Souvenir & Boneka Terlengkap')}</span>
          <h1>
            bonekaku<span>.</span>
          </h1>
          <p className="hero-sub">{t('Semua tentang boneka bisa dibuat di sini')}</p>
          <p className="desc">
            {t(
              'Anda sudah benar. Boneka-boneka lucu, boneka custom, bantal karakter, bantal custom dapat menjadi pilihan souvenir yang cocok untuk promosi. Kami memiliki aneka pilihan model dan desain yang dapat menghiasi momen spesial anda seperti untuk promo produk, acara perusahaan, wedding, ulang tahun, baby shower, wisuda dan lain-lain. Anda dapat memesan boneka atau bantal custom dengan berbagai ukuran, beragam pilihan bahan berkualitas dan isian kapas terbaik sehingga terjaga kualitas bentuknya serta aman digunakan oleh semua usia.'
            )}
          </p>

          <div className="hero-ctas">
            <a
              className="btn btn-primary"
              href="https://wa.me/6281385508611"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
              </svg>
              {t('Kontak Kami')}
            </a>
            <Link className="btn btn-light" to="/katalog">
              {t('Lihat Katalog')}
            </Link>
          </div>

          <div className="hero-chips">
            <span>Wedding</span>
            <span>Ulang Tahun</span>
            <span>Baby Shower</span>
            <span>Wisuda</span>
            <span>Promo Produk</span>
            <span>Acara Perusahaan</span>
          </div>

          <a className="watch-link" href="#special" aria-label="Tonton video Bonekaku">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            {t('Tonton video kami')}
          </a>
        </div>

        <div className="hero-card">
          <h3>
            {t('Proses Cepat')} <em>{t('Bisa Custom')}</em> {t('Kami Jagonya')}
          </h3>
          <p>
            Di <b>BONEKAKU.CO.ID</b>{' '}
            {t('kebutuhan souvenir anda dapat kami wujudkan dalam bentuk boneka, bantal, tas, maskot ataupun badut.')}
          </p>
          <div className="card-links">
            <a
              className="btn btn-cocoa"
              href="https://wa.me/6281385508611"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Kontak Kami')}
            </a>
            <Link to="/katalog">
              {t('Jelajahi Katalog')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-hint">Scroll</div>
    </section>
  );
}
