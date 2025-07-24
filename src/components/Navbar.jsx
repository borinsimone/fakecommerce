import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link
          to='/'
          className='navbar-brand'
        >
          <h2>FakeCommerce</h2>
        </Link>
        <div className='link-container'>
          <Link
            to='/'
            className='navbar-link'
          >
            Home
          </Link>
          <Link
            to='/products'
            className='navbar-link'
          >
            Products
          </Link>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-actions'>
            <Link
              to='/cart'
              className='navbar-link cart-link'
            >
              🛒 Cart
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
                {/* <span className='user-name'>{user.name}</span> */}
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
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
