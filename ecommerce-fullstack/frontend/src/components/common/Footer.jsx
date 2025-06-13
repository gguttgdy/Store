import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: 'bi-facebook', color: '#1877f2', name: 'Facebook' },
    { icon: 'bi-twitter', color: '#1da1f2', name: 'Twitter' },
    { icon: 'bi-instagram', color: '#e4405f', name: 'Instagram' },
    { icon: 'bi-linkedin', color: '#0077b5', name: 'LinkedIn' },
    { icon: 'bi-youtube', color: '#ff0000', name: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/', icon: 'bi-house', description: 'Return to homepage' },
    { name: 'Products', path: '/products', icon: 'bi-grid', description: 'Browse our catalog' },
    { name: 'Categories', path: '/categories', icon: 'bi-tags', description: 'Shop by category' },
    { name: 'New Arrivals', path: '/new-arrivals', icon: 'bi-star', description: 'Latest products' },
    { name: 'Sale', path: '/sale', icon: 'bi-percent', description: 'Special offers' }
  ];

  const customerService = [
    { name: 'Help Center', path: '/help', icon: 'bi-question-circle', description: 'Get instant help', badge: 'FAQ' },
    { name: 'Live Chat', path: '/chat', icon: 'bi-chat-dots', description: '24/7 support', badge: 'Live' },
    { name: 'Returns', path: '/returns', icon: 'bi-arrow-return-left', description: 'Easy returns', badge: '30 days' },
    { name: 'Track Order', path: '/track', icon: 'bi-truck', description: 'Real-time tracking', badge: 'GPS' },
    { name: 'Size Guide', path: '/size-guide', icon: 'bi-rulers', description: 'Perfect fit guide', badge: 'New' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' }
  ];

  return (
    <>
      <style>{`
        .footer-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }
        
        .footer-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
          opacity: 0.8;
        }
        
        .footer-content {
          position: relative;
          z-index: 2;
          padding: 4rem 0 2rem;
        }
        
        .company-section {
          padding-right: 2rem;
        }
        
        .company-logo {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .logo-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        
        .logo-icon:hover {
          transform: scale(1.05) rotate(5deg);
        }
        
        .company-name {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 4px;
        }
        
        .company-tagline {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        
        .company-description {
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 400px;
        }
        
        .footer-section {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .footer-section-title {
          position: relative;
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          padding-bottom: 10px;
        }
        
        .footer-section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 1px;
        }
        
        .section-subtitle {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          font-weight: 500;
          line-height: 1.4;
        }
        
        .footer-links-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .footer-link {
          display: flex;
          align-items: center;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 12px;
          transition: all 0.3s ease;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
        }
        
        .footer-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .footer-link:hover::before {
          left: 100%;
        }
        
        .footer-link:hover {
          color: #ffffff;
          transform: translateX(6px);
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
        }
        
        .footer-link-icon {
          margin-right: 10px;
          font-size: 14px;
          opacity: 0.7;
          transition: all 0.3s ease;
          width: 16px;
          text-align: center;
        }
        
        .footer-link:hover .footer-link-icon {
          opacity: 1;
          color: #3b82f6;
          transform: scale(1.1);
        }
        
        .footer-link-content {
          flex: 1;
          min-width: 0;
        }
        
        .footer-link-name {
          font-weight: 600;
          margin-bottom: 2px;
          line-height: 1.3;
        }
        
        .footer-link-description {
          font-size: 12px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          line-height: 1.3;
        }
        
        .footer-link:hover .footer-link-description {
          opacity: 1;
        }
        
        .footer-link-badge {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-left: 6px;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .footer-link:hover .footer-link-badge {
          opacity: 1;
          transform: scale(1);
        }
        
        .social-links {
          display: flex;
          gap: 12px;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .social-link {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .social-link:hover::before {
          left: 100%;
        }
        
        .social-link:hover {
          color: #ffffff;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .social-link.facebook:hover { background: #1877f2; }
        .social-link.twitter:hover { background: #1da1f2; }
        .social-link.instagram:hover { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
        .social-link.linkedin:hover { background: #0077b5; }
        .social-link.youtube:hover { background: #ff0000; }
        
        .trust-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .trust-badge {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .trust-badge:hover {
          transform: translateY(-2px);
        }
        
        .trust-badge.ssl {
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.3);
        }
        
        .trust-badge.ssl:hover {
          background: rgba(16, 185, 129, 0.15);
        }
        
        .trust-badge.shipping {
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .trust-badge.shipping:hover {
          background: rgba(59, 130, 246, 0.15);
        }
        
        .newsletter-section {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          height: fit-content;
        }
        
        .newsletter-description {
          color: #cbd5e1;
          font-size: 14px;
          margin-bottom: 1.25rem;
          text-align: center;
          line-height: 1.5;
        }
        
        .newsletter-form {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.25rem;
        }
        
        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 14px;
          padding: 12px 16px;
          outline: none;
        }
        
        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .newsletter-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 12px 18px;
          font-weight: 700;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .newsletter-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        
        .contact-info {
          display: grid;
          gap: 10px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }
        
        .contact-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .contact-text {
          color: #cbd5e1;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          margin-top: 2.5rem;
        }
        
        .legal-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .legal-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 6px 12px;
          border-radius: 8px;
        }
        
        .legal-link:hover {
          color: #ffffff;
          background: rgba(59, 130, 246, 0.15);
        }
        
        .copyright {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 0;
          line-height: 1.5;
        }
        
        @media (max-width: 992px) {
          .company-section {
            padding-right: 0;
            margin-bottom: 2rem;
          }
          
          .footer-section {
            margin-bottom: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .footer-content {
            padding: 3rem 0 2rem;
          }
          
          .company-name {
            font-size: 24px;
          }
          
          .legal-links {
            justify-content: center;
            gap: 1rem;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .newsletter-section {
            margin-top: 1rem;
          }
        }
      `}</style>
      
      <footer className="footer-container">
        <div className="footer-pattern"></div>
        
        <div className="container footer-content">
          <div className="row g-4">
            {/* Company Information */}
            <div className="col-lg-4 col-md-12">
              <div className="company-section">
                <div className="company-logo">
                  <div className="logo-icon">
                    <i className="bi bi-bag-heart" style={{ fontSize: '24px', color: '#ffffff' }}></i>
                  </div>
                  <div>
                    <div className="company-name">E-Store</div>
                    <div className="company-tagline">Premium Shopping</div>
                  </div>
                </div>
                
                <p className="company-description">
                  Your trusted online marketplace for quality products at competitive prices. 
                  We're committed to providing exceptional shopping experiences.
                </p>
                
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={social.name}
                      href="#" 
                      className={`social-link ${social.name.toLowerCase()}`}
                      title={social.name}
                      aria-label={social.name}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
                
                <div className="trust-badges">
                  <div className="trust-badge ssl">
                    <i className="bi bi-shield-check me-2"></i>
                    SSL Secured
                  </div>
                  <div className="trust-badge shipping">
                    <i className="bi bi-truck me-2"></i>
                    Free Shipping
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-section">
                <h6 className="footer-section-title">Quick Links</h6>
                <p className="section-subtitle">Navigate easily through our store</p>
                <div className="footer-links-container">
                  {quickLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="footer-link">
                      <i className={`${link.icon} footer-link-icon`}></i>
                      <div className="footer-link-content">
                        <div className="footer-link-name">{link.name}</div>
                        <div className="footer-link-description">{link.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Customer Service */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-section">
                <h6 className="footer-section-title">Support</h6>
                <p className="section-subtitle">We're here to help you succeed</p>
                <div className="footer-links-container">
                  {customerService.map((service, index) => (
                    <Link key={index} to={service.path} className="footer-link">
                      <i className={`${service.icon} footer-link-icon`}></i>
                      <div className="footer-link-content">
                        <div className="footer-link-name">{service.name}</div>
                        <div className="footer-link-description">{service.description}</div>
                      </div>
                      {service.badge && (
                        <div className="footer-link-badge">{service.badge}</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Newsletter & Contact */}
            <div className="col-lg-4 col-md-12">
              <div className="footer-section">
                <h6 className="footer-section-title">Stay Connected</h6>
                
                <div className="newsletter-section">
                  <p className="newsletter-description">
                    🎉 Subscribe for exclusive deals and member-only discounts!
                  </p>
                  
                  <form className="newsletter-form">
                    <input 
                      type="email" 
                      className="newsletter-input"
                      placeholder="Enter your email"
                      required
                    />
                    <button type="submit" className="newsletter-btn">
                      <i className="bi bi-send"></i>
                    </button>
                  </form>
                  
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-icon" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                        <i className="bi bi-geo-alt" style={{ color: '#60a5fa', fontSize: '16px' }}></i>
                      </div>
                      <div className="contact-text">
                        123 Commerce Street<br />
                        Digital City, DC 12345
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                        <i className="bi bi-telephone" style={{ color: '#34d399', fontSize: '16px' }}></i>
                      </div>
                      <div className="contact-text">
                        +1 (555) 123-4567<br />
                        24/7 Support
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                        <i className="bi bi-envelope" style={{ color: '#fbbf24', fontSize: '16px' }}></i>
                      </div>
                      <div className="contact-text">
                        support@estore.com<br />
                        Quick Response
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6 order-md-2 mb-3 mb-md-0">
                <div className="legal-links">
                  {legalLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="legal-link">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="col-md-6 order-md-1">
                <p className="copyright">
                  &copy; 2024 E-Store. All rights reserved. Made with ❤️ for amazing shopping experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
