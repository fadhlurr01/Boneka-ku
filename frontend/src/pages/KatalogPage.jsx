import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../api';
import { useLang } from '../context/LangContext';
import useScrollReveal from '../hooks/useScrollReveal';

export default function KatalogPage({ onOpenLightbox }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedId, setFlippedId] = useState(null);
  const pageSize = 20;
  const { t } = useLang();

  useScrollReveal([activeCategory, currentPage, viewMode]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategories(), getProducts()]).then(([cats, prods]) => {
      setCategories(Array.isArray(cats) ? cats : []);
      setProducts(Array.isArray(prods) ? prods : []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleSelectCategory = (catSlug) => {
    setActiveCategory(catSlug);
    setCurrentPage(1);
    if (catSlug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: catSlug });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === 'all' ||
        p.category_slug === activeCategory ||
        (activeCategory === 'bantal' && p.category_slug === 'bantal-custom') ||
        (activeCategory === 'maskot' && p.category_slug === 'boneka-maskot') ||
        (activeCategory === 'graduation' && p.category_slug === 'boneka-wisuda');

      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase().includes(search.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const displayedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearch('');
    setCurrentPage(1);
    setSearchParams({});
  };

  const toggleFlip = (id) => {
    setFlippedId(prev => (prev === id ? null : id));
  };

  const waIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z" />
    </svg>
  );

  return (
    <section className="page active" id="page-katalog">
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
          <h1>{t('Katalog')}</h1>
          <p>
            {t(
              'Jelajahi semua produk Bonekaku — boneka souvenir, animal series, bantal custom, boneka custom, graduation series, maskot & masker. Arahkan kursor ke kartu untuk membalik dan melihat detail, atau gunakan filter kategori di samping.'
            )}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="catalog-layout">
            <aside className="catalog-side">
              <h3>{t('Filter Kategori')}</h3>
              <input
                className="search-box"
                id="catSearch"
                type="search"
                placeholder={t('Cari produk...')}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <div className="filter-group" id="catFilters">
                <button
                  className={`cat-check ${activeCategory === 'all' ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleSelectCategory('all')}
                >
                  <span>{t('Semua Kategori')}</span>
                  <span className="n">({products.length})</span>
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.category_slug === c.slug).length;
                  return (
                    <button
                      className={`cat-check ${activeCategory === c.slug ? 'active' : ''}`}
                      type="button"
                      key={c.id}
                      onClick={() => handleSelectCategory(c.slug)}
                    >
                      <span>{c.name}</span>
                      <span className="n">({count})</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="catalog-main">
              <div className="cat-chip-row" id="catChips">
                <button
                  className={`cat-chip ${activeCategory === 'all' ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleSelectCategory('all')}
                >
                  {t('Semua')}
                </button>
                {categories.map((c) => (
                  <button
                    className={`cat-chip ${activeCategory === c.slug ? 'active' : ''}`}
                    type="button"
                    key={c.id}
                    onClick={() => handleSelectCategory(c.slug)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="catalog-topbar">
                <p className="catalog-count" id="catCount">
                  {t('Menampilkan')} <b>{displayedProducts.length}</b> {t('dari')}{' '}
                  <b>{filteredProducts.length}</b> {t('produk')}
                </p>
                <div className="catalog-tools">
                  <button className="catalog-clear" id="catClear" type="button" onClick={resetFilters}>
                    {t('Reset Filter')}
                  </button>
                  <div className="view-switch" role="group" aria-label="Pilih tampilan katalog">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      type="button"
                      onClick={() => setViewMode('grid')}
                      aria-label="Tampilan Grid"
                      title="Tampilan Grid"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      type="button"
                      onClick={() => setViewMode('list')}
                      aria-label="Tampilan Row / List"
                      title="Tampilan Row / List"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="7" height="5" rx="1.5" />
                        <rect x="14" y="4" width="7" height="5" rx="1.5" />
                        <rect x="3" y="15" width="7" height="5" rx="1.5" />
                        <rect x="14" y="15" width="7" height="5" rx="1.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className={`catalog-grid ${viewMode === 'list' ? 'view-list' : ''}`} id="catGrid">
                {displayedProducts.map((p) => {
                  const isFlipped = flippedId === p.id;
                  return (
                    <div
                      className={`flip-card catalog-card ${isFlipped ? 'flip' : ''}`}
                      key={p.id}
                      onMouseEnter={() => setFlippedId(p.id)}
                      onMouseLeave={() => setFlippedId(null)}
                      onFocus={() => setFlippedId(p.id)}
                      onBlur={() => setFlippedId(null)}
                      onClick={() => toggleFlip(p.id)}
                      aria-pressed={isFlipped}
                      tabIndex={0}
                    >
                      <div className="flip-inner">
                        <div className="flip-face flip-front">
                          <div className="face-img">
                            <span className="face-tag">{p.tag || p.category_slug}</span>
                            <img
                              decoding="async"
                              src={p.image_url}
                              alt={p.name}
                              loading="lazy"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenLightbox) onOpenLightbox(p.image_url, p.name);
                              }}
                            />
                          </div>
                          <div className="face-name">
                            <span>{p.name}</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                              <path d="M21 3v6h-6" />
                            </svg>
                          </div>
                          <div className="face-meta">
                            <p className="face-desc">{p.description || t('Kualitas premium siap produksi massal.')}</p>
                            <a
                              className="face-wa"
                              href={`https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20mau%20order%20${encodeURIComponent(
                                p.name
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {waIcon} {t('Order via WhatsApp')}
                            </a>
                          </div>
                        </div>

                        <div className="flip-face flip-back">
                          <div>
                            <h4>{p.name}</h4>
                            <p>{p.description || t('Kualitas terjamin, jahitan rapi, dan busa empuk tahan lama.')}</p>
                            {p.size && <p><b>Ukuran:</b> {p.size}</p>}
                          </div>
                          <div className="back-ctas">
                            <a
                              className="wa"
                              href={`https://wa.me/6281385508611?text=Halo%20Bonekaku,%20saya%20mau%20order%20${encodeURIComponent(
                                p.name
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {waIcon} {t('Order via WhatsApp')}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav className="cat-pager" id="catPager" aria-label="Navigasi halaman produk">
                  <button
                    className="pg-btn pg-arrow"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  >
                    « Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      className={`pg-btn ${currentPage === num ? 'active' : ''}`}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    className="pg-btn pg-arrow"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  >
                    Next »
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
