const { User, Order, OrderItem } = require('../models');
const mongoose = require('mongoose');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { name, phoneNumber, items, totalAmount } = req.body;
    
    // Find or create user
    let user = await User.findOne({ where: { phoneNumber } });
    
    if (!user) {
      user = await User.create({ name, phoneNumber });
    }
    
    // Create order
    const order = await Order.create({
      userId: user.id,
      totalAmount,
      status: 'pending'
    });
    
    // Create order items
    const orderItems = items.map(item => ({
      orderId: order.id,
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    await OrderItem.bulkCreate(orderItems);
    
    res.status(201).json({
      orderId: order.id,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

// Get order history by phone number
exports.getOrderHistory = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    
    const user = await User.findOne({ where: { phoneNumber } });
    
    if (!user) {
      return res.status(404).json({ message: 'No orders found for this phone number' });
    }
    
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [
        { model: OrderItem }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error: error.message });
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: OrderItem },
        { model: User }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};