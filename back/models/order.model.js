const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');
const User = require('./user.model');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'preparing', 'ready', 'completed', 'cancelled']]
    }
  },
  pickupTime: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true
});

// Define relationship
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = Order;