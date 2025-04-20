import { useCart } from '../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;