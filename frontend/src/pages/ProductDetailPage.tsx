import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/LoadingSpinner';

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  specifications: string;
  rating: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addToCart, getTotalItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await productAPI.getProduct(id);
        setProduct(response.data);
      } catch (err: any) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    setAddedToCart(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200">
        <button 
          onClick={() => navigate('/products')} 
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded text-sm hover:bg-gray-50 transition-colors"
        >
          ← Back to Products
        </button>
        <button 
          onClick={() => navigate('/cart')} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Go to Cart ({getTotalItems()})
        </button>
      </div>
      
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-64 object-contain"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-blue-600 text-sm font-medium uppercase tracking-wide">
                {product.brand}
              </p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-gray-600 font-medium">({product.rating}/5)</span>
            </div>
            
            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-3xl font-bold text-red-600">₹{product.price}</span>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded"></span>
                About this item
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            {/* Specifications */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded"></span>
                Product Details
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.specifications}</p>
            </div>
            
            {/* Add to Cart Button */}
            <div className="pt-4">
              <button 
                onClick={handleAddToCart}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-md hover:shadow-lg'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;