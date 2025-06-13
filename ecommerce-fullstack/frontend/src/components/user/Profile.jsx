import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string(),
  address: yup.string()
});

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Here you would normally update user profile via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Profile Information</h5>
        {!isEditing && (
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit
          </button>
        )}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName.message}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              {...register('email')}
              disabled={!isEditing}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              {...register('phone')}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              {...register('address')}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" text="" /> : 'Save Changes'}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
