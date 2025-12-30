import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">
          {product.name}
        </h3>
        <p className="product-brand">{product.brand}</p>
        <div className="product-footer">
          <span className="product-price">
            ${product.price}
          </span>
          <div className="product-rating">
            <span>★</span>
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;