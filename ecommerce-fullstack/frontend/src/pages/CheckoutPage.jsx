import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Checkout</h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
