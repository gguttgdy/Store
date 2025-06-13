import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        style: {
          background: '#10b981',
          color: 'white',
          borderRadius: '12px',
          fontSize: '14px'
        }
      });
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="col">
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
      >
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="position-relative overflow-hidden">
            {product.imageUrls && product.imageUrls.length > 0 ? (
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'
                }
              />
            ) : (
              <div style={{
                width: '100%',
                height: '280px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                color: '#94a3b8'
              }}>
                📦
              </div>
            )}
            
            {/* Status Badges */}
            {product.stockQuantity === 0 && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}>
                Out of Stock
              </div>
            )}
            {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}>
                Low Stock
              </div>
            )}
            
            {/* Wishlist Button */}
            <button
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                color: '#64748b',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                e.target.style.color = '#ef4444';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.color = '#64748b';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ♡
            </button>
          </div>
        </Link>
        
        <div style={{ padding: '24px', flex: '1', display: 'flex', flexDirection: 'column' }}>
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h6 style={{
              fontWeight: '700',
              marginBottom: '8px',
              fontSize: '16px',
              lineHeight: '1.4',
              color: '#1e293b',
              minHeight: '44px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.name}
            </h6>
          </Link>
          
          {product.brand && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              color: '#64748b',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginRight: '4px'
              }}>
                ✓
              </span>
              {product.brand}
            </div>
          )}
          
          <p style={{
            color: '#64748b',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '16px',
            minHeight: '42px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.description?.length > 80 
              ? `${product.description.substring(0, 80)}...` 
              : product.description || 'No description available'}
          </p>
          
          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{
                  color: i < 4 ? '#fbbf24' : '#e5e7eb',
                  fontSize: '14px'
                }}>
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
              (4.2)
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
              <span style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#1e293b',
                marginRight: '8px'
              }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  textDecoration: 'line-through'
                }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {product.stockQuantity > 0 && (
              <small style={{ color: '#10b981', fontWeight: '600' }}>
                <i className="bi bi-check-circle me-1"></i>
                In Stock
              </small>
            )}
          </div>
          
          <button
            className="btn w-100"
            style={{
              background: product.stockQuantity === 0 ? '#e2e8f0' : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: product.stockQuantity === 0 ? '#64748b' : '#ffffff',
              borderRadius: '12px',
              fontWeight: '600',
              border: 'none',
              padding: '12px 20px',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0 || isLoading}
          >
            {isLoading ? 'Adding...' : product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;