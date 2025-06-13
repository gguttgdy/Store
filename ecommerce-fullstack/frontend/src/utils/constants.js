export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  PRODUCTS: {
    BASE: '/products',
    SEARCH: '/products/search',
    CATEGORIES: '/categories',
    FEATURED: '/products/featured'
  },
  ORDERS: {
    BASE: '/orders',
    USER_ORDERS: '/orders/user',
    STATISTICS: '/orders/statistics'
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    ADDRESSES: '/users/addresses',
    CHANGE_PASSWORD: '/users/change-password'
  }
};

export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive'
];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/
};
