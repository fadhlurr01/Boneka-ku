import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

export default function Steps() {
  const { t } = useLang();

  return (
    <section className="section section-alt" id="proses">
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
  );
}
