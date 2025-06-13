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
  const [inputFocus, setInputFocus] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password, rememberMe);
      if (result.success) {
        toast.success(`Welcome back, ${result.user?.firstName || 'User'}! 🎉`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            color: 'white',
            borderRadius: '16px',
            fontWeight: '600'
          }
        });
        
        // Redirect based on user role or intended destination
        const redirectTo = localStorage.getItem('redirectAfterLogin') || '/dashboard';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectTo);
      } else {
        setLoginAttempts(prev => prev + 1);
        toast.error(result.error || 'Invalid credentials. Please try again.', {
          position: 'top-right',
          autoClose: 4000,
          style: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            borderRadius: '16px',
            fontWeight: '600'
          }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your connection and try again.', {
        position: 'top-right',
        autoClose: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div 
      style={{ 
        maxWidth: '520px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(30px)',
        borderRadius: '32px',
        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
      
      {/* Professional Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))',
        padding: '3rem 3rem 2rem',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
      }}>
        {/* Company Logo */}
        <div 
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#ffffff',
            fontSize: '32px',
            fontWeight: '800',
            boxShadow: '0 16px 32px rgba(59, 130, 246, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ position: 'relative', zIndex: 2 }}>ES</span>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 3s infinite'
          }}></div>
        </div>
        
        <h1 style={{ 
          fontWeight: '800', 
          fontSize: '32px',
          color: '#0f172a',
          marginBottom: '0.5rem',
          letterSpacing: '-0.025em'
        }}>
          Welcome Back
        </h1>
        
        <p style={{ 
          color: '#64748b', 
          fontSize: '16px', 
          margin: '0',
          fontWeight: '500',
          lineHeight: '1.5'
        }}>
          Sign in to access your account and continue shopping
        </p>
      </div>

      <div style={{ padding: '3rem' }}>
        {/* Login Attempts Warning */}
        {loginAttempts >= 3 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <p style={{ margin: '0', color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
                Multiple failed attempts detected
              </p>
              <p style={{ margin: '0', color: '#7f1d1d', fontSize: '13px' }}>
                Please double-check your credentials or reset your password
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Enhanced Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontSize: '14px',
              letterSpacing: '0.025em'
            }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email address"
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 56px',
                  border: `2px solid ${
                    errors.email ? '#ef4444' : 
                    inputFocus.email ? '#3b82f6' : '#e2e8f0'
                  }`,
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: '#ffffff',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  boxShadow: inputFocus.email ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                }}
                onFocus={() => setInputFocus({...inputFocus, email: true})}
                onBlur={() => setInputFocus({...inputFocus, email: false})}
              />
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: inputFocus.email ? '#3b82f6' : '#9ca3af',
                fontSize: '20px',
                transition: 'color 0.2s ease'
              }}>
                📧
              </div>
              
              {/* Email validation indicator */}
              {watch('email') && validateEmail(watch('email')) && (
                <div style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#10b981',
                  fontSize: '18px'
                }}>
                  ✓
                </div>
              )}
            </div>
            {errors.email && (
              <div style={{
                marginTop: '8px',
                padding: '8px 12px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                  {errors.email.message}
                </span>
              </div>
            )}
          </div>

          {/* Enhanced Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontSize: '14px',
              letterSpacing: '0.025em'
            }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '16px 56px 16px 56px',
                  border: `2px solid ${
                    errors.password ? '#ef4444' : 
                    inputFocus.password ? '#3b82f6' : '#e2e8f0'
                  }`,
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: '#ffffff',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  boxShadow: inputFocus.password ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                }}
                onFocus={() => setInputFocus({...inputFocus, password: true})}
                onBlur={() => setInputFocus({...inputFocus, password: false})}
              />
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: inputFocus.password ? '#3b82f6' : '#9ca3af',
                fontSize: '20px',
                transition: 'color 0.2s ease'
              }}>
                🔒
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '20px',
                  padding: '4px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'none'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <div style={{
                marginTop: '8px',
                padding: '8px 12px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                  {errors.password.message}
                </span>
              </div>
            )}
          </div>

          {/* Enhanced Options Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151',
              fontWeight: '500'
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  marginRight: '8px',
                  accentColor: '#3b82f6',
                  transform: 'scale(1.1)'
                }}
              />
              Keep me signed in
            </label>
            
            <Link 
              to="/forgot-password" 
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563eb'}
              onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
            >
              Forgot password?
            </Link>
          </div>

          {/* Professional Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              background: isLoading 
                ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isLoading 
                ? 'none' 
                : '0 8px 16px rgba(59, 130, 246, 0.24)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              letterSpacing: '0.025em',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.32)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.24)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ padding: '0 16px', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
            or continue with
          </span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        {/* Social Login Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
          <button
            type="button"
            style={{
              flex: 1,
              padding: '12px',
              background: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.background = 'rgba(59, 130, 246, 0.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.background = '#ffffff';
            }}
          >
            <span style={{ fontSize: '16px' }}>🌐</span>
            Google
          </button>
          
          <button
            type="button"
            style={{
              flex: 1,
              padding: '12px',
              background: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.background = 'rgba(59, 130, 246, 0.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.background = '#ffffff';
            }}
          >
            <span style={{ fontSize: '16px' }}>📘</span>
            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '0' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563eb'}
              onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
