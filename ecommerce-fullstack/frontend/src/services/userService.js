import api from './api';

export const userService = {
  updateProfile: async (userData) => {
    return await api.put('/users/profile', userData);
  },

  changePassword: async (passwordData) => {
    return await api.put('/users/change-password', passwordData);
  },

  getUserAddresses: async () => {
    return await api.get('/users/addresses');
  },

  addAddress: async (addressData) => {
    return await api.post('/users/addresses', addressData);
  },

  updateAddress: async (addressId, addressData) => {
    return await api.put(`/users/addresses/${addressId}`, addressData);
  },

  deleteAddress: async (addressId) => {
    return await api.delete(`/users/addresses/${addressId}`);
  },

  getAllUsers: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return await api.get(`/users?${searchParams}`);
  },

  getUserById: async (userId) => {
    return await api.get(`/users/${userId}`);
  },

  updateUserRole: async (userId, role) => {
    return await api.patch(`/users/${userId}/role`, { role });
  },

  deactivateUser: async (userId) => {
    return await api.patch(`/users/${userId}/deactivate`);
  }
};
