import React from 'react';
import Cart from '../components/cart/Cart';

const CartPage = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Shopping Cart</h2>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
