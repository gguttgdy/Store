import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProductSearch = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (query.trim()) {
      newSearchParams.set('q', query.trim());
    } else {
      newSearchParams.delete('q');
    }
    
    navigate(`/products?${newSearchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
