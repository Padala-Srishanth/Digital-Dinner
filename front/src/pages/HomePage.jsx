import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Welcome to The Digital Diner</h2>
        <p>Delicious food, just a few clicks away!</p>
        <Link to="/menu" className="cta-button">
          View Our Menu
        </Link>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <h3>Browse Our Menu</h3>
          <p>Explore our wide range of appetizers, main courses, desserts, and drinks.</p>
        </div>
        <div className="feature">
          <h3>Easy Online Ordering</h3>
          <p>Simply add items to your cart and place your order for pickup.</p>
        </div>
        <div className="feature">
          <h3>Track Your Orders</h3>
          <p>Check your order history and status with your phone number.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;