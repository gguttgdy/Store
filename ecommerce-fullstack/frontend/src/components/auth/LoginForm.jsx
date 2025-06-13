import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success('Welcome back!', {
          style: {
            background: 'var(--success)',
            color: 'white'
          }
        });
        navigate('/');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '480px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(25px)',
      borderRadius: '32px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Decorative Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
        padding: '2rem 3rem 1rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          borderRadius: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: '#ffffff',
          fontSize: '40px',
          boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)',
          transform: 'rotate(-5deg)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg) scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'rotate(-5deg) scale(1)'}
        >
          👋
        </div>
        <h1 style={{ 
          fontWeight: '800', 
          marginBottom: '0.5rem', 
          fontSize: '32px',
          color: '#1e293b',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Welcome Back!
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', margin: '0', fontWeight: '500' }}>
          Sign in to continue your shopping journey 🛍️
        </p>
      </div>

      <div style={{ padding: '2rem 3rem 3rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '0.5rem',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem 1rem 3.5rem',
                  border: `3px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '20px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px'
              }}>
                📧
              </div>
            </div>
            {errors.email && (
              <div style={{
                color: '#ef4444',
                fontSize: '14px',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600'
              }}>
                ⚠️ {errors.email.message}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '0.5rem',
              fontSize: '14px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '1rem 3.5rem 1rem 3.5rem',
                  border: `3px solid ${errors.password ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '20px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px'
              }}>
                🔒
              </div>
              <button
                type="button"
                style={{
                  position: 'absolute',
                  right: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '0.5rem',
                  transition: 'background 0.2s ease'
                }}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <div style={{
                color: '#ef4444',
                fontSize: '14px',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600'
              }}>
                ⚠️ {errors.password.message}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#64748b',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              <input 
                type="checkbox" 
                style={{ 
                  marginRight: '0.5rem',
                  accentColor: '#3b82f6',
                  transform: 'scale(1.2)'
                }} 
              />
              Remember me for 30 days
            </label>
            <Link to="/forgot-password" style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '700',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#2563eb'}
            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
            >
              Forgot password? 🔗
            </Link>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1.25rem',
              background: isLoading 
                ? '#94a3b8' 
                : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing in...
              </>
            ) : (
              <>
                🚀 Sign In Now
              </>
            )}
          </button>
        </form>

        {/* Social Login & Register Link */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            fontSize: '14px',
            color: '#94a3b8',
            fontWeight: '500'
          }}>
            <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }}></div>
            <span style={{ padding: '0 1.5rem' }}>Or continue with</span>
            <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }}></div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button style={{
              flex: 1,
              padding: '1rem',
              background: '#ffffff',
              border: '3px solid #e2e8f0',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.background = 'rgba(59, 130, 246, 0.05)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.background = '#ffffff';
              e.target.style.transform = 'translateY(0)';
            }}
            >
              🌐 Google
            </button>
            <button style={{
              flex: 1,
              padding: '1rem',
              background: '#ffffff',
              border: '3px solid #e2e8f0',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.background = 'rgba(59, 130, 246, 0.05)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.background = '#ffffff';
              e.target.style.transform = 'translateY(0)';
            }}
            >
              📘 Facebook
            </button>
          </div>
          
          <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '500' }}>
            New to E-Store? {' '}
            <Link to="/register" style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: '700',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#2563eb'}
            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
            >
              Create your account 🎉
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
