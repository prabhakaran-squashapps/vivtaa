import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <button onClick={() => navigate('/products')} className="back-btn">← Continue Shopping</button>
          <h1>Shopping Cart</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <button onClick={() => navigate('/products')} className="shop-btn">Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button onClick={() => navigate('/products')} className="back-btn">← Continue Shopping</button>
        <h1>Shopping Cart ({cart.length} items)</h1>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>
              
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              
              <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
              
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">×</button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{getTotalPrice().toFixed(2)}</span>
          </div>
          <button onClick={() => alert('Checkout functionality coming soon!')} className="checkout-btn">Proceed to Checkout</button>
          <button onClick={clearCart} className="clear-btn">Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;