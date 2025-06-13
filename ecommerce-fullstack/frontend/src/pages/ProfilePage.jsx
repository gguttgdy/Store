import React from 'react';
import Profile from '../components/user/Profile';
import OrderHistory from '../components/user/OrderHistory';

const ProfilePage = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-person-circle display-4 text-primary"></i>
              </div>
              <h6 className="card-title">Account Menu</h6>
            </div>
            <div className="list-group list-group-flush">
              <a href="#profile" className="list-group-item list-group-item-action active">
                <i className="bi bi-person me-2"></i>
                Profile
              </a>
              <a href="#orders" className="list-group-item list-group-item-action">
                <i className="bi bi-bag me-2"></i>
                Order History
              </a>
              <a href="#addresses" className="list-group-item list-group-item-action">
                <i className="bi bi-geo-alt me-2"></i>
                Addresses
              </a>
              <a href="#security" className="list-group-item list-group-item-action">
                <i className="bi bi-shield-check me-2"></i>
                Security
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-9">
          <div id="profile" className="mb-4">
            <Profile />
          </div>
          
          <div id="orders">
            <OrderHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
