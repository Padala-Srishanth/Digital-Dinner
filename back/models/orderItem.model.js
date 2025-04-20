const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');
const Order = require('./order.model');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  menuItemId: {
    type: DataTypes.STRING,  // MongoDB ID reference
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  timestamps: true
});

// Define relationship
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

module.exports = OrderItem;