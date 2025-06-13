import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  getUserOrders: async (userId) => {
    return await api.get(`/orders/user/${userId}`);
  },

  getOrderById: async (orderId) => {
    return await api.get(`/orders/${orderId}`);
  },

  updateOrderStatus: async (orderId, status) => {
    return await api.patch(`/orders/${orderId}/status`, { status });
  },

  cancelOrder: async (orderId) => {
    return await api.patch(`/orders/${orderId}/cancel`);
  },

  getAllOrders: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return await api.get(`/orders?${searchParams}`);
  },

  getOrderStatistics: async () => {
    return await api.get('/orders/statistics');
  }
};
