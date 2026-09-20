import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, getArticles, getArticleComments, postArticleComment } from '../api';
import { useLang } from '../context/LangContext';

export default function ArtikelDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [related, setRelated] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState({ name: '', email_or_url: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [commentFeedback, setCommentFeedback] = useState({ type: '', message: '' });
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoadingArticle(true);

    getArticle(slug)
      .then((res) => {
        const art = res?.article || res?.data || res;
        if (art && (art.title || art.slug)) {
          setArticle(art);
          setRelated(res?.related || []);
        } else {
          setArticle(null);
        }
      })
      .catch((err) => {
        console.error('Error loading article from MySQL database:', err);
        setArticle(null);
      })
      .finally(() => {
        setLoadingArticle(false);
      });

    getArticles().then((res) => {
      const items = Array.isArray(res) ? res : res?.data || [];
      setAllArticles(items);
    });

    setLoadingComments(true);
    getArticleComments(slug)
      .then((res) => {
        setComments(Array.isArray(res) ? res : []);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  }, [slug]);

  if (loadingArticle) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <div className="am-loading">
          <div className="am-spinner"></div>
          <p>{t('Memuat Artikel...')}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <div className="am-empty-state">
          <h2>{t('Artikel Tidak Ditemukan')}</h2>
          <p style={{ marginTop: '12px', color: '#64748b' }}>
            {t('Artikel yang Anda cari tidak tersedia di database server.')}
          </p>
          <Link to="/artikel" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            {t('Kembali ke Daftar Artikel')}
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.comment.trim()) {
      setCommentFeedback({
        type: 'err',
        message: t('Nama dan komentar wajib diisi.')
      });
      return;
    }

    setSubmitting(true);
    setCommentFeedback({ type: '', message: '' });

    try {
      const res = await postArticleComment(slug, {
        name: newComment.name.trim(),
        email_or_url: newComment.email_or_url.trim(),
        comment: newComment.comment.trim(),
        is_admin: false
      });

      if (res && res.success) {
        setComments((prev) => [...prev, res.data]);
        setNewComment({ name: '', email_or_url: '', comment: '' });
        setCommentFeedback({
          type: 'ok',
          message: t('Terima kasih! Komentar Anda berhasil dikirim.')
        });
      } else {
        setCommentFeedback({
          type: 'err',
          message: res?.message || t('Gagal mengirim komentar.')
        });
      }
    } catch {
      setCommentFeedback({
        type: 'err',
        message: t('Terjadi gangguan saat mengirim komentar. Silakan coba lagi.')
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'BK';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return 'Baru saja';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return String(dateVal);
    }
  };

  return (
    <section className="page active" id="page-artikel-detail">
      <div className="ad-hero">
        {article.cover_image && (
          <img decoding="async" id="adHero" src={article.cover_image} alt={article.title} loading="eager" />
        )}
        <div className="ad-hero-inner">
          <div className="container">
            <Link className="ad-back" to="/artikel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ width: '15px', height: '15px' }}>
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {t('Kembali ke Artikel')}
            </Link>
            <div className="ad-hero-meta">
              <span className="ad-date">{article.date_formatted}</span>
              <span className="ad-author">
                <span className="ad-avatar">BK</span>
                <span>
                  <b>{article.author || 'Bonekaku Admin'}</b>
                </span>
              </span>
              <span className="ad-site">www.bonekaku.co.id</span>
            </div>
            <h1>{article.title}</h1>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container ad-container">
          <div className="ad-toolbar">
            <Link className="btn btn-outline" to="/artikel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px', marginRight: '6px' }}>
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {t('Kembali ke Daftar Artikel')}
            </Link>
          </div>

          <div
            className="ad-content"
            id="adContent"
            dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
          ></div>

          {related.length > 0 && (
            <div className="ad-bacajuga" id="adBacaJuga">
              <span className="adbj-label">{t('Baca Juga')}</span>
              <Link className="adbj-card" to={`/artikel/${related[0].slug}`}>
                {related[0].cover_image && (
                  <span
                    className="adbj-thumb"
                    style={{ backgroundImage: `url(${related[0].cover_image})` }}
                  >
                    <img src={related[0].cover_image} alt={related[0].title} loading="lazy" />
                  </span>
                )}
                <span className="adbj-body">
                  <b>{related[0].title}</b>
                  <span className="adbj-more">
                    {t('Baca selengkapnya')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          )}

          <nav className="ad-postnav" id="adPostNav" aria-label="Navigasi artikel">
            <span className="ad-postnav-label">{t('ARTIKEL')}</span>
            <div className="ad-postnav-grid">
              {prevArticle ? (
                <Link className="ad-nav-card" to={`/artikel/${prevArticle.slug}`}>
                  <span className="ad-nav-dir">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M19 12H5M11 18l-6-6 6-6" />
                    </svg>
                    {t('Sebelumnya')}
                  </span>
                  <b>{prevArticle.title}</b>
                </Link>
              ) : (
                <div className="ad-nav-card" aria-disabled="true">
                  <span className="ad-nav-dir">{t('Sebelumnya')}</span>
                  <b>-</b>
                </div>
              )}

              {nextArticle ? (
                <Link className="ad-nav-card next" to={`/artikel/${nextArticle.slug}`}>
                  <span className="ad-nav-dir">
                    {t('Berikutnya')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <b>{nextArticle.title}</b>
                </Link>
              ) : (
                <div className="ad-nav-card next" aria-disabled="true">
                  <span className="ad-nav-dir">{t('Berikutnya')}</span>
                  <b>-</b>
                </div>
              )}
            </div>
          </nav>

          <section className="ad-comments" id="adComments">
            <h3 className="adc-count">
              {comments.length} {t('Komentar')}
            </h3>

            <div className="adc-list" id="adCommentList">
              {loadingComments ? (
                <div className="am-loading" style={{ padding: '24px 0' }}>
                  <div className="am-spinner" style={{ width: '30px', height: '30px' }}></div>
                  <small>{t('Memuat komentar...')}</small>
                </div>
              ) : comments.length === 0 ? (
                <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic', margin: '10px 0 24px' }}>
                  {t('Belum ada komentar. Jadilah yang pertama berkomentar!')}
                </p>
              ) : (
                comments.map((c, i) => (
                  <div key={c.id || i} className={`adc-item ${c.is_admin ? 'is-admin' : ''}`}>
                    <div className="adc-avatar">{getInitials(c.name || c.author)}</div>
                    <div className="adc-body">
                      <div className="adc-head">
                        <b>{c.name || c.author}</b>
                        {c.email_or_url && /^https?:\/\//i.test(c.email_or_url) && (
                          <a href={c.email_or_url} target="_blank" rel="noopener noreferrer">
                            (Web)
                          </a>
                        )}
                        {c.is_admin && <span className="adc-badge">{t('Admin')}</span>}
                        <span className="adc-date">{formatDate(c.created_at || c.date)}</span>
                      </div>
                      <div className="adc-text">{c.comment}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="adc-respond">
              <h3 className="adc-title">{t('Tulis Komentar')}</h3>
              <p className="adc-notes">
                <span>{t('Alamat email atau website Anda tidak akan dipublikasikan.')}</span>{' '}
                {t('Kolom wajib ditandai')} <span className="adc-req">*</span>
              </p>

              <form className="adc-form" onSubmit={handleCommentSubmit} noValidate>
                <div className="adc-field">
                  <label htmlFor="adcComment">
                    {t('Komentar')} <span className="adc-req">*</span>
                  </label>
                  <textarea
                    id="adcComment"
                    rows="5"
                    required
                    placeholder={t('Tulis komentar Anda di sini...')}
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                  ></textarea>
                </div>

                <div className="adc-row">
                  <div className="adc-field">
                    <label htmlFor="adcName">
                      {t('Nama')} <span className="adc-req">*</span>
                    </label>
                    <input
                      id="adcName"
                      type="text"
                      required
                      placeholder={t('Nama lengkap Anda')}
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    />
                  </div>

                  <div className="adc-field">
                    <label htmlFor="adcEmail">
                      {t('Website / Email (Opsional)')}
                    </label>
                    <input
                      id="adcEmail"
                      type="text"
                      placeholder="https://… atau email"
                      value={newComment.email_or_url}
                      onChange={(e) => setNewComment({ ...newComment, email_or_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="adc-submit">
                  <button type="submit" className="adc-btn" disabled={submitting}>
                    {submitting ? t('Mengirim...') : t('Kirim Komentar')}
                  </button>
                </div>

                {commentFeedback.message && (
                  <div className={`adc-msg ${commentFeedback.type}`}>
                    {commentFeedback.message}
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}
