import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>The Digital Diner</h1>
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/order-history">Order History</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart ({itemCount})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;