import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../../api';
import { useLang } from '../../context/LangContext';

export default function CatalogPreview({ onOpenLightbox }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { t } = useLang();

  useEffect(() => {
    getCategories().then((data) => setCategories(data || []));
  }, []);

  useEffect(() => {
    getProducts({
      category: currentCategory,
      search: search,
      per_page: 12
    }).then((data) => {
      if (Array.isArray(data)) setProducts(data.slice(0, 12));
      else if (data && data.data) setProducts(data.data.slice(0, 12));
    });
  }, [currentCategory, search]);

  return (
    <section className="section section-alt" id="katalog">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('Katalog Lengkap')}</span>
          <h2 className="h-display">
            {t('Jelajahi')} <em>{t('Produk Kami')}</em>
          </h2>
          <p className="lead">
            {t(
              'Ratusan model boneka souvenir, bantal custom, dan maskot perusahaan siap kami produksi sesuai kebutuhan anda.'
            )}
          </p>
        </div>

        <div className="filter-bar" id="filterBar">
          <div className="filter-scroll">
            <button
              className={`filter-chip ${currentCategory === 'all' ? 'active' : ''}`}
              type="button"
              onClick={() => setCurrentCategory('all')}
            >
              {t('Semua')}
            </button>
            {categories.map((c) => (
              <button
                className={`filter-chip ${currentCategory === c.slug ? 'active' : ''}`}
                type="button"
                key={c.id}
                onClick={() => setCurrentCategory(c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="cat-search-box" style={{ maxWidth: '320px', marginLeft: 'auto' }}>
            <input
              type="text"
              className="cat-search-input"
              placeholder={t('Cari produk boneka...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '99px',
                border: '1px solid var(--line)',
                background: 'var(--white)',
                color: 'var(--ink)'
              }}
            />
          </div>
        </div>

        <div className="catalog-grid" style={{ marginTop: '28px' }}>
          {products.map((p) => (
            <div className="kat-tile" key={p.id}>
              <div className="kat-media">
                <img
                  decoding="async"
                  src={p.image_url}
                  alt={p.name}
                  loading="lazy"
                  onClick={() => onOpenLightbox && onOpenLightbox(p.image_url, p.name)}
                  style={{ cursor: 'zoom-in' }}
                />
                <span className="kat-badge">{p.tag || p.category_slug}</span>
              </div>
              <div className="kat-body">
                <h4>{p.name}</h4>
                <p>{p.description || t('Koleksi boneka pilihan siap produksi.')}</p>
                <div className="kat-actions">
                  <a
                    className="btn btn-sm btn-outline"
                    href={`https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
                      p.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', marginRight: '6px' }}>
                      <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
                    </svg>
                    Tanya WA
                  </a>
                  <Link className="btn btn-sm btn-light" to="/katalog">
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <Link className="btn btn-primary" to="/katalog" style={{ padding: '14px 34px', fontSize: '1rem' }}>
            {t('Lihat Semua 100+ Produk di Katalog')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ width: '18px', height: '18px', marginLeft: '8px' }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
