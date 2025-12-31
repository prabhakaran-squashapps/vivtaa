import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isProductsPage = location.pathname === '/products';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (isProductsPage) {
      if (value.trim()) {
        navigate(`/products?search=${encodeURIComponent(value.trim())}`, { replace: true });
      } else {
        navigate('/products', { replace: true });
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
          <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600 no-underline order-1">
            FITZDO
          </Link>
          
          {user && (
            <div className="w-full lg:flex-1 lg:max-w-2xl lg:mx-8 order-3 lg:order-2">
              <form onSubmit={handleSearch} className="flex items-center bg-white border-2 border-gray-200 rounded overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border-none outline-none text-sm lg:text-base"
                />
                <button type="submit" className="px-3 lg:px-4 py-2 lg:py-3 bg-blue-600 text-white border-none cursor-pointer text-sm lg:text-base hover:bg-blue-700">
                  🔍
                </button>
              </form>
            </div>
          )}
          
          <nav className="flex items-center gap-4 lg:gap-6 order-2 lg:order-3">
            {user ? (
              <>
                <Link to="/products" className="text-gray-700 no-underline hover:text-blue-600 text-sm lg:text-base">Products</Link>
                <Link to="/cart" className="relative text-gray-700 no-underline hover:text-blue-600 text-sm lg:text-base">
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                
                <div className="relative">
                  <div 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {getUserInitials(user.email)}
                    </div>
                    <span className="hidden lg:block text-sm text-gray-700 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                      {user.email}
                    </span>
                  </div>
                  
                  {showUserMenu && (
                    <div className="absolute top-full right-0 bg-white border border-gray-200 rounded shadow-md min-w-30 z-50 mt-1">
                      <button 
                        onClick={handleLogout} 
                        className="w-full px-4 py-3 bg-none border-none text-left cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 no-underline hover:text-blue-600 text-sm lg:text-base">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded no-underline hover:bg-blue-700 text-sm lg:text-base">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;