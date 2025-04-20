const express = require('express');
const menuController = require('../controllers/menu.controller');

const router = express.Router();

router.get('/', menuController.getMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post('/', menuController.createMenuItem);

module.exports = router;

// backend/routes/order.routes.js
const express = require('express');
const orderController = require('../controllers/order.controller');

const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/history/:phoneNumber', orderController.getOrderHistory);
orderRouter.get('/:id', orderController.getOrderById);

module.exports = orderRouter;