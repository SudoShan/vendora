const express = require('express');
const { Cart } = require('../models/cart');
const { ensureAuthenticated, authorize } = require('../middlewares/auth-middlewares');
const { addToCart, getCart, removeFromCart } = require('../controllers/cart-controllers');

const router = express.Router();

// Add a product to the cart
router.post('/add', ensureAuthenticated, addToCart);

// Remove a product from the cart
router.post('/remove', ensureAuthenticated, removeFromCart);

// Get the user's cart
router.get('/', ensureAuthenticated, getCart);


module.exports = router;

