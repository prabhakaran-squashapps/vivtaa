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

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, searchTerm ? 300 : 0);

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <button 
        className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 text-white border-none px-3 py-2 rounded text-xs cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        📂 Filters
      </button>
      
      {/* Sidebar - Categories */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-0 left-0 w-64 h-full bg-white z-40 transition-transform duration-300 shadow-lg lg:shadow-none border-r border-gray-200`}>
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <button className="text-gray-600 text-xl" onClick={() => setShowSidebar(false)}>✕</button>
        </div>
        
        <div className="p-4">
          <h3 className="hidden lg:block text-lg font-semibold mb-4 text-gray-800 border-b-2 border-blue-600 pb-2">Categories</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                handleCategoryChange('');
                setShowSidebar(false);
              }}
              className={`px-4 py-3 text-left border border-gray-200 rounded cursor-pointer text-sm transition-all ${
                selectedCategory === '' ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:border-blue-600'
              }`}
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
                className={`px-4 py-3 text-left border border-gray-200 rounded cursor-pointer text-sm transition-all ${
                  selectedCategory === category ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:border-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              {selectedCategory || (searchTerm ? `Search Results` : 'All Products')}
            </h1>
            
            {/* Clear Filters */}
            {(selectedCategory || searchTerm) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-500 text-white border-none rounded cursor-pointer text-sm hover:bg-red-600"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Info */}
          <div className="mb-6 text-sm text-gray-600">
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
            <div className="text-red-500 text-center p-8">{error}</div>
          )}

          {/* Products Grid */}
          {products.length === 0 && !loading ? (
            <div className="text-center text-gray-600 p-12">
              <h3 className="text-xl mb-2">No products found</h3>
              <p>Try selecting a different category or search term</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 p-4 flex-wrap">
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-2 border border-gray-300 bg-white text-gray-800 rounded cursor-pointer text-sm min-w-[40px] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-2 border rounded cursor-pointer text-sm min-w-[40px] ${
                        pagination.currentPage === i + 1 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-2 border border-gray-300 bg-white text-gray-800 rounded cursor-pointer text-sm min-w-[40px] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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