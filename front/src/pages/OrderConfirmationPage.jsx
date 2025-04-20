import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { orderService } from '../services/api';

function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrderDetails(orderId);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);
  
  if (loading) {
    return <p>Loading order details...</p>;
  }
  
  if (error) {
    return <p className="error-message">{error}</p>;
  }
  
  if (!order) {
    return <p>Order not found.</p>;
  }
  
  return (
    <div className="order-confirmation-page">
      <div className="confirmation-message">
        <h2>Order Confirmed!</h2>
        <p>Thank you for your order. Your order has been received.</p>
        <p>Order ID: <strong>{order.id}</strong></p>
      </div>
      
      <div className="order-details">
        <h3>Order Details</h3>
        <div className="order-info">
          <p>
            <strong>Name:</strong> {order.User?.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {order.User?.phoneNumber}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Amount:</strong> ${Number(order.totalAmount).toFixed(2)}
          </p>
        </div>
        
        <h4>Items</h4>
        <div className="order-items">
          {order.OrderItems?.map((item) => (
            <div key={item.id} className="order-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${Number(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="confirmation-actions">
        <Link to="/menu" className="back-to-menu-btn">
          Order More
        </Link>
        <Link to="/order-history" className="view-orders-btn">
          View Order History
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;