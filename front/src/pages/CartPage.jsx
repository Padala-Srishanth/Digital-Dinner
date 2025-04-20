import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="cta-button">
          Browse Menu
        </Link>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;