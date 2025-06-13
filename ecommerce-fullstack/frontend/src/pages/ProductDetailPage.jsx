import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return <LoadingSpinner text="Loading product details..." />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/products" className="text-decoration-none">Products</a>
          </li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="main-image mb-3">
                <img
                  src={product.imageUrls?.[selectedImage] || '/placeholder-image.jpg'}
                  alt={product.name}
                  className="img-fluid w-100"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </div>
              
              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="row g-2 px-3 pb-3">
                  {product.imageUrls.map((image, index) => (
                    <div key={index} className="col-3">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className={`img-fluid rounded cursor-pointer ${selectedImage === index ? 'border border-primary' : ''}`}
                        style={{ height: '80px', objectFit: 'cover' }}
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="ps-lg-4">
            <h1 className="mb-3">{product.name}</h1>
            
            {product.brand && (
              <p className="text-muted mb-2">Brand: {product.brand}</p>
            )}
            
            <div className="mb-3">
              <span className="h3 text-primary fw-bold">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mb-4">
              {product.stockQuantity > 0 ? (
                <span className="badge bg-success fs-6">
                  <i className="bi bi-check-circle me-1"></i>
                  In Stock ({product.stockQuantity} available)
                </span>
              ) : (
                <span className="badge bg-danger fs-6">
                  <i className="bi bi-x-circle me-1"></i>
                  Out of Stock
                </span>
              )}
            </div>

            <div className="mb-4">
              <h5>Description</h5>
              <p className="text-muted">{product.description}</p>
            </div>

            {product.stockQuantity > 0 && (
              <div className="row g-3 mb-4">
                <div className="col-auto">
                  <label htmlFor="quantity" className="form-label">Quantity:</label>
                  <select
                    id="quantity"
                    className="form-select"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{ width: '80px' }}
                  >
                    {[...Array(Math.min(product.stockQuantity, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col">
                  <label className="form-label d-block">&nbsp;</label>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleAddToCart}
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            )}

            <div className="border-top pt-4">
              <div className="row text-center">
                <div className="col-4">
                  <i className="bi bi-truck text-primary fs-4 d-block mb-2"></i>
                  <small className="text-muted">Free Shipping</small>
                </div>
                <div className="col-4">
                  <i className="bi bi-arrow-return-left text-primary fs-4 d-block mb-2"></i>
                  <small className="text-muted">Easy Returns</small>
                </div>
                <div className="col-4">
                  <i className="bi bi-shield-check text-primary fs-4 d-block mb-2"></i>
                  <small className="text-muted">Secure Payment</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
