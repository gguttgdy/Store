import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setOrders([
          {
            id: '1',
            orderNumber: 'ORD-2024-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 129.99,
            items: [
              { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
              { name: 'Phone Case', quantity: 2, price: 25.00 }
            ]
          },
          {
            id: '2',
            orderNumber: 'ORD-2024-002',
            date: '2024-01-10',
            status: 'Processing',
            total: 89.99,
            items: [
              { name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
            ]
          }
        ]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Delivered': 'bg-success',
      'Processing': 'bg-warning text-dark',
      'Shipped': 'bg-info',
      'Cancelled': 'bg-danger'
    };
    
    return (
      <span className={`badge ${statusClasses[status] || 'bg-secondary'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <LoadingSpinner text="Loading order history..." />;
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <h5 className="mb-0">Order History</h5>
      </div>
      
      <div className="card-body">
        {orders.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-bag-x display-4 text-muted"></i>
            <h6 className="mt-3">No orders found</h6>
            <p className="text-muted">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.orderNumber}</strong>
                    </td>
                    <td>
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td>
                      <div>
                        {order.items.map((item, index) => (
                          <div key={index} className="small">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(order.status)}
                    </td>
                    <td>
                      <strong>{formatPrice(order.total)}</strong>
                    </td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-2">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-download"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
