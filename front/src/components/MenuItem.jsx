import { useCart } from '../context/CartContext';

function MenuItem({ item }) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(item);
  };
  
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="menu-item-details">
        <h3>{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-price">${item.price.toFixed(2)}</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;