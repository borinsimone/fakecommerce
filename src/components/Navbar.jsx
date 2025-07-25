import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link
          to='/'
          className='navbar-brand'
          onClick={closeMenu}
        >
          <h2>FakeCommerce</h2>
        </Link>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className='link-container'>
            <Link
              to='/'
              className='navbar-link'
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to='/products'
              className='navbar-link'
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to='/categories'
              className='navbar-link'
              onClick={closeMenu}
            >
              Categories
            </Link>
          </div>

          <div className='navbar-actions'>
            <Link
              to='/cart'
              className='navbar-link cart-link'
              onClick={closeMenu}
            >
              🛒
              {getCartItemsCount() > 0 && (
                <span className='cart-badge'>{getCartItemsCount()}</span>
              )}
            </Link>

            {user ? (
              <div className='user-menu'>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='user-avatar'
                />
                <button
                  onClick={handleLogout}
                  className='logout-btn'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to='/login'
                className='navbar-link login-btn'
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Overlay per chiudere il menu */}
        {isMenuOpen && (
          <div
            className='menu-overlay'
            onClick={closeMenu}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
