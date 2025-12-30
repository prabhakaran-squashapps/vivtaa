import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { productAPI } from '../services/api';

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
    
    // Real-time search - update URL as user types
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
  };

  // Sync search input with URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  // Get user initials for avatar
  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo">
            FITZDO
          </Link>
          
          {/* Search Bar - Only show when user is logged in */}
          {user && (
            <div className="search-container" style={{ flex: '0 1 400px' }}>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  🔍
                </button>
              </form>
            </div>
          )}
          
          <nav className="nav" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <Link to="/products">Products</Link>
                <Link to="/cart" style={{ position: 'relative' }}>
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="cart-badge">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                
                {/* User Avatar with Dropdown */}
                <div 
                  className="user-menu"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="user-avatar">
                    {getUserInitials(user.email)}
                  </div>
                  <span className="user-name">{user.email}</span>
                  
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={handleLogout} className="logout-btn">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn btn-primary">
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