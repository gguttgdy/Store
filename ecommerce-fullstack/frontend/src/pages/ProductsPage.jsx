import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductFilter from '../components/product/ProductFilter';
import ProductSearch from '../components/product/ProductSearch';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = Object.fromEntries(searchParams);
        const data = await productService.getAllProducts(params);
        setProducts(data.content || data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
          <h4>Error Loading Products</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h6 className="mb-0">Search</h6>
            </div>
            <div className="card-body">
              <ProductSearch />
            </div>
          </div>
          
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h6 className="mb-0">Filters</h6>
            </div>
            <div className="card-body">
              <ProductFilter />
            </div>
          </div>
        </div>
        
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Products</h2>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">
                {products.length} products found
              </span>
              <select className="form-select" style={{ width: 'auto' }}>
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
                <option>Name: Z to A</option>
              </select>
            </div>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-muted"></i>
              <h4 className="mt-3">No products found</h4>
              <p className="text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
