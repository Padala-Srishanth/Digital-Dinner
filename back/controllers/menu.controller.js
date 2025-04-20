const MenuItem = require('../models/menuItem.model');

// Get all menu items or filter by category
exports.getMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const menuItems = await MenuItem.find(filter);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu item', error: error.message });
  }
};

// Add a new menu item (bonus feature)
exports.createMenuItem = async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
};