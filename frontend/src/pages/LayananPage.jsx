import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import useScrollReveal from '../hooks/useScrollReveal';

export default function LayananPage() {
  const { t } = useLang();
  useScrollReveal();

  const services = [
    {
      title: 'Boneka Souvenir',
      desc: 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.',
      icon: 'https://user.uploads.dev/file/1b8f0c38c9e663178245b91cfb376a5b.png',
      link: '/katalog?cat=boneka-sovenir',
      isImg: true
    },
    {
      title: 'Bantal Custom',
      desc: 'Bantal juga dapat dijadikan media promosi yang menarik dan efektif. Kami menyediakan dan alternatif desain bantal yang dapat anda pilih.',
      icon: 'https://user.uploads.dev/file/5a76381d42fc67530f7d373f71c7afc0.png',
      link: '/katalog?cat=bantal-custom',
      isImg: true
    },
    {
      title: 'Boneka Custom',
      desc: 'Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.',
      icon: 'https://user.uploads.dev/file/b5e6f2b07d40ff3adebb5a54d69db8bb.png',
      link: '/katalog?cat=boneka-custom',
      isImg: true
    },
    {
      title: 'Maskot / Badut',
      desc: 'Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.',
      icon: 'https://user.uploads.dev/file/2231926454d1ac833944a5f029bfdd9d.png',
      link: '/katalog?cat=boneka-maskot',
      isImg: true
    },
    {
      title: 'Bean Bag',
      desc: 'Tempat duduk malas yang lembut — produksi bean bag berkualitas dalam berbagai ukuran dan pilihan bahan waterproof.',
      link: '/#special',
      isImg: false,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 18h14M6 18V9l6-4 6 4v9M9 18v-5h6v5" />
        </svg>
      )
    },
    {
      title: 'Souvenir & Merchandise',
      desc: 'Boneka promosi, merchandise dan souvenir untuk promo produk, acara perusahaan, wedding, ulang tahun, baby shower, wisuda dan lain-lain.',
      link: '/katalog',
      isImg: false,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7M10 12v8M12 8l3-4-3-1-3 1 3 4" />
        </svg>
      )
    }
  ];

  return (
    <section className="page active" id="page-layanan">
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
          <h1>{t('Layanan Kami')}</h1>
          <p>
            Di <b>BONEKAKU.CO.ID</b>{' '}
            {t('kebutuhan souvenir anda dapat kami wujudkan dalam bentuk boneka, bantal, tas, maskot ataupun badut.')}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t('Apa yang Kami Buat')}</span>
            <h2 className="h-display">
              {t('Layanan')} <em>{t('Produksi')}</em>
            </h2>
            <p className="lead">
              {t('Proses cepat, bisa custom — kami jagonya. Semua kebutuhan souvenir anda dapat kami wujudkan di Bonekaku.')}
            </p>
          </div>

          <div className="svc-grid">
            {services.map((s, idx) => (
              <div className="svc-card reveal" key={idx}>
                <div className="svc-ic">
                  {s.isImg ? (
                    <img
                      decoding="async"
                      loading="lazy"
                      src={s.icon}
                      alt={s.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px' }}
                    />
                  ) : (
                    s.svg
                  )}
                </div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.desc)}</p>
                <Link className="svc-more" to={s.link}>
                  {t('Lihat Katalog')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="promise-band reveal" style={{ marginTop: '36px' }}>
            <div className="promise-item">
              <div className="big">{t('Proses Cepat')}</div>
              <p>{t('Pengerjaan produksi yang efisien tanpa mengorbankan kualitas bentuk dan jahitan.')}</p>
            </div>
            <div className="promise-item">
              <div className="big">{t('Bisa Custom')}</div>
              <p>{t('Desain, ukuran, dan bahan dapat disesuaikan dengan kebutuhan promosi anda.')}</p>
            </div>
            <div className="promise-item">
              <div className="big">{t('Kami Jagonya')}</div>
              <p>{t('Semua tentang boneka bisa dibuat di sini — kami ahlinya membuat boneka!')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="proses-layanan">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t('Bagaimana Memesannya')}</span>
            <h2 className="h-display">
              {t('Proses')} <em>{t('Pemesanan')}</em>
            </h2>
          </div>

          <div className="steps">
            <div className="step reveal">
              <div className="step-top">
                <div className="step-num">01</div>
                <div>
                  <span className="step-label">{t('Langkah 1')}</span>
                  <h3>{t('PEMESANAN')}</h3>
                </div>
              </div>
              <p>{t('Untuk pemesanan boneka, ada minimum order yang harus dipenuhi.')}</p>
              <ul>
                <li>
                  {t('Untuk boneka yang sudah pernah kami buat, minimum order')} <b>100pcs</b>.
                </li>
                <li>
                  {t('Untuk boneka desain baru, minimum order')} <b>200pcs</b>.
                </li>
                <li>
                  {t('Untuk boneka ukuran kecil (baik desain lama atau baru), minimum order')} <b>500pcs</b>.
                </li>
                <li>
                  {t('Untuk pembeli boneka grosir, boleh minimum')} <b>3pcs</b>.
                </li>
              </ul>
            </div>

            <div className="step reveal">
              <div className="step-top">
                <div className="step-num">02</div>
                <div>
                  <span className="step-label">{t('Langkah 2')}</span>
                  <h3>{t('PEMBUATAN')}</h3>
                </div>
              </div>
              <p>{t('Boneka yang kami buat adalah boneka dari bahan kain.')}</p>
              <Link className="kain-link" to="/artikel">
                {t('Contoh-contoh bahan / kain boneka')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <p style={{ marginTop: '12px' }}>
                {t(
                  'Membuat boneka didahului dengan membuat sampel boneka. Tidak semua desain gambar bisa dibuat menjadi boneka karena ada keterbatasan dalam membuat pola kain boneka sehingga bentuk-bentuk tertentu perlu disederhanakan. Warna bahan boneka sudah tertentu, tidak seperti printer yang bisa mencampur warna, sehingga warna-warna logo perusahaan harus menyesuaikan.'
                )}
              </p>
            </div>

            <div className="step reveal">
              <div className="step-top">
                <div className="step-num">03</div>
                <div>
                  <span className="step-label">{t('Langkah 3')}</span>
                  <h3>{t('ORDER CUSTOM')}</h3>
                </div>
              </div>
              <p>{t('Jika anda punya desain sendiri, silahkan mengirim email yang ada di kontak web kami.')}</p>
              <a className="kain-link" href="mailto:marketingbonekaku@gmail.com">
                marketingbonekaku@gmail.com
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
