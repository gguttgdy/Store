import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const watchPassword = watch('password', '');
  const watchConfirmPassword = watch('confirmPassword', '');

  // Real-time password strength calculation
  useEffect(() => {
    const calculateStrength = (password) => {
      if (!password) return { score: 0, feedback: [], label: '', color: '#e5e7eb' };
      
      let score = 0;
      const feedback = [];
      
      if (password.length >= 8) score += 1;
      else feedback.push('At least 8 characters');
      
      if (/[A-Z]/.test(password)) score += 1;
      else feedback.push('One uppercase letter');
      
      if (/[a-z]/.test(password)) score += 1;
      else feedback.push('One lowercase letter');
      
      if (/\d/.test(password)) score += 1;
      else feedback.push('One number');
      
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
      else feedback.push('One special character');
      
      const levels = [
        { label: 'Very Weak', color: '#ef4444' },
        { label: 'Weak', color: '#f97316' },
        { label: 'Fair', color: '#eab308' },
        { label: 'Good', color: '#22c55e' },
        { label: 'Strong', color: '#16a34a' }
      ];
      
      return { score, feedback, ...levels[score] || levels[0] };
    };
    
    setPasswordStrength(calculateStrength(watchPassword));
  }, [watchPassword]);

  const onSubmit = async (data) => {
    if (passwordStrength.score < 3) {
      toast.error('Please create a stronger password for better security.', {
        position: 'top-right',
        autoClose: 4000
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser({
        ...data,
        agreedToTerms,
        registrationDate: new Date().toISOString()
      });
      
      if (result.success) {
        toast.success(`Welcome to E-Store, ${data.firstName}! 🎉`, {
          position: 'top-right',
          autoClose: 4000,
          style: {
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            color: 'white',
            borderRadius: '16px',
            fontWeight: '600'
          }
        });
        
        // Send welcome email (if implemented)
        // await sendWelcomeEmail(data.email, data.firstName);
        
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Registration failed. Please try again.', {
          position: 'top-right',
          autoClose: 4000
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please check your connection and try again.', {
        position: 'top-right',
        autoClose: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        maxWidth: '600px',
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
          Create Your Account
        </h1>
        
        <p style={{ 
          color: '#64748b', 
          fontSize: '16px', 
          margin: '0',
          fontWeight: '500',
          lineHeight: '1.5'
        }}>
          Join thousands of satisfied customers worldwide
        </p>
      </div>

      <div style={{ padding: '3rem' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Fields */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontSize: '14px',
                letterSpacing: '0.025em'
              }}>
                First Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  {...register('firstName')}
                  placeholder="John"
                  autoComplete="given-name"
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 56px',
                    border: `2px solid ${
                      errors.firstName ? '#ef4444' : 
                      inputFocus.firstName ? '#3b82f6' : '#e2e8f0'
                    }`,
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '500',
                    background: '#ffffff',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    boxShadow: inputFocus.firstName ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                  }}
                  onFocus={() => setInputFocus({...inputFocus, firstName: true})}
                  onBlur={() => setInputFocus({...inputFocus, firstName: false})}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: inputFocus.firstName ? '#3b82f6' : '#9ca3af',
                  fontSize: '20px',
                  transition: 'color 0.2s ease'
                }}>
                  👤
                </div>
              </div>
              {errors.firstName && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                    {errors.firstName.message}
                  </span>
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontSize: '14px',
                letterSpacing: '0.025em'
              }}>
                Last Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  {...register('lastName')}
                  placeholder="Doe"
                  autoComplete="family-name"
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 56px',
                    border: `2px solid ${
                      errors.lastName ? '#ef4444' : 
                      inputFocus.lastName ? '#3b82f6' : '#e2e8f0'
                    }`,
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '500',
                    background: '#ffffff',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    boxShadow: inputFocus.lastName ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                  }}
                  onFocus={() => setInputFocus({...inputFocus, lastName: true})}
                  onBlur={() => setInputFocus({...inputFocus, lastName: false})}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: inputFocus.lastName ? '#3b82f6' : '#9ca3af',
                  fontSize: '20px',
                  transition: 'color 0.2s ease'
                }}>
                  👥
                </div>
              </div>
              {errors.lastName && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                    {errors.lastName.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
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
                placeholder="john.doe@example.com"
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

          {/* Password Field with Strength Indicator */}
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
                placeholder="Create a strong password"
                autoComplete="new-password"
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

            {/* Password Strength Indicator */}
            {watchPassword && (
              <div style={{ marginTop: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: '6px',
                          borderRadius: '3px',
                          background: i < passwordStrength.score ? passwordStrength.color : '#e5e7eb',
                          transition: 'background 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: passwordStrength.color,
                    minWidth: '70px'
                  }}>
                    {passwordStrength.label}
                  </span>
                </div>
                
                {passwordStrength.feedback.length > 0 && (
                  <div style={{
                    background: 'rgba(99, 102, 241, 0.05)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '600', color: '#4f46e5' }}>
                      To strengthen your password, include:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#6b7280' }}>
                      {passwordStrength.feedback.slice(0, 3).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
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

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontSize: '14px',
              letterSpacing: '0.025em'
            }}>
              Confirm Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Confirm your password"
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '16px 56px 16px 56px',
                  border: `2px solid ${
                    errors.confirmPassword ? '#ef4444' : 
                    watchConfirmPassword && watchPassword === watchConfirmPassword ? '#10b981' :
                    inputFocus.confirmPassword ? '#3b82f6' : '#e2e8f0'
                  }`,
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: '#ffffff',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  boxShadow: inputFocus.confirmPassword ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                }}
                onFocus={() => setInputFocus({...inputFocus, confirmPassword: true})}
                onBlur={() => setInputFocus({...inputFocus, confirmPassword: false})}
              />
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: inputFocus.confirmPassword ? '#3b82f6' : '#9ca3af',
                fontSize: '20px',
                transition: 'color 0.2s ease'
              }}>
                🔐
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
              
              {/* Password match indicator */}
              {watchConfirmPassword && watchPassword === watchConfirmPassword && (
                <div style={{
                  position: 'absolute',
                  right: '54px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#10b981',
                  fontSize: '18px'
                }}>
                  ✓
                </div>
              )}
            </div>
            {errors.confirmPassword && (
              <div style={{
                marginTop: '8px',
                padding: '8px 12px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                  {errors.confirmPassword.message}
                </span>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid',
              borderColor: agreedToTerms ? 'rgba(59, 130, 246, 0.3)' : 'rgba(229, 231, 235, 0.8)',
              background: agreedToTerms ? 'rgba(59, 130, 246, 0.05)' : 'rgba(249, 250, 251, 0.8)',
              transition: 'all 0.2s ease'
            }}>
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{
                  marginRight: '12px',
                  marginTop: '2px',
                  accentColor: '#3b82f6',
                  transform: 'scale(1.1)'
                }}
              />
              <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#374151' }}>
                I agree to the{' '}
                <Link 
                  to="/terms" 
                  style={{ 
                    color: '#3b82f6', 
                    textDecoration: 'underline',
                    fontWeight: '600'
                  }}
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link 
                  to="/privacy" 
                  style={{ 
                    color: '#3b82f6', 
                    textDecoration: 'underline',
                    fontWeight: '600'
                  }}
                >
                  Privacy Policy
                </Link>
                . I understand that my information will be processed securely.
              </div>
            </label>
          </div>

          {/* Professional Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !agreedToTerms || passwordStrength.score < 3}
            style={{
              width: '100%',
              padding: '16px',
              background: (isLoading || !agreedToTerms || passwordStrength.score < 3)
                ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (isLoading || !agreedToTerms || passwordStrength.score < 3) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: (isLoading || !agreedToTerms || passwordStrength.score < 3)
                ? 'none' 
                : '0 8px 16px rgba(59, 130, 246, 0.24)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              letterSpacing: '0.025em'
            }}
            onMouseEnter={(e) => {
              if (!isLoading && agreedToTerms && passwordStrength.score >= 3) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.32)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && agreedToTerms && passwordStrength.score >= 3) {
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
                Creating Account...
              </>
            ) : (
              'Create Account'
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

        {/* Sign In Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '0' }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563eb'}
              onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
            >
              Sign in
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

export default RegisterForm;
