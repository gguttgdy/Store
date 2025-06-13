import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <style>{`
        .notfound-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          padding-top: 120px;
          position: relative;
          overflow: hidden;
        }
        
        .notfound-background {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
        }
        
        .notfound-card {
          max-width: 700px;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 4rem 3rem;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          text-align: center;
          position: relative;
          z-index: 2;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .notfound-error-code {
          font-size: clamp(4rem, 12vw, 8rem);
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1;
          animation: bounce 2s infinite;
          position: relative;
        }
        
        .notfound-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: rotate 3s ease-in-out infinite;
          display: block;
        }
        
        .notfound-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .notfound-description {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #64748b;
          margin-bottom: 3rem;
          line-height: 1.6;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .notfound-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }
        
        .notfound-btn {
          padding: 16px 32px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .notfound-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .notfound-btn:hover::before {
          left: 100%;
        }
        
        .notfound-btn-primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: #ffffff;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          border: none;
        }
        
        .notfound-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
          color: #ffffff;
          text-decoration: none;
        }
        
        .notfound-btn-secondary {
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          backdrop-filter: blur(10px);
        }
        
        .notfound-btn-secondary:hover {
          background: #3b82f6;
          color: #ffffff;
          transform: translateY(-3px) scale(1.02);
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .notfound-btn i {
          margin-right: 8px;
          transition: transform 0.3s ease;
        }
        
        .notfound-btn:hover i {
          transform: scale(1.1);
        }
        
        .notfound-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          flex-wrap: wrap;
        }
        
        .notfound-stat {
          text-align: center;
          min-width: 80px;
        }
        
        .notfound-stat-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: #3b82f6;
          display: block;
        }
        
        .notfound-stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }
        
        @media (max-width: 768px) {
          .notfound-card {
            padding: 3rem 2rem;
            margin: 1rem;
          }
          
          .notfound-buttons {
            gap: 0.75rem;
          }
          
          .notfound-btn {
            min-width: 140px;
            padding: 14px 24px;
            font-size: 15px;
          }
          
          .notfound-stats {
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .notfound-container {
            padding: 1rem;
            padding-top: 100px;
          }
          
          .notfound-card {
            padding: 2.5rem 1.5rem;
          }
          
          .notfound-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .notfound-btn {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
      
      <div className="notfound-container">
        <div className="notfound-background"></div>
        
        <div className="notfound-card">
          <div className="notfound-error-code">404</div>
          
          <div className="notfound-icon">🚀</div>
          
          <h1 className="notfound-title">
            Oops! Page Not Found
          </h1>
          
          <p className="notfound-description">
            The page you're looking for seems to have gone on a shopping spree! 
            Don't worry, let's get you back to exploring our amazing collection of products.
          </p>
          
          <div className="notfound-buttons">
            <Link to="/" className="notfound-btn notfound-btn-primary">
              <i className="bi bi-house"></i>
              Back to Home
            </Link>
            
            <Link to="/products" className="notfound-btn notfound-btn-secondary">
              <i className="bi bi-grid"></i>
              Explore Products
            </Link>
          </div>
          
          <div className="notfound-stats">
            <div className="notfound-stat">
              <span className="notfound-stat-number">1000+</span>
              <span className="notfound-stat-label">Products</span>
            </div>
            <div className="notfound-stat">
              <span className="notfound-stat-number">50K+</span>
              <span className="notfound-stat-label">Customers</span>
            </div>
            <div className="notfound-stat">
              <span className="notfound-stat-number">99%</span>
              <span className="notfound-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
