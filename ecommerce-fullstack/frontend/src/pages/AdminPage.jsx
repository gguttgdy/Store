import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';
import Analytics from '../components/admin/Analytics';

const AdminPage = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/admin/products', name: 'Products', icon: 'bi-box' },
    { path: '/admin/orders', name: 'Orders', icon: 'bi-bag' },
    { path: '/admin/users', name: 'Users', icon: 'bi-people' },
    { path: '/admin/analytics', name: 'Analytics', icon: 'bi-graph-up' }
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Admin Panel
              </h6>
            </div>
            <div className="list-group list-group-flush">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`list-group-item list-group-item-action ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-md-9 col-lg-10">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
