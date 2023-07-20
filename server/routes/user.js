const express = require('express');
const { getUserById, getUser, updateUser, getOrders } = require('../controllers/user.controller');
const { isSignedIn, isAuthenticated } = require('../middlewares/auth')
const router = express.Router();

router.param("userId", getUserById)
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, getOrders)

module.exports = router;