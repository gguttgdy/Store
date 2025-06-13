import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const features = [
    {
      icon: 'bi-shield-check',
      title: 'Premium Quality',
      description: 'Curated selection of high-quality products from trusted brands worldwide.',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      icon: 'bi-lightning-charge',
      title: 'Lightning Fast',
      description: 'Super-fast delivery with real-time tracking and instant notifications.',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      icon: 'bi-headset',
      title: '24/7 Support',
      description: 'Round-the-clock customer support with AI-powered chat assistance.',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    }
  ];

  const categories = [
    { 
      name: 'Electronics', 
      icon: 'bi-laptop', 
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      itemCount: '1,200+'
    },
    { 
      name: 'Fashion', 
      icon: 'bi-bag-heart', 
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      itemCount: '850+'
    },
    { 
      name: 'Home & Garden', 
      icon: 'bi-house-heart', 
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      itemCount: '650+'
    },
    { 
      name: 'Sports', 
      icon: 'bi-trophy', 
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      itemCount: '420+'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Designer',
      avatar: '👩‍🎨',
      text: 'E-Store has completely transformed my shopping experience. The quality is outstanding and delivery is always on time!',
      rating: 5,
      location: 'New York, USA'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Entrepreneur',
      avatar: '👨‍💻',
      text: 'Amazing selection of tech products with competitive prices. Customer service is exceptional - highly recommended!',
      rating: 5,
      location: 'San Francisco, USA'
    },
    {
      name: 'Emma Wilson',
      role: 'Interior Designer',
      avatar: '👩‍🏠',
      text: 'Found everything I needed for my home renovation project. The quality exceeded my expectations!',
      rating: 5,
      location: 'London, UK'
    }
  ];

  const benefits = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: '🔄', title: '30-Day Returns', desc: 'Hassle-free returns' },
    { icon: '🏆', title: 'Best Quality', desc: 'Premium products only' },
    { icon: '💳', title: 'Secure Payment', desc: '256-bit SSL encryption' },
    { icon: '⚡', title: 'Fast Delivery', desc: '2-3 business days' },
    { icon: '🎁', title: 'Gift Cards', desc: 'Perfect for any occasion' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      price: '$199.99',
      originalPrice: '$249.99',
      image: '🎧',
      badge: 'Best Seller',
      rating: 4.8,
      reviews: 2547
    },
    {
      id: 2,
      name: 'Smart Watch Series X',
      price: '$299.99',
      originalPrice: '$399.99',
      image: '⌚',
      badge: 'New',
      rating: 4.9,
      reviews: 1832
    },
    {
      id: 3,
      name: 'Premium Backpack',
      price: '$89.99',
      originalPrice: '$119.99',
      image: '🎒',
      badge: 'Sale',
      rating: 4.7,
      reviews: 1245
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: '$149.99',
      originalPrice: '$199.99',
      image: '🔊',
      badge: 'Hot Deal',
      rating: 4.6,
      reviews: 892
    }
  ];

  const newsUpdates = [
    {
      date: 'Nov 15, 2024',
      title: 'Black Friday Mega Sale is Here!',
      excerpt: 'Up to 70% off on selected items. Limited time offer.',
      category: 'Sale',
      image: '🛍️'
    },
    {
      date: 'Nov 10, 2024',
      title: 'New Tech Collection Launched',
      excerpt: 'Discover the latest gadgets and smart devices.',
      category: 'Product',
      image: '📱'
    },
    {
      date: 'Nov 5, 2024',
      title: 'Sustainability Initiative',
      excerpt: 'Our commitment to eco-friendly packaging and shipping.',
      category: 'News',
      image: '🌱'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Enhanced Hero Section */}
      <section className="hero-modern position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className="mb-4">
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    padding: '8px 20px',
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    🚀 New Collection Available
                  </span>
                </div>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  marginBottom: '1.5rem',
                  color: '#ffffff'
                }}>
                  Discover Amazing Products
                  <br />
                  <span style={{ 
                    color: '#ffffff', 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>
                    At Unbeatable Prices
                  </span>
                </h1>
                <p style={{
                  fontSize: '1.2rem',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  Experience the future of online shopping with our curated collection 
                  of premium products and exceptional customer service.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link 
                    to="/products" 
                    style={{
                      background: '#ffffff',
                      color: '#3b82f6',
                      padding: '15px 30px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '16px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                    }}
                  >
                    🛒 Explore Products
                  </Link>
                  <Link 
                    to="/register" 
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      padding: '15px 30px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.3)';
                      e.target.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    👨‍💻 Join Community
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="row mt-5 text-white">
                  <div className="col-4 text-center">
                    <h3 style={{ fontWeight: '800', margin: '0' }}>50K+</h3>
                    <small style={{ opacity: '0.8' }}>Happy Customers</small>
                  </div>
                  <div className="col-4 text-center">
                    <h3 style={{ fontWeight: '800', margin: '0' }}>1000+</h3>
                    <small style={{ opacity: '0.8' }}>Products</small>
                  </div>
                  <div className="col-4 text-center">
                    <h3 style={{ fontWeight: '800', margin: '0' }}>99%</h3>
                    <small style={{ opacity: '0.8' }}>Satisfaction</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image position-relative">
                <div style={{
                  width: '100%',
                  height: '500px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  🛍️
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </section>

      {/* Benefits Bar */}
      <section style={{ 
        background: '#ffffff', 
        padding: '40px 0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container">
          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-6">
                <div className="text-center">
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                    {benefit.icon}
                  </div>
                  <h6 style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', color: '#1e293b' }}>
                    {benefit.title}
                  </h6>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0' }}>
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Why Choose <span style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>E-Store</span>?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We provide the ultimate shopping experience with cutting-edge features
            </p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div style={{
                  background: '#ffffff',
                  padding: '40px 30px',
                  borderRadius: '24px',
                  textAlign: 'center',
                  height: '100%',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: feature.bgColor,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: feature.color
                  }}>
                    <i className={`${feature.icon}`} style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 style={{ fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
                    {feature.title}
                  </h5>
                  <p style={{ color: '#64748b', lineHeight: '1.6', margin: '0' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Featured Products
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Handpicked products that our customers love the most
            </p>
          </div>
          
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6">
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}>
                  {/* Product Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    zIndex: 2
                  }}>
                    {product.badge}
                  </div>
                  
                  {/* Product Image */}
                  <div style={{
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                  }}>
                    {product.image}
                  </div>
                  
                  {/* Product Info */}
                  <div style={{ padding: '24px' }}>
                    <h5 style={{ 
                      fontWeight: '700', 
                      marginBottom: '12px', 
                      color: '#1e293b',
                      fontSize: '16px'
                    }}>
                      {product.name}
                    </h5>
                    
                    {/* Rating */}
                    <div className="d-flex align-items-center mb-2">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ 
                            color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb',
                            fontSize: '14px'
                          }}>★</span>
                        ))}
                      </div>
                      <span style={{ 
                        fontSize: '13px', 
                        color: '#64748b',
                        marginLeft: '8px'
                      }}>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div>
                        <span style={{ 
                          fontSize: '20px',
                          fontWeight: '800', 
                          color: '#1e293b'
                        }}>
                          {product.price}
                        </span>
                        <small style={{ 
                          color: '#9ca3af',
                          textDecoration: 'line-through',
                          marginLeft: '8px'
                        }}>
                          {product.originalPrice}
                        </small>
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <Link to="/products" style={{
              background: 'transparent',
              color: '#3b82f6',
              border: '2px solid #3b82f6',
              padding: '15px 40px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#3b82f6';
            }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Shop by Category
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Find exactly what you're looking for in our organized collections
            </p>
          </div>
          
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={category.name} className="col-md-6 col-lg-3">
                <Link 
                  to={`/products?category=${category.name.toLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '40px 30px',
                    textAlign: 'center',
                    height: '100%',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  }}
                  >
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: category.gradient,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      color: '#ffffff'
                    }}>
                      <i className={`${category.icon}`} style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 style={{ fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
                      {category.name}
                    </h5>
                    <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px' }}>
                      {category.itemCount} items
                    </p>
                    <span style={{
                      color: '#3b82f6',
                      fontWeight: '600',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Explore →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              What Our Customers Say
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Real feedback from our amazing community
            </p>
          </div
          >
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                {testimonials[currentSlide].avatar}
              </div>
              <p style={{
                fontSize: '1.3rem',
                fontStyle: 'italic',
                color: '#374151',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                "{testimonials[currentSlide].text}"
              </p>
              <div style={{ marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ 
                    color: '#fbbf24',
                    fontSize: '20px',
                    marginRight: '4px'
                  }}>★</span>
                ))}
              </div>
              <h5 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                {testimonials[currentSlide].name}
              </h5>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '0' }}>
                {testimonials[currentSlide].role} • {testimonials[currentSlide].location}
              </p>
            </div>
            
            {/* Dots Indicator */}
            <div className="d-flex justify-content-center mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentSlide ? '#3b82f6' : '#cbd5e1',
                    margin: '0 6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: '800',
                marginBottom: '1rem'
              }}>
                📧 Stay in the Loop!
              </h2>
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                opacity: '0.9'
              }}>
                Get exclusive deals, new product alerts, and special offers delivered to your inbox
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '60px',
                padding: '8px',
                maxWidth: '500px',
                margin: '0 auto',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="d-flex">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      color: '#ffffff',
                      padding: '16px 24px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                  <button style={{
                    background: '#ffffff',
                    color: '#3b82f6',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '16px 32px',
                    fontWeight: '700',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}>
                    Subscribe
                  </button>
                </div>
              </div>
              <p style={{
                fontSize: '14px',
                marginTop: '16px',
                opacity: '0.8'
              }}>
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Latest News & Updates
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Stay updated with our latest announcements and product launches
            </p>
          </div>
          
          <div className="row g-4">
            {newsUpdates.map((news, index) => (
              <div key={index} className="col-lg-4">
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                  }}>
                    {news.image}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {news.category}
                      </span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {news.date}
                      </span>
                    </div>
                    <h5 style={{
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#1e293b',
                      lineHeight: '1.4'
                    }}>
                      {news.title}
                    </h5>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      {news.excerpt}
                    </p>
                    <a href="#" style={{
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '80px 0',
        color: '#ffffff'
      }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛍️</div>
              <h3 style={{ fontWeight: '800', fontSize: '2.5rem', marginBottom: '8px' }}>
                50,000+
              </h3>
              <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>Happy Customers</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</div>
              <h3 style={{ fontWeight: '800', fontSize: '2.5rem', marginBottom: '8px' }}>
                1M+
              </h3>
              <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>Orders Delivered</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌟</div>
              <h3 style={{ fontWeight: '800', fontSize: '2.5rem', marginBottom: '8px' }}>
                4.9/5
              </h3>
              <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>Average Rating</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚚</div>
              <h3 style={{ fontWeight: '800', fontSize: '2.5rem', marginBottom: '8px' }}>
                24h
              </h3>
              <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>Fast Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                marginBottom: '1.5rem'
              }}>
                Ready to Start Shopping?
              </h2>
              <p style={{
                fontSize: '1.2rem',
                marginBottom: '2rem',
                opacity: '0.9',
                lineHeight: '1.6'
              }}>
                Join thousands of satisfied customers and discover amazing deals today!
              </p>
              <Link 
                to="/register" 
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: '#ffffff',
                  padding: '18px 40px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
                }}
              >
                🚀 Get Started Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
      </section>
    </div>
  );
};

export default HomePage;

<style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .min-vh-75 { min-height: 75vh; }
`}</style>
