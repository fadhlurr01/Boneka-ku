import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../api';
import { useLang } from '../context/LangContext';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { t } = useLang();
  useScrollReveal([articles]);

  useEffect(() => {
    setLoading(true);
    getArticles().then((data) => {
      const items = Array.isArray(data) ? data : data?.data || [];
      setArticles(items);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const filteredArticles = articles.filter(
    (a) =>
      !search.trim() ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="page active" id="page-artikel">
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
          <h1>{t('Artikel')}</h1>
          <p>
            {t(
              'Tips, informasi dan inspirasi seputar boneka souvenir, bantal custom, maskot, bean bag dan produk promosi dari Bonekaku.'
            )}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '0 auto 36px' }}>
            <input
              className="article-search"
              type="search"
              placeholder={t('Cari artikel...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="article-grid" id="articleGrid">
            {filteredArticles.length === 0 ? (
              <div className="ad-empty" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px' }}>
                <b>{t('Belum ada artikel ditemukan')}</b>
                <p>{t('Coba ubah kata kunci pencarian Anda.')}</p>
              </div>
            ) : (
              filteredArticles.map((a) => (
                <Link
                  className="article-card reveal"
                  to={`/artikel/${a.slug}`}
                  key={a.id}
                  aria-label={`Baca artikel: ${a.title}`}
                >
                  <div className={`article-media ${a.cover_image ? '' : 'no-img'}`}>
                    {a.cover_image && (
                      <img decoding="async" src={a.cover_image} alt={a.title} loading="lazy" />
                    )}
                    <span className="article-date">{a.date_formatted || 'Terbaru'}</span>
                  </div>
                  <div className="article-body">
                    <h3>{a.title}</h3>
                    <p className="article-excerpt">{a.excerpt}</p>
                    <span className="more">
                      {t('Read more')}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
