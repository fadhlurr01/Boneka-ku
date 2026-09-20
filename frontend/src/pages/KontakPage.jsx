import React, { useState } from 'react';
import { sendContact } from '../api';
import { useLang } from '../context/LangContext';
import useScrollReveal from '../hooks/useScrollReveal';

export default function KontakPage() {
  const { t } = useLang();
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await sendContact(formData);
      setSubmitted(true);
      setStatusMsg(res.message || t('Pesan berhasil terkirim! Tim kami akan segera menghubungi Anda.'));
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatusMsg(t('Terjadi kesalahan saat mengirim pesan. Silakan coba via WhatsApp.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page active" id="page-kontak">
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
          <h1>{t('Kontak Kami')}</h1>
          <p>
            {t(
              'Kunjungi dan hubungi kami. Tim kami siap membantu kebutuhan souvenir, boneka custom, dan merchandise anda.'
            )}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h4>Office</h4>
              <p>
                Jl. Katelia Raya Blok AS-3 No. 35, Jl. Raya Kranggan, RT.006/RW.014, Jatisampurna, Kec. Jatisampurna, Kota
                Bks, Jawa Barat 17433
              </p>
            </div>

            <div className="contact-card reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h4>Workshop</h4>
              <p>Jln. Bogor-Bekasi No.61 Ciketing Udik, Bantar Gebang, Bekasi.</p>
            </div>

            <div className="contact-card reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.6 2.81.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h4>Hot Line</h4>
              <p>
                <a href="tel:6281385508611">0813-8550-8611</a>
              </p>
            </div>

            <div className="contact-card reveal">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </div>
              <h4>Email</h4>
              <p>
                <a href="mailto:marketingbonekaku@gmail.com">marketingbonekaku@gmail.com</a>
              </p>
            </div>
          </div>

          <div
            className="contact-form-wrap reveal"
            style={{
              marginTop: '44px',
              padding: '36px',
              background: 'var(--white)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{t('Kirim Pesan / Permintaan Penawaran')}</h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
              {t('Isi formulir di bawah ini untuk menanyakan estimasi harga, pembuatan sampel, atau kerja sama produksi.')}
            </p>

            {statusMsg && (
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  background: submitted ? '#E6F4EA' : '#FCE8E6',
                  color: submitted ? '#137333' : '#C5221F',
                  fontWeight: 600
                }}
              >
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>{t('Nama Lengkap')} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--ink)' }}
                  placeholder="Contoh: Budi Santoso"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>{t('No. WhatsApp / Telepon')} *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--ink)' }}
                  placeholder="081234567890"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>{t('Email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--ink)' }}
                  placeholder="email@perusahaan.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>{t('Jenis Pesanan / Subjek')}</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--ink)' }}
                  placeholder="Contoh: Pembuatan 300pcs Boneka Maskot"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>{t('Pesan / Deskripsi Kebutuhan')} *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--ink)' }}
                  placeholder={t('Jelaskan detail kebutuhan seperti ukuran, jumlah perkiraan, deadline, dan referensi desain...')}
                ></textarea>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ padding: '14px 32px' }}
                >
                  {submitting ? t('Mengirim...') : t('Kirim Pesan Sekarang')}
                </button>
              </div>
            </form>
          </div>

          <div className="map-wrap reveal" style={{ marginTop: '36px' }}>
            <iframe
              title="Peta lokasi Bonekaku"
              src="https://maps.google.com/maps?q=Jl.%20Katelia%20Raya%20Blok%20AS-3%20No.%2035%2C%20Jl.%20Raya%20Kranggan%2C%20RT.006%2FRW.014%2C%20Jatisampurna%2C%20Kec.%20Jatisampurna%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017433&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className="social-row reveal">
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

          <div className="katalog-cta reveal">
            <a className="btn btn-cocoa" href="https://wa.me/6281385508611" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
              </svg>
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
