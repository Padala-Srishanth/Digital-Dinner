import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/api';

function OrderHistoryPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    
    // Clear error when field is edited
    if (error) {
      setError(null);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    
    try {
      setLoading(true);
      setSearched(true);
      const data = await orderService.getOrderHistory(phoneNumber);
      setOrders(data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setOrders([]);
        setError('No orders found for this phone number');
      } else {
        setError('Failed to load order history. Please try again later.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="order-history-page">
      <h2>Order History</h2>
      
      <div className="search-form-container">
        <form onSubmit={handleSubmit} className="phone-number-form">
          <div className="form-group">
            <label htmlFor="phoneNumber">Enter your phone number to view your orders</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter your phone number"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Find Orders'}
          </button>
        </form>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {searched && !loading && orders.length > 0 && (
        <div className="orders-list">
          <h3>Your Orders</h3>
          {orders.map((order) => (
            <div key={order.id} className="order-item-card">
              <div className="order-header">
                <div>
                  <p className="order-id">Order #{order.id}</p>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status">{order.status}</div>
              </div>
              
              <div className="order-summary">
                <p>
                  <strong>Total:</strong> ${Number(order.totalAmount).toFixed(2)}
                </p>
                <p>
                  <strong>Items:</strong> {order.OrderItems.length}
                </p>
              </div>
              
              <Link to={`/order-confirmation/${order.id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      
      {searched && !loading && orders.length === 0 && !error && (
        <p>No orders found for this phone number.</p>
      )}
    </div>
  );
}

export default OrderHistoryPage;