const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Drink']
  },
  image: {
    type: String,
    default: 'default-food.jpg'
  },
  ingredients: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  spicyLevel: {
    type: Number,
    min: 0,
    max: 3,
    default: 0
  }
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;