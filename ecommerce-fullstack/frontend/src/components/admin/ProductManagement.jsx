import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import Modal from '../common/Modal';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts([
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 79.99,
          stockQuantity: 50,
          category: 'Electronics',
          status: 'Active'
        },
        {
          id: '2',
          name: 'Smartphone Case',
          price: 25.00,
          stockQuantity: 100,
          category: 'Accessories',
          status: 'Active'
        }
      ]);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(products.filter(p => p.id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus me-2"></i>
          Add Product
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.category}</td>
                    <td>
                      <span className={`badge ${product.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleEdit(product)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" defaultValue={editingProduct?.name} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" defaultValue={editingProduct?.price} />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input type="number" className="form-control" defaultValue={editingProduct?.stockQuantity} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" defaultValue={editingProduct?.category}>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManagement;
