import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (items.length === 0) {
      setErrors({ form: 'Your cart is empty' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const orderData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        items: items,
        totalAmount: totalPrice
      };
      
      const response = await orderService.createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to confirmation page
      navigate(`/order-confirmation/${response.orderId}`);
    } catch (error) {
      setErrors({
        form: 'There was an error placing your order. Please try again.'
      });
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      
      <div className="checkout-container">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="contact-info">
          <h3>Contact Information</h3>
          <form onSubmit={handleSubmit}>
            {errors.form && <p className="error-message">{errors.form}</p>}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="place-order-btn"
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;