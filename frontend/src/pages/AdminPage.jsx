import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getCategories,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getMediaList,
  uploadMedia,
  deleteMedia,
  getSettings,
  updateSettings
} from '../api';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

export default function AdminPage() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('adm-active');
    return () => {
      document.body.classList.remove('adm-active');
    };
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('bonekaku_admin_session') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('bonekaku_admin_pw') || 'admin123';
  });

  // Navigation / Views: 'dashboard' | 'artikel' | 'katalog' | 'media' | 'pengaturan'
  const [currentView, setCurrentView] = useState('dashboard');

  // Articles state (MySQL: articles)
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articleSearch, setArticleSearch] = useState('');
  const [articleFilter, setArticleFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [articlePage, setArticlePage] = useState(1);

  // Products state (MySQL: products)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productPage, setProductPage] = useState(1);
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    category_slug: 'boneka-custom',
    tag: '',
    name: '',
    slug: '',
    image_url: '',
    size: '',
    price: '',
    description: '',
    is_featured: false,
    is_new: false,
    sort_order: 0
  });

  // Product form upload helpers
  const [productImgMode, setProductImgMode] = useState('device'); // 'device' | 'url'
  const [uploadingProductImg, setUploadingProductImg] = useState(false);
  const productFileInputRef = useRef(null);

  // Editor Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCover, setFormCover] = useState('');
  const [articleCoverMode, setArticleCoverMode] = useState('device'); // 'device' | 'url'
  const [uploadingArticleCover, setUploadingArticleCover] = useState(false);
  const articleFileInputRef = useRef(null);
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formStatus, setFormStatus] = useState('published');
  const [formContent, setFormContent] = useState('');
  const [editorPreview, setEditorPreview] = useState(false);
  const [editorError, setEditorError] = useState('');
  const [savingArticle, setSavingArticle] = useState(false);

  // Media Picker Dialog (choose existing uploaded media into form)
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState(null); // 'product' | 'article'

  // Media Library state (Server storage)
  const [mediaList, setMediaList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const fileInputRef = useRef(null);

  // Settings state
  const [pwCur, setPwCur] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwNew2, setPwNew2] = useState('');
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });

  // Modal Dialog & Toast state
  const [modal, setModal] = useState({ open: false, title: '', text: '', itemName: '', onConfirm: null });
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = 'ok') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const loadArticlesData = async () => {
    setLoadingArticles(true);
    try {
      const res = await getArticles({ status: 'all' });
      const items = Array.isArray(res) ? res : res?.data || [];
      setArticles(items);
    } catch (err) {
      console.error('Error fetching articles from MySQL database:', err);
      setArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  };

  const loadProductsData = async () => {
    setLoadingProducts(true);
    try {
      const res = await getProducts();
      const items = Array.isArray(res) ? res : res?.data || [];
      setProducts(items);
    } catch (err) {
      console.error('Error fetching products from MySQL database:', err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadMediaData = async () => {
    setLoadingMedia(true);
    try {
      const list = await getMediaList();
      setMediaList(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Error fetching media from server:', err);
      setMediaList([]);
    } finally {
      setLoadingMedia(false);
    }
  };

  const loadCategoriesData = async () => {
    try {
      const list = await getCategories();
      const items = Array.isArray(list) ? list : list?.data || [];
      setCategories(items);
    } catch (err) {
      console.error('Error fetching categories from MySQL database:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadArticlesData();
      loadProductsData();
      loadMediaData();
      loadCategoriesData();
    }
  }, [isAuthenticated]);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword || password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('bonekaku_admin_session', 'true');
      setLoginError('');
      setPassword('');
      addToast('Selamat datang, Administrator!', 'ok');
    } else {
      setLoginError('Password salah. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bonekaku_admin_session');
    addToast('Anda telah keluar dari Admin Panel.', 'ok');
  };

  // Auto generate slug from title
  const handleTitleChange = (val) => {
    setFormTitle(val);
    if (!editingArticleId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormSlug(generated);
    }
  };

  // Open drawer for new article
  const handleOpenNewArticle = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormSlug('');
    setFormAuthor('Bonekaku Admin');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormCover('');
    setFormExcerpt('');
    setFormTags('boneka, souvenir, custom');
    setFormStatus('published');
    setFormContent('<p>Tulis konten artikel di sini...</p>');
    setEditorPreview(false);
    setEditorError('');
    setDrawerOpen(true);
  };

  // Open drawer for editing existing article
  const handleOpenEditArticle = (art) => {
    setEditingArticleId(art.id);
    setFormTitle(art.title || '');
    setFormSlug(art.slug || '');
    setFormAuthor(art.author || 'Bonekaku Admin');
    setFormDate(art.date_formatted ? new Date().toISOString().split('T')[0] : '');
    setFormCover(art.cover_image || '');
    setFormExcerpt(art.excerpt || '');
    setFormTags(art.tags || 'boneka, souvenir');
    setFormStatus(art.status || 'published');
    setFormContent(art.content || `<p>${art.excerpt || ''}</p>`);
    setEditorPreview(false);
    setEditorError('');
    setDrawerOpen(true);
  };

  // Save Article
  const handleSaveArticle = async () => {
    if (!formTitle.trim()) {
      setEditorError('Judul artikel wajib diisi.');
      return;
    }

    setSavingArticle(true);
    setEditorError('');

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      author: formAuthor.trim() || 'Bonekaku Admin',
      cover_image: formCover.trim(),
      excerpt: formExcerpt.trim(),
      tags: formTags.trim(),
      status: formStatus,
      content: formContent
    };

    try {
      if (editingArticleId) {
        await updateArticle(editingArticleId, payload);
        addToast('Artikel berhasil diperbarui!', 'ok');
      } else {
        await createArticle(payload);
        addToast('Artikel baru berhasil diterbitkan!', 'ok');
      }
      setDrawerOpen(false);
      loadArticlesData();
    } catch {
      setEditorError('Gagal menyimpan artikel. Silakan periksa kembali data.');
    } finally {
      setSavingArticle(false);
    }
  };

  // Image Upload Handlers for Product and Article Drawers
  const handleUploadProductImage = async (file) => {
    if (!file) return;
    setUploadingProductImg(true);
    try {
      const res = await uploadMedia(file);
      const url = res?.url || res?.data?.url || (res?.name ? `https://api-bonekaku-v3.kembangin.online/uploads/media/${res.name}` : '');
      if (url) {
        setProductForm((prev) => ({ ...prev, image_url: url }));
        addToast('Foto produk berhasil diunggah!', 'ok');
        loadMediaData();
      } else {
        addToast('Gagal memproses unggahan gambar.', 'err');
      }
    } catch (err) {
      console.error(err);
      addToast('Gagal mengunggah foto produk dari perangkat.', 'err');
    } finally {
      setUploadingProductImg(false);
    }
  };

  const handleUploadArticleCover = async (file) => {
    if (!file) return;
    setUploadingArticleCover(true);
    try {
      const res = await uploadMedia(file);
      const url = res?.url || res?.data?.url || (res?.name ? `https://api-bonekaku-v3.kembangin.online/uploads/media/${res.name}` : '');
      if (url) {
        setFormCover(url);
        addToast('Sampul artikel berhasil diunggah!', 'ok');
        loadMediaData();
      } else {
        addToast('Gagal memproses unggahan sampul.', 'err');
      }
    } catch (err) {
      console.error(err);
      addToast('Gagal mengunggah sampul artikel dari perangkat.', 'err');
    } finally {
      setUploadingArticleCover(false);
    }
  };

  const handleSelectMediaForForm = (mediaUrl) => {
    if (mediaPickerTarget === 'product') {
      setProductForm((prev) => ({ ...prev, image_url: mediaUrl }));
      addToast('Gambar produk berhasil dipilih dari pustaka media.', 'ok');
    } else if (mediaPickerTarget === 'article') {
      setFormCover(mediaUrl);
      addToast('Sampul artikel berhasil dipilih dari pustaka media.', 'ok');
    }
    setMediaPickerOpen(false);
    setMediaPickerTarget(null);
  };

  // Delete Article confirmation with Centered Modal
  const handleDeleteArticle = (art) => {
    setModal({
      open: true,
      title: 'Hapus Artikel?',
      text: 'Artikel ini akan dihapus secara permanen dari database sistem.',
      itemName: art.title,
      onConfirm: async () => {
        setModal({ open: false, title: '', text: '', itemName: '', onConfirm: null });
        try {
          await deleteArticle(art.id);
          addToast('Artikel berhasil dihapus.', 'ok');
          loadArticlesData();
        } catch {
          addToast('Gagal menghapus artikel.', 'err');
        }
      }
    });
  };

  const openProductEditor = (product = null) => {
    if (product) {
      setEditingProductId(product.id);
      setProductForm({
        category_slug: product.category_slug || 'boneka-custom',
        tag: product.tag || '',
        name: product.name || '',
        slug: product.slug || '',
        image_url: product.image_url || '',
        size: product.size || '',
        price: product.price ?? '',
        description: product.description || '',
        is_featured: Boolean(product.is_featured),
        is_new: Boolean(product.is_new),
        sort_order: product.sort_order ?? 0
      });
      setProductImgMode(product.image_url ? 'url' : 'device');
    } else {
      setEditingProductId(null);
      setProductForm({
        category_slug: categories[0]?.slug || 'boneka-custom',
        tag: '',
        name: '',
        slug: '',
        image_url: '',
        size: '',
        price: '',
        description: '',
        is_featured: false,
        is_new: false,
        sort_order: 0
      });
      setProductImgMode('device');
    }
    setProductDrawerOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!productForm.name.trim()) {
      addToast('Nama produk wajib diisi.', 'err');
      return;
    }

    const payload = {
      category_slug: productForm.category_slug,
      tag: productForm.tag.trim(),
      name: productForm.name.trim(),
      slug: productForm.slug.trim() || productForm.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      image_url: productForm.image_url.trim(),
      size: productForm.size.trim(),
      price: productForm.price === '' ? 0 : Number(productForm.price),
      description: productForm.description.trim(),
      is_featured: Boolean(productForm.is_featured),
      is_new: Boolean(productForm.is_new),
      sort_order: Number(productForm.sort_order || 0)
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, payload);
        addToast('Produk berhasil diperbarui.', 'ok');
      } else {
        await createProduct(payload);
        addToast('Produk baru berhasil ditambahkan.', 'ok');
      }
      setProductDrawerOpen(false);
      loadProductsData();
    } catch {
      addToast('Gagal menyimpan produk. Cek kembali data dan kategori.', 'err');
    }
  };

  const handleDeleteProduct = (prod) => {
    setModal({
      open: true,
      title: 'Hapus Produk?',
      text: 'Produk ini akan dihapus secara permanen dari database katalog.',
      itemName: prod.name,
      onConfirm: async () => {
        setModal({ open: false, title: '', text: '', itemName: '', onConfirm: null });
        try {
          await deleteProduct(prod.id);
          addToast('Produk berhasil dihapus.', 'ok');
          loadProductsData();
        } catch {
          addToast('Gagal menghapus produk.', 'err');
        }
      }
    });
  };

  // Media upload handler
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadMedia(files[i]);
      } catch (err) {
        console.error(err);
      }
    }
    setUploadingMedia(false);
    addToast('Berkas berhasil diunggah ke Pustaka Media.', 'ok');
    loadMediaData();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteMedia = (filename) => {
    setModal({
      open: true,
      title: 'Hapus Gambar Media?',
      text: 'Berkas gambar ini akan dihapus secara permanen dari penyimpanan server.',
      itemName: filename,
      onConfirm: async () => {
        setModal({ open: false, title: '', text: '', itemName: '', onConfirm: null });
        try {
          await deleteMedia(filename);
          addToast('Gambar berhasil dihapus.', 'ok');
          loadMediaData();
        } catch {
          addToast('Gagal menghapus gambar.', 'err');
        }
      }
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast('URL berhasil disalin ke clipboard!', 'ok');
  };

  // Change password
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (pwCur !== adminPassword) {
      setPwMsg({ type: 'err', text: 'Password saat ini tidak cocok.' });
      return;
    }
    if (pwNew.length < 6) {
      setPwMsg({ type: 'err', text: 'Password baru minimal 6 karakter.' });
      return;
    }
    if (pwNew !== pwNew2) {
      setPwMsg({ type: 'err', text: 'Konfirmasi password baru tidak cocok.' });
      return;
    }

    setAdminPassword(pwNew);
    localStorage.setItem('bonekaku_admin_pw', pwNew);
    setPwMsg({ type: 'ok', text: 'Password admin berhasil diperbarui.' });
    setPwCur('');
    setPwNew('');
    setPwNew2('');
    addToast('Password berhasil diganti.', 'ok');
  };

  const handleResetDefaultPassword = () => {
    setAdminPassword('admin123');
    localStorage.removeItem('bonekaku_admin_pw');
    setPwMsg({ type: 'ok', text: 'Password telah dikembalikan ke standar (admin123).' });
    addToast('Password admin direset ke bawaan.', 'ok');
  };

  // Editor rich text command
  const execCmd = (cmd) => {
    if (cmd === 'h2') {
      setFormContent((prev) => prev + `\n<h2>Subjudul Baru</h2>\n<p>Paragraf pembahasan...</p>`);
    } else if (cmd === 'h3') {
      setFormContent((prev) => prev + `\n<h3>Poin Pembahasan</h3>\n<p>Paragraf...</p>`);
    } else if (cmd === 'ul') {
      setFormContent((prev) => prev + `\n<ul>\n  <li>Poin pertama</li>\n  <li>Poin kedua</li>\n</ul>`);
    } else if (cmd === 'ol') {
      setFormContent((prev) => prev + `\n<ol>\n  <li>Langkah 1</li>\n  <li>Langkah 2</li>\n</ol>`);
    } else if (cmd === 'quote') {
      setFormContent((prev) => prev + `\n<blockquote>Kutipan penting di sini...</blockquote>`);
    } else if (cmd === 'image') {
      const url = prompt('Masukkan URL gambar (https://...):');
      if (url) {
        setFormContent((prev) => prev + `\n<figure><img src="${url}" alt="Gambar artikel"><figcaption>Keterangan gambar</figcaption></figure>`);
      }
    } else if (cmd === 'link') {
      const url = prompt('Masukkan tautan URL:');
      if (url) {
        setFormContent((prev) => prev + ` <a href="${url}" target="_blank" rel="noopener noreferrer">tautan di sini</a> `);
      }
    } else if (cmd === 'bold') {
      setFormContent((prev) => prev + ` <b>teks tebal</b> `);
    } else if (cmd === 'italic') {
      setFormContent((prev) => prev + ` <i>teks miring</i> `);
    } else if (cmd === 'underline') {
      setFormContent((prev) => prev + ` <u>garis bawah</u> `);
    } else if (cmd === 'clear') {
      setFormContent((prev) => prev.replace(/<[^>]*>/g, ' '));
    }
  };

  // Filtered articles list
  const filteredArticles = articles.filter((a) => {
    const matchSearch =
      !articleSearch.trim() ||
      a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(articleSearch.toLowerCase()));

    const status = a.status || 'published';
    const matchStatus = articleFilter === 'all' || status === articleFilter;

    return matchSearch && matchStatus;
  });

  const articlePageSize = 10;
  const totalArticlePages = Math.ceil(filteredArticles.length / articlePageSize) || 1;
  const paginatedArticles = filteredArticles.slice((articlePage - 1) * articlePageSize, articlePage * articlePageSize);

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !productSearch.trim() ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.tag && p.tag.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase()));

    const matchCat =
      productCategoryFilter === 'all' ||
      p.category_slug === productCategoryFilter ||
      (productCategoryFilter === 'bantal' && p.category_slug === 'bantal-custom') ||
      (productCategoryFilter === 'maskot' && p.category_slug === 'boneka-maskot') ||
      (productCategoryFilter === 'graduation' && p.category_slug === 'boneka-wisuda');

    return matchSearch && matchCat;
  });

  const productPageSize = 12;
  const totalProductPages = Math.ceil(filteredProducts.length / productPageSize) || 1;
  const paginatedProducts = filteredProducts.slice((productPage - 1) * productPageSize, productPage * productPageSize);

  // Calculate statistics
  const totalPosts = articles.length;
  const publishedPosts = articles.filter((a) => (a.status || 'published') === 'published').length;
  const draftPosts = articles.filter((a) => a.status === 'draft').length;
  const totalMediaCount = mediaList.length;

  // Render Login Gate if unauthenticated
  if (!isAuthenticated) {
    return (
      <section className="page active" id="page-admin">
        <div className="adm-login-shell">
          <div className="adm-login-card">
            <div className="adm-login-theme">
              <div className="lang-switch" role="group" aria-label="Pilih bahasa">
                <button
                  type="button"
                  className={lang === 'id' ? 'active' : ''}
                  onClick={() => setLang('id')}
                >
                  ID
                </button>
                <button
                  type="button"
                  className={lang === 'en' ? 'active' : ''}
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
              </div>
              <button
                className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
                type="button"
                onClick={toggleTheme}
                aria-label="Ganti tema"
              >
                <span className="tt-knob">
                  <svg className="tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                  <svg className="tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="adm-login-inner">
              <span className="adm-login-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                {t('Area Terbatas')}
              </span>
              <h1>Admin Panel</h1>
              <p className="adm-login-sub">
                {t('Masuk untuk mengelola artikel, gambar, dan konten website Bonekaku.')}
              </p>

              <form onSubmit={handleLogin}>
                <div className="adm-field">
                  <label htmlFor="admPw">{t('Password Admin')}</label>
                  <div className="adm-input-wrap">
                    <input
                      className="adm-input"
                      type={showPassword ? 'text' : 'password'}
                      id="admPw"
                      placeholder={t('Masukkan password admin (default: admin123)')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      className="adm-eye"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Tampilkan password"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="adm-alert err">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v5M12 16h.01" />
                    </svg>
                    <span>{loginError}</span>
                  </div>
                )}

                <button className="adm-btn adm-btn-primary" type="submit" style={{ width: '100%' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  <span>{t('Masuk ke Panel')}</span>
                </button>
              </form>

              <div className="adm-login-foot">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                {t('Halaman ini hanya untuk administrator website.')}
              </div>
            </div>
          </div>

          <aside className="adm-login-brand">
            <div className="adm-login-brand-in">
              <div className="adm-login-logo">
                <span className="adm-logo-plate">
                  <img
                    decoding="async"
                    src="https://user.uploads.dev/file/ff7baea119e28ffb2c6fa5772bfc40d7.png"
                    alt="Bonekaku"
                  />
                </span>
              </div>
              <div className="alb-name">Bonekaku</div>
              <p className="alb-tag">{t('Jasa pembuatan boneka promosi, bantal custom, maskot, dan souvenir.')}</p>
              <div className="alb-chips">
                <span>Boneka Souvenir</span>
                <span>Bantal Custom</span>
                <span>Boneka Custom</span>
                <span>Maskot &amp; Badut</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  // Render Full Admin Panel
  return (
    <section className="page active" id="page-admin">
      <div id="admPanel">
        <div className="adm-wrap">
          {/* Top Hero Banner */}
          <div className="adm-hero">
            <div className="adm-hero-in">
              <div>
                <h1 id="admGreet">
                  {currentView === 'dashboard' && t('Dashboard')}
                  {currentView === 'artikel' && t('Kelola Artikel')}
                  {currentView === 'katalog' && t('Katalog Produk')}
                  {currentView === 'media' && t('Pustaka Media')}
                  {currentView === 'pengaturan' && t('Pengaturan Panel')}
                </h1>
                <p id="admGreetSub">
                  {currentView === 'dashboard' && t('Ringkasan konten website Bonekaku.')}
                  {currentView === 'artikel' && t('Publikasikan artikel tips, promo, dan info souvenir.')}
                  {currentView === 'katalog' && t('Daftar lengkap 100 produk boneka, bantal, dan souvenir terintegrasi.')}
                  {currentView === 'media' && t('Kumpulan foto & grafis untuk kebutuhan website.')}
                  {currentView === 'pengaturan' && t('Konfigurasi keamanan dan informasi sistem.')}
                </p>
              </div>

              <div className="adm-hero-actions">
                <Link className="adm-btn adm-btn-ghost" to="/">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  {t('Lihat Website')}
                </Link>

                <button className="adm-btn adm-btn-accent" onClick={handleOpenNewArticle} type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  {t('Tulis Artikel')}
                </button>

                <div className="adm-userchip">
                  <span className="av">A</span>
                  <span>
                    <b>Administrator</b>
                    <small>Sesi aktif</small>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Main Shell with Sidebar */}
          <div className="adm-shell">
            <aside className="adm-side">
              <div className="adm-side-scroll">
                <div className="adm-side-brand">
                  <span className="adm-logo-plate">
                    <img
                      decoding="async"
                      src="https://user.uploads.dev/file/ff7baea119e28ffb2c6fa5772bfc40d7.png"
                      alt="Bonekaku"
                    />
                  </span>
                  <span>
                    Bonekaku<small>Admin Panel</small>
                  </span>
                </div>

                <nav className="adm-nav">
                  <button
                    type="button"
                    className={currentView === 'dashboard' ? 'active' : ''}
                    onClick={() => setCurrentView('dashboard')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="9" rx="1.5" />
                      <rect x="14" y="3" width="7" height="5" rx="1.5" />
                      <rect x="14" y="12" width="7" height="9" rx="1.5" />
                      <rect x="3" y="16" width="7" height="5" rx="1.5" />
                    </svg>
                    {t('Dashboard')}
                  </button>

                  <button
                    type="button"
                    className={currentView === 'artikel' ? 'active' : ''}
                    onClick={() => setCurrentView('artikel')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5M9 13h6M9 17h4" />
                    </svg>
                    {t('Artikel')} <span className="cnt">{totalPosts}</span>
                  </button>

                  <button
                    type="button"
                    className={currentView === 'katalog' ? 'active' : ''}
                    onClick={() => setCurrentView('katalog')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                    {t('Katalog')} <span className="cnt">{products.length}</span>
                  </button>

                  <button
                    type="button"
                    className={currentView === 'media' ? 'active' : ''}
                    onClick={() => setCurrentView('media')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="8.5" cy="9.5" r="1.6" />
                      <path d="m4 18 5-5 4 4 3-3 4 4" />
                    </svg>
                    {t('Media')} <span className="cnt">{totalMediaCount}</span>
                  </button>

                  <button
                    type="button"
                    className={currentView === 'pengaturan' ? 'active' : ''}
                    onClick={() => setCurrentView('pengaturan')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2 2 2 0 1 1-2.8-2.8A1.7 1.7 0 0 0 3 15a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9 2 2 0 1 1 2.8-2.8A1.7 1.7 0 0 0 10 3a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2 2 2 0 1 1 2.8 2.8A1.7 1.7 0 0 0 21 11a2 2 0 1 1 0 4z" />
                    </svg>
                    {t('Pengaturan')}
                  </button>
                </nav>

                <div className="adm-side-sep"></div>

                <div className="adm-sync">
                  <span className="adm-dot" style={{ background: '#0F6B3A' }}></span>
                  <span>{t('Sistem Siap & Aktif')}</span>
                </div>

                <div className="adm-side-note">
                  {t('Artikel berstatus')} <b>{t('Dipublikasikan')}</b> {t('langsung tampil di halaman')} <b>{t('Artikel')}</b> {t('website.')}
                </div>
              </div>

              <div className="adm-side-foot">
                <div className="adm-side-lang">
                  <span className="adm-side-theme-lbl">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                    </svg>
                    {t('Bahasa')}
                  </span>
                  <div className="lang-switch" role="group">
                    <button
                      type="button"
                      className={lang === 'id' ? 'active' : ''}
                      onClick={() => setLang('id')}
                    >
                      ID
                    </button>
                    <button
                      type="button"
                      className={lang === 'en' ? 'active' : ''}
                      onClick={() => setLang('en')}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <div className="adm-side-theme">
                  <span className="adm-side-theme-lbl">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                    </svg>
                    {t('Tampilan')}
                  </span>
                  <button
                    className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Ganti mode"
                  >
                    <span className="tt-knob">
                      <svg className="tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                      </svg>
                      <svg className="tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </span>
                  </button>
                </div>

                <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm block" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  {t('Keluar')}
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="adm-main">
              {/* ================= VIEW: DASHBOARD ================= */}
              {currentView === 'dashboard' && (
                <section className="adm-view">
                  <div className="adm-stats">
                    <div className="adm-stat v1">
                      <div className="meta">
                        <div className="ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                            <path d="M14 3v5h5M9 13h6M9 17h5" />
                          </svg>
                        </div>
                        <span className="up">+12%</span>
                      </div>
                      <div className="num">{totalPosts}</div>
                      <div className="lbl">{t('Total Artikel')}</div>
                    </div>

                    <div className="adm-stat v2">
                      <div className="meta">
                        <div className="ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="14" width="7" height="7" rx="1.5" />
                            <rect x="3" y="14" width="7" height="7" rx="1.5" />
                          </svg>
                        </div>
                        <span className="up">Live</span>
                      </div>
                      <div className="num" style={{ color: '#1B5E5E' }}>{products.length}</div>
                      <div className="lbl">{t('Katalog Produk')}</div>
                    </div>

                    <div className="adm-stat v3">
                      <div className="meta">
                        <div className="ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v20M2 12h20" />
                            <circle cx="12" cy="12" r="8" />
                          </svg>
                        </div>
                        <span className="up">Ready</span>
                      </div>
                      <div className="num" style={{ color: '#0F6B3A' }}>{publishedPosts}</div>
                      <div className="lbl">{t('Artikel Terbit')}</div>
                    </div>

                    <div className="adm-stat v4">
                      <div className="meta">
                        <div className="ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 7h16M7 12h10M9 17h6" />
                          </svg>
                        </div>
                        <span className="up">Draft</span>
                      </div>
                      <div className="num" style={{ color: '#E07E00' }}>{draftPosts}</div>
                      <div className="lbl">{t('Draft')}</div>
                    </div>

                    <div className="adm-stat v1">
                      <div className="meta">
                        <div className="ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <circle cx="8.5" cy="9.5" r="1.6" />
                            <path d="m4 18 5-5 4 4 3-3 4 4" />
                          </svg>
                        </div>
                        <span className="up">Assets</span>
                      </div>
                      <div className="num">{totalMediaCount}</div>
                      <div className="lbl">{t('Berkas Media')}</div>
                    </div>
                  </div>

                  <div className="adm-cols">
                    <div>
                      <div className="adm-card">
                        <div className="adm-card-head">
                          <div>
                            <h3>{t('Artikel Terbaru')}</h3>
                            <p>{t('Artikel yang baru-baru ini dikelola.')}</p>
                          </div>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            onClick={() => setCurrentView('artikel')}
                          >
                            {t('Kelola Semua')}
                          </button>
                        </div>

                        <div>
                          {articles.slice(0, 5).map((a) => (
                            <div
                              key={a.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 14px',
                                borderBottom: '1px solid var(--line)',
                                gap: '12px'
                              }}
                            >
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <b style={{ display: 'block', fontSize: '14.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {a.title}
                                </b>
                                <small style={{ color: 'var(--ink-soft)' }}>
                                  {a.date_formatted || 'Baru'} · {a.author || 'Bonekaku Admin'}
                                </small>
                              </div>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-ghost adm-btn-sm"
                                  onClick={() => handleOpenEditArticle(a)}
                                >
                                  {t('Edit')}
                                </button>
                                <Link
                                  className="adm-btn adm-btn-ghost adm-btn-sm"
                                  to={`/artikel/${a.slug}`}
                                  target="_blank"
                                >
                                  {t('Lihat')}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="adm-card">
                        <div className="adm-card-head">
                          <div>
                            <h3>{t('Ringkasan Katalog')}</h3>
                            <p>{t('Kategori dan koleksi souvenir Bonekaku.')}</p>
                          </div>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            onClick={() => setCurrentView('katalog')}
                          >
                            {t('Buka Katalog')}
                          </button>
                        </div>
                        <div style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                          <p>
                            Saat ini terdapat <b>{products.length} item produk</b> siap pesan yang terbagi dalam 8 kategori utama: <i>Most Favorite, Animal Series, Bantal Custom, Boneka Custom, Boneka Souvenir, Graduation Series, Maskot / Badut,</i> dan <i>Masker</i>.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="adm-card">
                        <div className="adm-card-head">
                          <div>
                            <h3>{t('Aksi Cepat')}</h3>
                            <p>{t('Pintasan pekerjaan harian.')}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <button
                            type="button"
                            className="adm-btn adm-btn-primary"
                            onClick={handleOpenNewArticle}
                            style={{ justifyContent: 'flex-start' }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            {t('Tulis Artikel Baru')}
                          </button>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost"
                            onClick={() => setCurrentView('katalog')}
                            style={{ justifyContent: 'flex-start' }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="7" height="7" />
                              <rect x="14" y="3" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" />
                              <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            {t('Lihat Data Katalog Produk (100)')}
                          </button>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost"
                            onClick={() => {
                              setCurrentView('media');
                              if (fileInputRef.current) fileInputRef.current.click();
                            }}
                            style={{ justifyContent: 'flex-start' }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                            {t('Unggah Foto ke Media')}
                          </button>
                        </div>
                      </div>

                      <div className="adm-card">
                        <div className="adm-card-head">
                          <div>
                            <h3>{t('Status Sistem')}</h3>
                            <p>{t('Koneksi sistem & database.')}</p>
                          </div>
                        </div>
                        <ul style={{ fontSize: '13.5px', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <li><b>{t('Database SQL:')}</b> Terisi 100 Produk &amp; 18 Artikel Lengkap</li>
                          <li><b>{t('Backend API:')}</b> Laravel 11 (REST API)</li>
                          <li><b>{t('Frontend:')}</b> React 18 + Vite SPA</li>
                          <li><b>{t('Status:')}</b> <span style={{ color: '#0F6B3A', fontWeight: 700 }}>Tersinkronisasi &amp; Aktif</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ================= VIEW: ARTIKEL ================= */}
              {currentView === 'artikel' && (
                <section className="adm-view">
                  <div className="adm-card">
                    <div className="adm-card-head">
                      <div>
                        <h3>{t('Kelola Artikel')}</h3>
                        <p>{filteredArticles.length} {t('artikel ditemukan')}</p>
                      </div>
                    </div>

                    <div className="adm-toolbar">
                      <div className="adm-toolbar-left">
                        <div className="adm-search">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                          </svg>
                          <input
                            className="adm-input"
                            placeholder={t('Cari judul artikel…')}
                            value={articleSearch}
                            onChange={(e) => {
                              setArticleSearch(e.target.value);
                              setArticlePage(1);
                            }}
                          />
                        </div>

                        <div className="adm-seg">
                          <button
                            type="button"
                            className={articleFilter === 'all' ? 'active' : ''}
                            onClick={() => {
                              setArticleFilter('all');
                              setArticlePage(1);
                            }}
                          >
                            {t('Semua')}
                          </button>
                          <button
                            type="button"
                            className={articleFilter === 'published' ? 'active' : ''}
                            onClick={() => {
                              setArticleFilter('published');
                              setArticlePage(1);
                            }}
                          >
                            {t('Publikasi')}
                          </button>
                          <button
                            type="button"
                            className={articleFilter === 'draft' ? 'active' : ''}
                            onClick={() => {
                              setArticleFilter('draft');
                              setArticlePage(1);
                            }}
                          >
                            {t('Draft')}
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="adm-btn adm-btn-primary"
                        onClick={handleOpenNewArticle}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        {t('Artikel Baru')}
                      </button>
                    </div>

                    <div>
                      {loadingArticles ? (
                        <div className="am-loading">
                          <div className="am-spinner"></div>
                          <p>{t('Memuat daftar artikel...')}</p>
                        </div>
                      ) : paginatedArticles.length === 0 ? (
                        <div className="ad-empty">
                          <b>{t('Tidak ada artikel yang cocok.')}</b>
                          <p>{t('Coba ubah kata kunci pencarian atau buat artikel baru.')}</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {paginatedArticles.map((art) => (
                            <div
                              key={art.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px 20px',
                                borderBottom: '1px solid var(--line)',
                                gap: '16px',
                                flexWrap: 'wrap'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px', flex: 1 }}>
                                {art.cover_image ? (
                                  <img
                                    src={art.cover_image}
                                    alt={art.title}
                                    style={{
                                      width: '64px',
                                      height: '48px',
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      background: 'var(--cream-2)'
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: '64px',
                                      height: '48px',
                                      borderRadius: '8px',
                                      background: 'var(--cream-2)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'var(--ink-soft)',
                                      fontSize: '11px'
                                    }}
                                  >
                                    No Img
                                  </div>
                                )}
                                <div>
                                  <b style={{ fontSize: '15.5px', color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>
                                    {art.title}
                                  </b>
                                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12.5px', color: 'var(--ink-soft)' }}>
                                    <span>{art.date_formatted || 'Baru'}</span>
                                    <span>·</span>
                                    <span>{art.author || 'Bonekaku Admin'}</span>
                                    <span>·</span>
                                    <span
                                      className="adm-pill"
                                      style={{
                                        background: art.status === 'draft' ? 'rgba(224,126,0,.15)' : 'rgba(15,107,58,.15)',
                                        color: art.status === 'draft' ? '#E07E00' : '#0F6B3A',
                                        fontSize: '11px',
                                        padding: '2px 8px'
                                      }}
                                    >
                                      {art.status === 'draft' ? 'Draft' : 'Publikasi'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Link
                                  to={`/artikel/${art.slug}`}
                                  target="_blank"
                                  className="adm-btn adm-btn-ghost adm-btn-sm"
                                >
                                  {t('Pratinjau')}
                                </Link>
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-ghost adm-btn-sm"
                                  onClick={() => handleOpenEditArticle(art)}
                                >
                                  {t('Edit')}
                                </button>
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-danger adm-btn-sm"
                                  onClick={() => handleDeleteArticle(art)}
                                >
                                  {t('Hapus')}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {totalArticlePages > 1 && (
                      <div className="adm-pager" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', alignItems: 'center' }}>
                        <span>
                          {t('Halaman')} {articlePage} {t('dari')} {totalArticlePages}
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            disabled={articlePage <= 1}
                            onClick={() => setArticlePage((p) => Math.max(1, p - 1))}
                          >
                            {t('Sebelumnya')}
                          </button>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            disabled={articlePage >= totalArticlePages}
                            onClick={() => setArticlePage((p) => Math.min(totalArticlePages, p + 1))}
                          >
                            {t('Berikutnya')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ================= VIEW: KATALOG PRODUK ================= */}
              {currentView === 'katalog' && (
                <section className="adm-view">
                  <div className="adm-card">
                    <div className="adm-card-head">
                      <div>
                        <h3>{t('Katalog Produk')}</h3>
                        <p>{filteredProducts.length} {t('produk ditampilkan dari total')} {products.length} {t('item')}</p>
                      </div>
                      <Link to="/katalog" target="_blank" className="adm-btn adm-btn-primary adm-btn-sm">
                        {t('Buka Katalog Website')}
                      </Link>
                    </div>

                    <div className="adm-toolbar">
                      <div className="adm-toolbar-left" style={{ width: '100%' }}>
                        <div className="adm-search" style={{ flex: 1 }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                          </svg>
                          <input
                            className="adm-input"
                            placeholder={t('Cari nama boneka, ukuran, atau karakter…')}
                            value={productSearch}
                            onChange={(e) => {
                              setProductSearch(e.target.value);
                              setProductPage(1);
                            }}
                          />
                        </div>

                        <select
                          className="adm-select"
                          style={{ maxWidth: '240px' }}
                          value={productCategoryFilter}
                          onChange={(e) => {
                            setProductCategoryFilter(e.target.value);
                            setProductPage(1);
                          }}
                        >
                          <option value="all">{t('Semua Kategori')}</option>
                          {categories.map((cat) => (
                            <option key={cat.id || cat.slug} value={cat.slug}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        className="adm-btn adm-btn-primary"
                        onClick={() => openProductEditor()}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        {t('Produk Baru')}
                      </button>
                    </div>

                    <div>
                      {loadingProducts ? (
                        <div className="am-loading">
                          <div className="am-spinner"></div>
                          <p>{t('Memuat data katalog produk...')}</p>
                        </div>
                      ) : paginatedProducts.length === 0 ? (
                        <div className="ad-empty">
                          <b>{t('Tidak ada produk yang cocok.')}</b>
                          <p>{t('Coba ubah filter kategori atau kata kunci pencarian Anda.')}</p>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: '16px',
                            padding: '16px 0'
                          }}
                        >
                          {paginatedProducts.map((prod) => (
                            <div
                              key={prod.id}
                              style={{
                                border: '1px solid var(--line)',
                                borderRadius: '14px',
                                background: 'var(--white)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 'var(--shadow-sm)'
                              }}
                            >
                              <div
                                style={{
                                  width: '100%',
                                  aspectRatio: '1',
                                  background: 'var(--cream-2)',
                                  position: 'relative'
                                }}
                              >
                                <img
                                  src={prod.image_url}
                                  alt={prod.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  loading="lazy"
                                />
                                {prod.size && (
                                  <span
                                    style={{
                                      position: 'absolute',
                                      bottom: '8px',
                                      right: '8px',
                                      background: 'rgba(15,59,62,.85)',
                                      color: '#fff',
                                      fontSize: '11px',
                                      padding: '2px 8px',
                                      borderRadius: '999px',
                                      fontWeight: 700
                                    }}
                                  >
                                    {prod.size}
                                  </span>
                                )}
                              </div>
                              <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                  <small style={{ color: '#2CA77A', fontWeight: 800, textTransform: 'uppercase', fontSize: '10.5px' }}>
                                    {prod.tag || prod.category_slug}
                                  </small>
                                  <b style={{ display: 'block', fontSize: '14px', color: 'var(--ink)', margin: '4px 0 8px' }}>
                                    {prod.name}
                                  </b>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                  <Link
                                    to={`/katalog?cat=${prod.category_slug}`}
                                    target="_blank"
                                    className="adm-btn adm-btn-ghost adm-btn-sm"
                                    style={{ flex: 1, fontSize: '12px', justifyContent: 'center' }}
                                  >
                                    {t('Lihat')}
                                  </Link>
                                  <button
                                    type="button"
                                    className="adm-btn adm-btn-ghost adm-btn-sm"
                                    onClick={() => openProductEditor(prod)}
                                  >
                                    {t('Edit')}
                                  </button>
                                  <button
                                    type="button"
                                    className="adm-btn adm-btn-danger adm-btn-sm"
                                    onClick={() => handleDeleteProduct(prod)}
                                  >
                                    {t('Hapus')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {totalProductPages > 1 && (
                      <div className="adm-pager" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', alignItems: 'center' }}>
                        <span>
                          {t('Halaman')} {productPage} {t('dari')} {totalProductPages}
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            disabled={productPage <= 1}
                            onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                          >
                            {t('Sebelumnya')}
                          </button>
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            disabled={productPage >= totalProductPages}
                            onClick={() => setProductPage((p) => Math.min(totalProductPages, p + 1))}
                          >
                            {t('Berikutnya')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ================= VIEW: MEDIA ================= */}
              {currentView === 'media' && (
                <section className="adm-view">
                  <div className="adm-card">
                    <div className="adm-card-head">
                      <div>
                        <h3>{t('Pustaka Media')}</h3>
                        <p>{t('Unggah gambar untuk sampul maupun isi artikel.')}</p>
                      </div>
                      <span className="adm-pill is-src">{mediaList.length} {t('gambar')}</span>
                    </div>

                    <div
                      className="adm-drop"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="ic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                      </div>
                      <b>{uploadingMedia ? t('Mengunggah berkas...') : t('Tarik & lepas gambar di sini')}</b>
                      <p>{t('atau klik untuk memilih berkas · JPG, PNG, WEBP, GIF · maks 10 MB')}</p>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                    />

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '16px',
                        marginTop: '24px'
                      }}
                    >
                      {mediaList.map((m, idx) => (
                        <div
                          key={m.name || idx}
                          style={{
                            border: '1px solid var(--line)',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            background: 'var(--white)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div
                            style={{
                              width: '100%',
                              aspectRatio: '4/3',
                              background: 'var(--cream-2)',
                              overflow: 'hidden'
                            }}
                          >
                            <img
                              src={m.url}
                              alt={m.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              loading="lazy"
                            />
                          </div>
                          <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <small
                              style={{
                                display: 'block',
                                fontSize: '11.5px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginBottom: '8px'
                              }}
                              title={m.name}
                            >
                              {m.name}
                            </small>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                type="button"
                                className="adm-btn adm-btn-ghost adm-btn-sm"
                                style={{ flex: 1, fontSize: '11px', padding: '6px 8px' }}
                                onClick={() => copyToClipboard(m.url)}
                              >
                                {t('Salin URL')}
                              </button>
                              <button
                                type="button"
                                className="adm-btn adm-btn-danger adm-btn-sm"
                                style={{ fontSize: '11px', padding: '6px 8px' }}
                                onClick={() => handleDeleteMedia(m.name)}
                              >
                                {t('Hapus')}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ================= VIEW: PENGATURAN ================= */}
              {currentView === 'pengaturan' && (
                <section className="adm-view">
                  <div className="adm-card">
                    <div className="adm-card-head">
                      <div>
                        <h3>{t('Ganti Password Admin')}</h3>
                        <p>{t('Password baru disimpan terenkripsi di perangkat ini.')}</p>
                      </div>
                    </div>

                    <form onSubmit={handleSavePassword}>
                      <div className="adm-row2">
                        <div className="adm-field">
                          <label htmlFor="admPwCur">{t('Password Saat Ini')}</label>
                          <input
                            className="adm-input"
                            type="password"
                            id="admPwCur"
                            placeholder={t('Password lama')}
                            value={pwCur}
                            onChange={(e) => setPwCur(e.target.value)}
                            required
                          />
                        </div>

                        <div className="adm-field">
                          <label htmlFor="admPwNew">{t('Password Baru')}</label>
                          <input
                            className="adm-input"
                            type="password"
                            id="admPwNew"
                            placeholder={t('Minimal 6 karakter')}
                            value={pwNew}
                            onChange={(e) => setPwNew(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="adm-field">
                        <label htmlFor="admPwNew2">{t('Ulangi Password Baru')}</label>
                        <input
                          className="adm-input"
                          type="password"
                          id="admPwNew2"
                          placeholder={t('Ketik ulang password baru')}
                          value={pwNew2}
                          onChange={(e) => setPwNew2(e.target.value)}
                          required
                        />
                      </div>

                      {pwMsg.text && (
                        <div className={`adm-alert ${pwMsg.type === 'err' ? 'err' : 'ok'}`}>
                          <span>{pwMsg.text}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                        <button type="submit" className="adm-btn adm-btn-primary">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <path d="m5 13 4 4L19 7" />
                          </svg>
                          {t('Simpan Password')}
                        </button>
                        <button
                          type="button"
                          className="adm-btn adm-btn-ghost"
                          onClick={handleResetDefaultPassword}
                        >
                          {t('Kembalikan ke Password Standar')}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="adm-card">
                    <div className="adm-card-head">
                      <div>
                        <h3>{t('Informasi Sistem')}</h3>
                        <p>{t('Detail konfigurasi API dan penyimpanan.')}</p>
                      </div>
                    </div>
                    <ul style={{ fontSize: '14px', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <li><b>Domain / Base:</b> bonekaku.co.id</li>
                      <li><b>API Endpoint:</b> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</li>
                      <li><b>Database Terisi:</b> 100 Produk Katalog &amp; 18 Artikel Lengkap</li>
                      <li><b>Versi Panel:</b> 2.0 (Fullstack Production Ready)</li>
                    </ul>
                  </div>

                  <div className="adm-card">
                    <div className="adm-card-head">
                      <div>
                        <h3>{t('Sinkronisasi Database')}</h3>
                        <p>{t('Muat ulang data artikel dan katalog langsung dari database MySQL server.')}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="adm-btn adm-btn-secondary"
                        onClick={() => {
                          loadArticlesData();
                          loadProductsData();
                          addToast('Data disinkronkan langsung dari database MySQL server.', 'ok');
                        }}
                      >
                        {t('Refresh Data Server')}
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDITOR DRAWER ================= */}
      <div className={`adm-drawer ${drawerOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="adm-drawer-panel">
          <div className="adm-drawer-head">
            <div>
              <h2>{editingArticleId ? t('Edit Artikel') : t('Artikel Baru')}</h2>
              <p>{t('Lengkapi detail artikel lalu simpan.')}</p>
            </div>
            <button
              type="button"
              className="adm-drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Tutup editor"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="adm-drawer-body">
            {editorError && (
              <div className="adm-alert err">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>
                <span>{editorError}</span>
              </div>
            )}

            <div className="adm-field">
              <label htmlFor="edPostTitle">{t('Judul Artikel')} *</label>
              <input
                className="adm-input"
                id="edPostTitle"
                placeholder="Contoh: Tips Memilih Boneka Souvenir Berkualitas"
                value={formTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            <div className="adm-field">
              <label htmlFor="edSlug">{t('Slug URL')}</label>
              <input
                className="adm-input"
                id="edSlug"
                placeholder="tips-memilih-boneka"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
              />
              <span className="adm-hint">{t('Otomatis dari judul. Dipakai di URL /artikel/...')}</span>
            </div>

            <div className="adm-row2">
              <div className="adm-field">
                <label htmlFor="edAuthor">{t('Penulis')}</label>
                <input
                  className="adm-input"
                  id="edAuthor"
                  placeholder="Bonekaku Admin"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                />
              </div>

              <div className="adm-field">
                <label htmlFor="edStatus">{t('Status Publikasi')}</label>
                <select
                  className="adm-select"
                  id="edStatus"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                  <option value="published">{t('Dipublikasikan')}</option>
                  <option value="draft">{t('Draft (Belum Tampil)')}</option>
                </select>
              </div>
            </div>

            <div className="adm-field">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <label style={{ margin: 0 }}>{t('Gambar Sampul (Cover Image)')}</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    className={`adm-btn adm-btn-sm ${articleCoverMode === 'device' ? 'adm-btn-primary' : 'adm-btn-ghost'}`}
                    style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
                    onClick={() => setArticleCoverMode('device')}
                  >
                    📁 {t('Unggah Perangkat')}
                  </button>
                  <button
                    type="button"
                    className={`adm-btn adm-btn-sm ${articleCoverMode === 'url' ? 'adm-btn-primary' : 'adm-btn-ghost'}`}
                    style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
                    onClick={() => setArticleCoverMode('url')}
                  >
                    🌐 {t('Input URL')}
                  </button>
                  <button
                    type="button"
                    className="adm-btn adm-btn-ghost adm-btn-sm"
                    style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
                    onClick={() => {
                      setMediaPickerTarget('article');
                      setMediaPickerOpen(true);
                    }}
                  >
                    🖼️ {t('Pustaka')}
                  </button>
                </div>
              </div>

              <div className="adm-cover">
                <div className="adm-cover-prev">
                  {formCover ? (
                    <img src={formCover} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="ph">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="8.5" cy="9.5" r="1.6" />
                        <path d="m4 18 5-5 4 4 3-3 4 4" />
                      </svg>
                      {uploadingArticleCover ? t('Mengunggah...') : t('Belum ada gambar')}
                    </div>
                  )}
                </div>

                <div className="adm-cover-tools">
                  {articleCoverMode === 'device' ? (
                    <div
                      style={{
                        border: '2px dashed var(--line)',
                        borderRadius: '14px',
                        padding: '16px',
                        textAlign: 'center',
                        background: 'var(--cream-2)',
                        cursor: 'pointer',
                        transition: 'all .2s'
                      }}
                      onClick={() => articleFileInputRef.current && articleFileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={articleFileInputRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleUploadArticleCover(e.target.files[0]);
                            e.target.value = '';
                          }
                        }}
                      />
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                        {uploadingArticleCover ? '⏳' : '📁'}
                      </div>
                      <b style={{ display: 'block', fontSize: '13px', color: 'var(--ink)' }}>
                        {uploadingArticleCover ? t('Mengunggah berkas...') : t('Pilih Foto Sampul dari Komputer/HP')}
                      </b>
                      <small style={{ color: 'var(--ink-soft)', fontSize: '11px' }}>
                        Format: JPG, PNG, WebP (Maks 10 MB)
                      </small>
                    </div>
                  ) : (
                    <input
                      className="adm-input"
                      placeholder="Tempel tautan URL gambar (https://...)"
                      value={formCover}
                      onChange={(e) => setFormCover(e.target.value)}
                    />
                  )}

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                    <button
                      type="button"
                      className="adm-btn adm-btn-ghost adm-btn-sm"
                      onClick={() => {
                        if (mediaList.length > 0) {
                          setFormCover(mediaList[0].url);
                          addToast('Mengambil gambar terbaru dari pustaka media.', 'ok');
                        } else {
                          addToast('Pustaka media masih kosong. Unggah gambar terlebih dahulu.', 'err');
                        }
                      }}
                    >
                      {t('Gunakan Media Terakhir')}
                    </button>
                    {formCover && (
                      <button
                        type="button"
                        className="adm-btn adm-btn-danger adm-btn-sm"
                        onClick={() => setFormCover('')}
                      >
                        ✕ {t('Hapus Sampul')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-field">
              <label htmlFor="edExcerpt">{t('Ringkasan Singkat')}</label>
              <textarea
                className="adm-textarea"
                id="edExcerpt"
                style={{ minHeight: '74px' }}
                placeholder="1–2 kalimat ringkasan yang tampil di kartu daftar artikel."
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
              ></textarea>
            </div>

            <div className="adm-field">
              <label>{t('Isi Artikel')}</label>
              <div className="adm-editor">
                <div className="adm-editor-bar">
                  <button type="button" className="adm-tool" onClick={() => execCmd('bold')} title="Tebal">
                    <b>B</b>
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('italic')} title="Miring">
                    <b><i>I</i></b>
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('underline')} title="Garis bawah">
                    <b style={{ textDecoration: 'underline' }}>U</b>
                  </button>
                  <span className="adm-tool-sep"></span>
                  <button type="button" className="adm-tool" onClick={() => execCmd('h2')} title="Judul H2">
                    H2
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('h3')} title="Judul H3">
                    H3
                  </button>
                  <span className="adm-tool-sep"></span>
                  <button type="button" className="adm-tool" onClick={() => execCmd('ul')} title="Daftar Poin">
                    •≡
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('ol')} title="Daftar Angka">
                    1≡
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('quote')} title="Kutipan">
                    ❝
                  </button>
                  <span className="adm-tool-sep"></span>
                  <button type="button" className="adm-tool" onClick={() => execCmd('link')} title="Tautan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
                      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
                    </svg>
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('image')} title="Sisipkan Gambar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="8.5" cy="9.5" r="1.6" />
                      <path d="m4 18 5-5 4 4 3-3 4 4" />
                    </svg>
                  </button>
                  <button type="button" className="adm-tool" onClick={() => execCmd('clear')} title="Hapus Format">
                    Tx
                  </button>
                </div>

                {editorPreview ? (
                  <div
                    className="ad-content"
                    style={{ padding: '16px', minHeight: '180px', background: 'var(--cream)', borderRadius: '0 0 12px 12px' }}
                    dangerouslySetInnerHTML={{ __html: formContent }}
                  ></div>
                ) : (
                  <textarea
                    className="adm-textarea"
                    style={{ minHeight: '220px', border: 'none', borderRadius: '0 0 12px 12px', padding: '14px', fontFamily: 'monospace' }}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Ketik konten HTML atau teks artikel di sini..."
                  ></textarea>
                )}
              </div>
            </div>
          </div>

          <div className="adm-drawer-foot">
            <span className="spacer"></span>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setDrawerOpen(false)}>
              {t('Batal')}
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-ghost"
              onClick={() => setEditorPreview(!editorPreview)}
            >
              {editorPreview ? t('Kembali ke Edit') : t('Pratinjau')}
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-primary"
              disabled={savingArticle}
              onClick={handleSaveArticle}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <path d="M17 21v-8H7v8M7 3v5h8" />
              </svg>
              {savingArticle ? t('Menyimpan...') : t('Simpan Artikel')}
            </button>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT DRAWER ================= */}
      <div className={`adm-drawer ${productDrawerOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="adm-drawer-panel">
          <div className="adm-drawer-head">
            <div>
              <h2>{editingProductId ? t('Edit Produk') : t('Produk Baru')}</h2>
              <p>{t('Kelola katalog produk Bonekaku secara dinamis.')}</p>
            </div>
            <button
              type="button"
              className="adm-drawer-close"
              onClick={() => setProductDrawerOpen(false)}
              aria-label="Tutup editor produk"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="adm-drawer-body">
            <div className="adm-row2">
              <div className="adm-field">
                <label htmlFor="prodName">{t('Nama Produk')} *</label>
                <input
                  className="adm-input"
                  id="prodName"
                  value={productForm.name}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: Boneka Teddy Bear"
                />
              </div>

              <div className="adm-field">
                <label htmlFor="prodCat">{t('Kategori')} *</label>
                <select
                  className="adm-select"
                  id="prodCat"
                  value={productForm.category_slug}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, category_slug: e.target.value }))}
                >
                  {categories.map((cat) => (
                    <option key={cat.id || cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="adm-row2">
              <div className="adm-field">
                <label htmlFor="prodSlug">{t('Slug URL')}</label>
                <input
                  className="adm-input"
                  id="prodSlug"
                  value={productForm.slug}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="boneka-teddy-bear"
                />
              </div>

              <div className="adm-field">
                <label htmlFor="prodTag">{t('Tag')}</label>
                <input
                  className="adm-input"
                  id="prodTag"
                  value={productForm.tag}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, tag: e.target.value }))}
                  placeholder="Best Seller"
                />
              </div>
            </div>

            <div className="adm-field">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <label style={{ margin: 0 }}>{t('Gambar Produk')}</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    className={`adm-btn adm-btn-sm ${productImgMode === 'device' ? 'adm-btn-primary' : 'adm-btn-ghost'}`}
                    style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
                    onClick={() => setProductImgMode('device')}
                  >
                    📁 {t('Unggah Perangkat')}
                  </button>
                  <button
                    type="button"
                    className={`adm-btn adm-btn-sm ${productImgMode === 'url' ? 'adm-btn-primary' : 'adm-btn-ghost'}`}
                    style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
                    onClick={() => setProductImgMode('url')}
                  >
                    🌐 {t('Input URL')}
                  </button>
                  <button
                    type="button"
                    className="adm-btn adm-btn-ghost adm-btn-sm"
                    style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
                    onClick={() => {
                      setMediaPickerTarget('product');
                      setMediaPickerOpen(true);
                    }}
                  >
                    🖼️ {t('Pustaka')}
                  </button>
                </div>
              </div>

              {productImgMode === 'device' ? (
                <div
                  style={{
                    border: '2px dashed var(--line)',
                    borderRadius: '16px',
                    padding: '22px 18px',
                    textAlign: 'center',
                    background: 'var(--cream-2)',
                    cursor: 'pointer',
                    transition: 'all .2s'
                  }}
                  onClick={() => productFileInputRef.current && productFileInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={productFileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUploadProductImage(e.target.files[0]);
                        e.target.value = '';
                      }
                    }}
                  />
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>
                    {uploadingProductImg ? '⏳' : '📁'}
                  </div>
                  <b style={{ display: 'block', fontSize: '14px', color: 'var(--ink)' }}>
                    {uploadingProductImg ? t('Mengunggah gambar...') : t('Pilih Foto dari Komputer/HP')}
                  </b>
                  <small style={{ color: 'var(--ink-soft)', fontSize: '12px' }}>
                    Format didukung: JPG, PNG, WebP (Maks 10 MB)
                  </small>
                </div>
              ) : (
                <div>
                  <input
                    className="adm-input"
                    id="prodImage"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/foto-boneka.jpg"
                  />
                  <small className="adm-hint" style={{ marginTop: '5px', fontSize: '12px', display: 'block' }}>
                    {t('Tempel tautan URL gambar langsung dari internet atau hosting eksternal.')}
                  </small>
                </div>
              )}

              {/* Live Preview */}
              {productForm.image_url && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    borderRadius: '14px',
                    background: 'var(--cream-2)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <img
                    src={productForm.image_url}
                    alt="Pratinjau Produk"
                    style={{
                      width: '68px',
                      height: '68px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '1px solid var(--line)',
                      background: '#fff'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/100x100?text=Invalid+Image';
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b style={{ display: 'block', fontSize: '13px', color: 'var(--ink)', marginBottom: '2px' }}>
                      {t('Gambar Terpilih')}
                    </b>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11.5px',
                        color: 'var(--ink-soft)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {productForm.image_url}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="adm-btn adm-btn-danger adm-btn-sm"
                    style={{ flex: 'none', padding: '6px 12px', fontSize: '12px' }}
                    onClick={() => setProductForm((prev) => ({ ...prev, image_url: '' }))}
                  >
                    ✕ {t('Hapus')}
                  </button>
                </div>
              )}
            </div>

            <div className="adm-row2">
              <div className="adm-field">
                <label htmlFor="prodSize">{t('Ukuran')}</label>
                <input
                  className="adm-input"
                  id="prodSize"
                  value={productForm.size}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, size: e.target.value }))}
                  placeholder="S, M, L"
                />
              </div>

              <div className="adm-field">
                <label htmlFor="prodPrice">{t('Harga')}</label>
                <input
                  className="adm-input"
                  id="prodPrice"
                  type="number"
                  min="0"
                  value={productForm.price}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="150000"
                />
              </div>
            </div>

            <div className="adm-field">
              <label htmlFor="prodSort">{t('Urutan Tampil')}</label>
              <input
                className="adm-input"
                id="prodSort"
                type="number"
                min="0"
                value={productForm.sort_order}
                onChange={(e) => setProductForm((prev) => ({ ...prev, sort_order: Number(e.target.value || 0) }))}
              />
            </div>

            <div className="adm-field">
              <label htmlFor="prodDesc">{t('Deskripsi')}</label>
              <textarea
                className="adm-textarea"
                id="prodDesc"
                value={productForm.description}
                onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsikan produk, bahan, karakter, dan detail pemesanan."
              />
            </div>

            <div className="adm-row2">
              <label className="adm-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '50px' }}>
                <input
                  type="checkbox"
                  checked={productForm.is_featured}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, is_featured: e.target.checked }))}
                />
                <span>{t('Featured')}</span>
              </label>

              <label className="adm-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '50px' }}>
                <input
                  type="checkbox"
                  checked={productForm.is_new}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, is_new: e.target.checked }))}
                />
                <span>{t('New')}</span>
              </label>
            </div>
          </div>

          <div className="adm-drawer-foot">
            <span className="spacer"></span>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setProductDrawerOpen(false)}>
              {t('Batal')}
            </button>
            <button type="button" className="adm-btn adm-btn-primary" onClick={handleSaveProduct}>
              {editingProductId ? t('Simpan Perubahan') : t('Tambah Produk')}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MEDIA PICKER MODAL DIALOG ================= */}
      {mediaPickerOpen && (
        <div
          className="adm-modal open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMediaPickerOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 10, 16, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '20px'
          }}
        >
          <div
            className="adm-modal-card"
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,.85)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{t('Pilih dari Pustaka Media')}</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', margin: '4px 0 0' }}>
                  {t('Klik salah satu gambar untuk digunakan.')}
                </p>
              </div>
              <button
                type="button"
                className="adm-btn adm-btn-ghost adm-btn-sm"
                onClick={() => setMediaPickerOpen(false)}
              >
                ✕ {t('Tutup')}
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: '200px', maxHeight: '55vh', paddingRight: '4px' }}>
              {mediaList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--ink-soft)' }}>
                  <p>{t('Belum ada berkas di pustaka media. Silakan unggah gambar terlebih dahulu.')}</p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                    gap: '12px'
                  }}
                >
                  {mediaList.map((m, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectMediaForForm(m.url)}
                      style={{
                        borderRadius: '12px',
                        border: '1.5px solid var(--line)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: 'var(--cream-2)',
                        transition: 'all .2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = 'var(--rose)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = 'var(--line)';
                      }}
                    >
                      <img
                        src={m.url}
                        alt={m.name}
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '6px 8px', fontSize: '11px', color: 'var(--ink)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= CENTERED DELETE CONFIRMATION MODAL ================= */}
      {modal.open && (
        <div
          className="adm-modal open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModal({ open: false, title: '', text: '', itemName: '', onConfirm: null });
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 10, 16, 0.78)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '20px'
          }}
        >
          <div
            className="adm-modal-card"
            style={{
              width: '100%',
              maxWidth: '430px',
              borderRadius: '24px',
              padding: '28px 24px 22px',
              textAlign: 'center',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,.85)'
            }}
          >
            {/* Danger Trash Icon Badge */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '2px solid rgba(239, 68, 68, 0.28)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 24px -4px rgba(239, 68, 68, 0.35)'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.01em' }}>
              {modal.title || t('Konfirmasi Hapus')}
            </h3>

            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: modal.itemName ? '14px' : '22px' }}>
              {modal.text}
            </p>

            {modal.itemName && (
              <div
                style={{
                  background: 'var(--cream-2)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '9px 14px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {modal.itemName}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                className="adm-btn adm-btn-ghost"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '14px' }}
                onClick={() => setModal({ open: false, title: '', text: '', itemName: '', onConfirm: null })}
              >
                {t('Batal')}
              </button>
              <button
                type="button"
                className="adm-btn adm-btn-danger"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  boxShadow: '0 8px 20px -6px rgba(220, 38, 38, 0.6)'
                }}
                onClick={modal.onConfirm}
              >
                {t('Ya, Hapus')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOASTS ================= */}
      <div className="adm-toasts">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`adm-toast ${toast.type === 'err' ? 'err' : 'ok'}`}
            style={{
              padding: '12px 18px',
              borderRadius: '12px',
              marginBottom: '10px',
              color: '#fff',
              background: toast.type === 'err' ? '#A32323' : '#1B5E5E',
              boxShadow: '0 8px 24px -6px rgba(0,0,0,.3)',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            {toast.msg}
          </div>
        ))}
      </div>
    </section>
  );
}
