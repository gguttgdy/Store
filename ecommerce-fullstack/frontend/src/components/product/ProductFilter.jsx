import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';

const ProductFilter = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    brand: searchParams.get('brand') || ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const newSearchParams = new URLSearchParams(searchParams);
    
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    
    navigate(`/products?${newSearchParams.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brand: ''
    });
    navigate('/products');
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Price Range</label>
        <div className="row g-2">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Brand</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter brand name"
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        />
      </div>

      <button
        className="btn btn-outline-secondary w-100"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;
