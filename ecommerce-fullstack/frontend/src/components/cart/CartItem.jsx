import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="cart-item py-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img
            src={item.imageUrls?.[0] || '/placeholder-image.jpg'}
            alt={item.name}
            className="img-fluid rounded"
            style={{ height: '80px', width: '80px', objectFit: 'cover' }}
          />
        </div>
        
        <div className="col-md-4">
          <Link 
            to={`/products/${item.id}`} 
            className="text-decoration-none text-dark"
          >
            <h6 className="mb-1">{item.name}</h6>
          </Link>
          {item.brand && (
            <small className="text-muted">{item.brand}</small>
          )}
        </div>
        
        <div className="col-md-2">
          <span className="fw-bold">{formatPrice(item.price)}</span>
        </div>
        
        <div className="col-md-3">
          <div className="input-group input-group-sm">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="form-control text-center"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max={item.stockQuantity || 99}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= (item.stockQuantity || 99)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
        
        <div className="col-md-1">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => removeFromCart(item.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
