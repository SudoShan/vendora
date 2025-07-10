const express = require('express');
const {Product} = require('../models/product');
const {ensureAuthenticated, authorize} = require('../middlewares/auth-middlewares');
const {addProduct, updateProduct} = require('../controllers/product-controllers');

const router = express.Router();


// Create a new product
router.post('/', ensureAuthenticated, addProduct);

// Update an existing product
router.put('/:productId', ensureAuthenticated, updateProduct);





module.exports = router;