import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
              <h4>Access Denied</h4>
              <p>You don't have permission to access this page.</p>
              <Navigate to="/" replace />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
