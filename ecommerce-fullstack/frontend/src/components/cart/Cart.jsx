import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { items, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-cart-x display-1 text-muted"></i>
        <h3 className="mt-3">Your cart is empty</h3>
        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Shopping Cart ({items.length} items)</h5>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                <i className="bi bi-trash me-1"></i>
                Clear Cart
              </button>
            </div>
          </div>
          <div className="card-body">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping:</span>
              <span className="text-success">Free</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tax:</span>
              <span>{formatPrice(getTotalPrice() * 0.1)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <strong className="text-primary">
                {formatPrice(getTotalPrice() * 1.1)}
              </strong>
            </div>
            <Link 
              to="/checkout" 
              className="btn btn-primary w-100 mb-2"
            >
              Proceed to Checkout
            </Link>
            <Link 
              to="/products" 
              className="btn btn-outline-primary w-100"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
