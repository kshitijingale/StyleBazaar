const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user.controller');
const { getCategoryById, createCategory, getCategory, getCategories, updateCategory, removeCategory } = require('../controllers/category.controller');
const { isSignedIn, isAuthenticated, isAdmin } = require('../middlewares/auth')

router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

router.post('/category/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)
router.get('/category/:categoryId', getCategory)
router.get('/categories', getCategories)
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory)
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory)


module.exports = router;