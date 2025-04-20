import axios from 'axios';

// Replace process.env with import.meta.env in Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const menuService = {
  // Get all menu items or filter by category
  getMenuItems: async (category = null) => {
    const params = category ? { category } : {};
    const response = await apiClient.get('/menu', { params });
    return response.data;
  },
  
  // Get a single menu item details
  getMenuItem: async (id) => {
    const response = await apiClient.get(`/menu/${id}`);
    return response.data;
  }
};

export const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },
  
  // Get order history by phone number
  getOrderHistory: async (phoneNumber) => {
    const response = await apiClient.get(`/orders/history/${phoneNumber}`);
    return response.data;
  },
  
  // Get order details by ID
  getOrderDetails: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  }
};