import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalProducts: 0 });
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productAPI.getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params: { category?: string; search?: string; page?: number } = { page: pagination.currentPage };
        if (selectedCategory) params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;
        
        const response = await productAPI.getProducts(params);
        setProducts(response.data.products || response.data);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } catch (err: any) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, searchTerm ? 300 : 0); // 300ms delay for search, immediate for category

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm, pagination.currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    if (searchTerm) {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setSearchParams({});
  };

  const handlePageChange = async (page: number) => {
    setLoading(true);
    try {
      const params: { category?: string; search?: string; page?: number } = { page };
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      
      const response = await productAPI.getProducts(params);
      setProducts(response.data.products || response.data);
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
    } catch (err: any) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
    window.scrollTo(0, 0);
  };

  if (loading && products.length === 0) return <LoadingSpinner />;

  return (
    <div style={{display: 'flex', minHeight: 'calc(100vh - 80px)'}}>
      {/* Mobile Filter Button */}
      <button 
        className="mobile-filter-btn"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        📂 Filters
      </button>
      
      {/* Left Sidebar - Categories */}
      <div className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Categories</h3>
          <button className="sidebar-close" onClick={() => setShowSidebar(false)}>✕</button>
        </div>
        <div className="category-list">
          <button
            onClick={() => {
              handleCategoryChange('');
              setShowSidebar(false);
            }}
            className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                handleCategoryChange(category);
                setShowSidebar(false);
              }}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container" style={{padding: '2rem 1rem'}}>
          {/* Page Header */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0}}>
              {selectedCategory || (searchTerm ? `Search Results` : 'All Products')}
            </h1>
            
            {/* Clear Filters */}
            {(selectedCategory || searchTerm) && (
              <button
                onClick={clearFilters}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Info */}
          <div style={{marginBottom: '1.5rem', color: '#666', fontSize: '0.875rem'}}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <span>
                {pagination.totalProducts} product{pagination.totalProducts !== 1 ? 's' : ''} found
                {selectedCategory && ` in "${selectedCategory}"`}
                {searchTerm && ` for "${searchTerm}"`}
                {pagination.totalPages > 1 && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
              </span>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="error" style={{textAlign: 'center', padding: '2rem'}}>{error}</div>
          )}

          {/* Products Grid */}
          {products.length === 0 && !loading ? (
            <div style={{textAlign: 'center', color: '#666', padding: '3rem'}}>
              <h3>No products found</h3>
              <p>Try selecting a different category or search term</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="page-btn"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`page-btn ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="page-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;