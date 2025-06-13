import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalOrders: 1247,
          totalRevenue: 89542.33,
          totalProducts: 156,
          totalUsers: 2847,
          recentOrders: [
            { id: 1, customer: 'John Doe', amount: 129.99, status: 'Processing' },
            { id: 2, customer: 'Jane Smith', amount: 89.50, status: 'Shipped' },
            { id: 3, customer: 'Bob Johnson', amount: 234.99, status: 'Delivered' }
          ]
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <div className="text-muted">
          <i className="bi bi-calendar me-2"></i>
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-primary fs-1 mb-2">
                <i className="bi bi-bag"></i>
              </div>
              <h5 className="card-title">{stats.totalOrders}</h5>
              <p className="card-text text-muted">Total Orders</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-success fs-1 mb-2">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <h5 className="card-title">{formatPrice(stats.totalRevenue)}</h5>
              <p className="card-text text-muted">Total Revenue</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-info fs-1 mb-2">
                <i className="bi bi-box"></i>
              </div>
              <h5 className="card-title">{stats.totalProducts}</h5>
              <p className="card-text text-muted">Total Products</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="text-warning fs-1 mb-2">
                <i className="bi bi-people"></i>
              </div>
              <h5 className="card-title">{stats.totalUsers}</h5>
              <p className="card-text text-muted">Total Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{formatPrice(order.amount)}</td>
                    <td>
                      <span className={`badge ${
                        order.status === 'Delivered' ? 'bg-success' :
                        order.status === 'Shipped' ? 'bg-info' :
                        'bg-warning text-dark'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
