import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isScrolled 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(255, 255, 255, 0.90)',
      backdropFilter: 'blur(25px)',
      borderBottom: `1px solid ${isScrolled ? 'rgba(226, 232, 240, 0.8)' : 'rgba(0,0,0,0.05)'}`,
      boxShadow: isScrolled 
        ? '0 8px 32px rgba(0,0,0,0.12)' 
        : '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: '1rem 0',
      minHeight: '80px'
    }}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between h-100">
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{ textDecoration: 'none' }}>
            <div className="d-flex align-items-center">
              <div className="me-3 d-flex align-items-center justify-content-center" 
                   style={{
                     width: '52px',
                     height: '52px',
                     background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                     borderRadius: '18px',
                     color: '#ffffff',
                     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                     boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'rotate(15deg) scale(1.1)';
                     e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.35)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.25)';
                   }}
              >
                <i className="bi bi-bag-heart" style={{ fontSize: '22px' }}></i>
              </div>
              <div>
                <span style={{ 
                  fontSize: '28px', 
                  fontWeight: '800', 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
                  display: 'block',
                  lineHeight: '1'
                }}>
                  E-Store
                </span>
                <span style={{
                  fontSize: '11px',
                  color: '#64748b',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Premium Shopping
                </span>
              </div>
            </div>
          </Link>
          
          <div className="d-flex align-items-center">
            {/* Enhanced Desktop Navigation */}
            <div className="d-none d-lg-flex align-items-center me-6">
              <Link 
                className="nav-link me-4"
                to="/"
                style={{
                  color: '#1e293b',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.color = '#3b82f6';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#1e293b';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <i className="bi bi-house me-2"></i>
                Home
              </Link>
              <Link 
                className="nav-link me-4"
                to="/products"
                style={{
                  color: '#1e293b',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.color = '#3b82f6';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#1e293b';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <i className="bi bi-grid me-2"></i>
                Products
              </Link>
            </div>

            {/* Enhanced Cart & Auth Section */}
            <div className="d-flex align-items-center">
              <Link 
                className="nav-link position-relative d-flex align-items-center justify-content-center me-4" 
                to="/cart"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '18px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  textDecoration: 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-3px) scale(1.1)';
                  e.target.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.color = '#3b82f6';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <i className="bi bi-bag" style={{ fontSize: '20px' }}></i>
                {getItemCount() > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ 
                      background: 'linear-gradient(135deg, #ef4444, #f97316)', 
                      color: '#ffffff',
                      fontSize: '11px',
                      minWidth: '24px',
                      height: '24px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                      border: '2px solid #ffffff',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    {getItemCount()}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <div className="dropdown">
                  <a 
                    className="nav-link dropdown-toggle d-flex align-items-center" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                    style={{ 
                      background: 'rgba(59, 130, 246, 0.1)', 
                      borderRadius: '18px',
                      color: '#1e293b',
                      fontWeight: '600',
                      padding: '10px 20px',
                      textDecoration: 'none',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.2)';
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = 'transparent';
                    }}
                  >
                    <div className="me-3 d-flex align-items-center justify-content-center" 
                         style={{
                           width: '40px',
                           height: '40px',
                           background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                           borderRadius: '50%',
                           color: '#ffffff',
                           fontSize: '16px',
                           fontWeight: '700',
                           boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                         }}>
                      {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <div className="d-none d-md-block">
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                        {user?.firstName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Welcome back!
                      </div>
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2" 
                      style={{ 
                        borderRadius: '16px', 
                        minWidth: '220px',
                        background: '#ffffff',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }}>
                    <li>
                      <Link className="dropdown-item py-3" to="/profile" style={{ 
                        color: '#1e293b',
                        borderRadius: '12px',
                        margin: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <i className="bi bi-person me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-3" to="/orders" style={{ 
                        color: '#1e293b',
                        borderRadius: '12px',
                        margin: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <i className="bi bi-bag me-2"></i>My Orders
                      </Link>
                    </li>
                    {isAdmin() && (
                      <>
                        <li><hr className="dropdown-divider mx-3" /></li>
                        <li>
                          <Link className="dropdown-item py-3" to="/admin" style={{ 
                            color: '#1e293b',
                            borderRadius: '12px',
                            margin: '8px',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          >
                            <i className="bi bi-gear me-2"></i>Admin Panel
                          </Link>
                        </li>
                      </>
                    )}
                    <li><hr className="dropdown-divider mx-3" /></li>
                    <li>
                      <button className="dropdown-item py-3" onClick={handleLogout} style={{ 
                        color: '#ef4444',
                        borderRadius: '12px',
                        margin: '8px',
                        border: 'none',
                        background: 'transparent',
                        width: 'calc(100% - 16px)',
                        textAlign: 'left',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <Link 
                    className="nav-link" 
                    to="/login"
                    style={{
                      color: '#1e293b',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.target.style.color = '#3b82f6';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#1e293b';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="bi bi-person me-2"></i>
                    Login
                  </Link>
                  <Link 
                    className="btn"
                    to="/register"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: '#ffffff',
                      padding: '12px 28px',
                      borderRadius: '16px',
                      fontWeight: '700',
                      fontSize: '14px',
                      textDecoration: 'none',
                      border: 'none',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    <i className="bi bi-rocket-takeoff me-2"></i>
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button 
              className="navbar-toggler d-lg-none border-0 ms-4" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ 
                padding: '12px',
                borderRadius: '16px',
                background: 'rgba(59, 130, 246, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '52px',
                height: '52px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="bi bi-list fs-4" style={{ color: '#3b82f6' }}></i>
            </button>
          </div>
          
          {/* Enhanced Mobile Menu */}
          <div className="collapse navbar-collapse d-lg-none position-absolute top-100 start-0 end-0" 
               id="navbarNav"
               style={{
                 background: 'rgba(255, 255, 255, 0.95)',
                 backdropFilter: 'blur(20px)',
                 borderRadius: '0 0 24px 24px',
                 boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                 border: '1px solid rgba(226, 232, 240, 0.5)',
                 marginTop: '1rem'
               }}>
            <div style={{ padding: '2rem' }}>
              <Link 
                className="nav-link py-3 d-flex align-items-center"
                to="/"
                style={{
                  color: '#1e293b',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  transition: 'all 0.3s ease',
                  marginBottom: '8px'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <i className="bi bi-house me-3" style={{ fontSize: '18px' }}></i>
                Home
              </Link>
              <Link 
                className="nav-link py-3 d-flex align-items-center"
                to="/products"
                style={{
                  color: '#1e293b',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <i className="bi bi-grid me-3" style={{ fontSize: '18px' }}></i>
                Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
