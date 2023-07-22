const express = require('express');
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require('../controllers/user.controller');
const { isSignedIn, isAuthenticated, isAdmin } = require('../middlewares/auth')
const { getOrderId, createOrder, getOrderStatus, updateOrderStatus } = require('../controllers/order.controller');
const { updateStock } = require('../controllers/product.controller');

router.param("userId", getUserById)
router.param("orderId", getOrderId)

router.post('/order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)
router.get('/order/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put('/order/:orderId/status/userId', isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)

module.exports = router;