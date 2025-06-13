import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  country: yup.string().required('Country is required')
});

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Here you would normally submit the order to your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast.success('Order placed successfully!');
      clearCart();
      setCurrentStep(3); // Success step
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStep === 3) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-check-circle text-success display-1"></i>
        <h2 className="mt-3">Order Confirmed!</h2>
        <p className="text-muted">Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/'}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white">
            <h5 className="mb-0">Shipping Information</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName.message}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName.message}</div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone.message}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  id="address"
                  {...register('address')}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address.message}</div>
                )}
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    id="city"
                    {...register('city')}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city.message}</div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="postalCode" className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                    id="postalCode"
                    {...register('postalCode')}
                  />
                  {errors.postalCode && (
                    <div className="invalid-feedback">{errors.postalCode.message}</div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select
                    className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                    id="country"
                    {...register('country')}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                  {errors.country && (
                    <div className="invalid-feedback">{errors.country.message}</div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" text="" /> : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            {items.map(item => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping:</span>
              <span className="text-success">Free</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tax:</span>
              <span>{formatPrice(getTotalPrice() * 0.1)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong className="text-primary">
                {formatPrice(getTotalPrice() * 1.1)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
