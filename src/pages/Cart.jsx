import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  if (items.length === 0) {
    return (
      <div className='cart-page'>
        <div className='container'>
          <h1>Shopping Cart</h1>
          <div className='empty-cart'>
            <p>Your cart is empty</p>
            <Link
              to='/products'
              className='continue-shopping-btn'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  return (
    <div className='cart-page'>
      <div className='container'>
        <h1>Shopping Cart</h1>

        <div className='cart-content'>
          <div className='cart-items'>
            {items.map((item) => (
              <div
                key={item.id}
                className='cart-item'
              >
                <img
                  src={item.image}
                  alt={item.title}
                />
                <div className='item-details'>
                  <h3>{item.title}</h3>
                  <p className='item-price'>${item.price}</p>
                </div>
                <div className='quantity-controls'>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className='quantity-btn'
                  >
                    -
                  </button>
                  <span className='quantity'>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className='quantity-btn'
                  >
                    +
                  </button>
                </div>
                <div className='item-total'>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='remove-btn'
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h3>Order Summary</h3>
            <div className='summary-row'>
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className='summary-row'>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className='summary-row total'>
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <button className='checkout-btn'>Proceed to Checkout</button>

            <button
              onClick={clearCart}
              className='clear-cart-btn'
            >
              Clear Cart
            </button>

            <Link
              to='/products'
              className='continue-shopping-link'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
