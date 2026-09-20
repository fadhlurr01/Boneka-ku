import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://api-bonekaku-v3.kembangin.online/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const normalizeList = (res) => {
  const payload = res?.data;
  if (!payload || typeof payload === 'string') return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload && typeof payload === 'object' && Array.isArray(payload.data?.data)) return payload.data.data;
  if (payload && typeof payload === 'object' && Array.isArray(payload.items)) return payload.items;
  return [];
};

const normalizeEntity = (res) => {
  const payload = res?.data;
  if (!payload || typeof payload === 'string') return null;
  if (payload && !Array.isArray(payload) && !payload?.data) return payload;
  if (payload && payload.data && !Array.isArray(payload.data)) return payload.data;
  return payload?.data?.data ?? payload?.data ?? payload ?? null;
};

// ==========================================
// CATEGORIES (MySQL: categories table)
// ==========================================
export const getCategories = async () => {
  const res = await api.get('/categories');
  return normalizeList(res);
};

// ==========================================
// PRODUCTS (MySQL: products table - CRUD PERMANEN)
// ==========================================
export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params });
  return normalizeList(res);
};

export const getProduct = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return normalizeEntity(res);
};

export const createProduct = async (productData) => {
  const res = await api.post('/products', productData);
  return normalizeEntity(res);
};

export const updateProduct = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData);
  return normalizeEntity(res);
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

// ==========================================
// ARTICLES (MySQL: articles table - CRUD PERMANEN)
// ==========================================
export const getArticles = async (params = {}) => {
  const res = await api.get('/articles', { params });
  return normalizeList(res);
};

export const getArticle = async (slug) => {
  const res = await api.get(`/articles/${slug}`);
  return normalizeEntity(res);
};

export const createArticle = async (articleData) => {
  const res = await api.post('/articles', articleData);
  return normalizeEntity(res);
};

export const updateArticle = async (id, articleData) => {
  const res = await api.put(`/articles/${id}`, articleData);
  return normalizeEntity(res);
};

export const deleteArticle = async (id) => {
  const res = await api.delete(`/articles/${id}`);
  return res.data;
};

// ==========================================
// ARTICLE COMMENTS (MySQL: article_comments table)
// ==========================================
export const getArticleComments = async (slug) => {
  const res = await api.get(`/articles/${slug}/comments`);
  return normalizeList(res);
};

export const postArticleComment = async (slug, payload) => {
  const res = await api.post(`/articles/${slug}/comments`, payload);
  return res.data;
};

// ==========================================
// MEDIA (Server Storage: public/uploads/media)
// ==========================================
export const getMediaList = async () => {
  const res = await api.get('/media');
  return normalizeList(res);
};

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const deleteMedia = async (filename) => {
  const res = await api.delete(`/media/${encodeURIComponent(filename)}`);
  return res.data;
};

// ==========================================
// OTHER SECTIONS (Bean Bag, Testimonials, Services, Settings, Contacts)
// ==========================================
export const getBeanBagPrices = async () => {
  const res = await api.get('/bean-bag-prices');
  return normalizeList(res);
};

export const getTestimonials = async () => {
  const res = await api.get('/testimonials');
  return normalizeList(res);
};

export const getServices = async () => {
  const res = await api.get('/services');
  return normalizeList(res);
};

export const getClients = async () => {
  const res = await api.get('/clients');
  return normalizeList(res);
};

export const getSettings = async () => {
  const res = await api.get('/settings');
  return normalizeEntity(res);
};

export const updateSettings = async (settingsData) => {
  const res = await api.post('/settings', settingsData);
  return res.data;
};

export const sendContact = async (formData) => {
  const res = await api.post('/contacts', formData);
  return res.data;
};
