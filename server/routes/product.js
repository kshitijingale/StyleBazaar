const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user.controller');
const { getCategoryById } = require('../controllers/category.controller');
const { getProductById, createProduct, getProduct, photo, updateProduct, getProducts } = require('../controllers/product.controller');
const { isSignedIn, isAuthenticated, isAdmin } = require('../middlewares/auth')

router.param("userId", getUserById)
router.param("categoryId", getCategoryById)
router.param("productId", getProductById)

router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct)
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct)
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId', photo)
router.get('/products', getProducts)

module.exports = router;