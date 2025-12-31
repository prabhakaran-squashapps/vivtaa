import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/products')} 
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              ← Continue Shopping
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          
          <div className="max-w-md mx-auto text-center bg-white p-12 rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <button 
              onClick={() => navigate('/products')} 
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/products')} 
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              ← Continue Shopping
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({cart.length} items)</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cart.map((item, index) => (
                <div key={item.id} className={`flex items-center p-6 ${index !== cart.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-contain border border-gray-200 rounded flex-shrink-0"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-red-600">₹{item.price}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden mx-4">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-white min-w-[50px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-lg font-bold text-gray-900 min-w-[80px] text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-blue-600 hover:text-red-600 transition-colors p-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-red-600">₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => alert('Checkout functionality coming soon!')} 
                className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={clearCart} 
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;