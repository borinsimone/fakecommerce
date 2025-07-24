// Fake Store API service
const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  // Products
  getProducts: async (limit = 20) => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProduct: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },
};

export default api;
