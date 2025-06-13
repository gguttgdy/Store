import api from './api';

export const productService = {
  getAllProducts: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return await api.get(`/products?${searchParams}`);
  },

  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  },

  searchProducts: async (query, filters = {}) => {
    const searchParams = new URLSearchParams({
      q: query,
      ...filters
    });
    return await api.get(`/products/search?${searchParams}`);
  },

  getProductsByCategory: async (categoryId) => {
    return await api.get(`/products/category/${categoryId}`);
  },

  getCategories: async () => {
    return await api.get('/categories');
  },

  getFeaturedProducts: async () => {
    return await api.get('/products/featured');
  }
};
