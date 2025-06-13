import { VALIDATION_RULES } from './constants';

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null; // Phone is optional
  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) return 'Invalid phone number format';
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};

export const validatePrice = (price) => {
  if (!price) return 'Price is required';
  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice <= 0) return 'Price must be a positive number';
  return null;
};

export const validateQuantity = (quantity) => {
  if (!quantity) return 'Quantity is required';
  const numQuantity = parseInt(quantity);
  if (isNaN(numQuantity) || numQuantity <= 0) return 'Quantity must be a positive integer';
  return null;
};
