const express = require('express');
const { Cart } = require('../models/cart');
const { ensureAuthenticated, authorize } = require('../middlewares/auth-middlewares');
const { addToCart, getCart } = require('../controllers/cart-controllers');

const router = express.Router();

// Add a product to the cart
router.post('/add', ensureAuthenticated, addToCart);

// Get the user's cart
router.get('/', ensureAuthenticated, getCart);


module.exports = router;

