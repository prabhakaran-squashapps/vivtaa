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
    setAddedToCart(false); // Reset added state when component mounts
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
        navigate('/cart');
      }, 1000);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="nav-buttons">
        <button onClick={() => navigate('/products')} className="back-btn">← Back to Products</button>
        <button onClick={() => navigate('/cart')} className="cart-btn">Go to Cart ({getTotalItems()})</button>
      </div>
      
      <div className="product-container">
        <div className="product-images">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
        
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          <div className="brand">{product.brand}</div>
          
          <div className="rating">
            <span className="stars">★★★★☆</span>
            <span className="rating-count">({product.rating})</span>
          </div>
          
          <div className="price">₹{product.price}</div>
          
          <div className="description">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="specifications">
            <h3>Product Details</h3>
            <p>{product.specifications}</p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`add-cart ${addedToCart ? 'added' : ''}`}
          >
            {addedToCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;