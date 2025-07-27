const express = require('express');
const {Product} = require('../models/product');
const {ensureAuthenticated, authorize} = require('../middlewares/auth-middlewares');
const {addProduct, updateProduct, getProds, getSingleProduct} = require('../controllers/product-controllers');

const router = express.Router();


// Create a new product
router.post('/', ensureAuthenticated, authorize('seller'), addProduct);

//Get all with filters
router.get('/', getProds);


/* // Update an existing product
router.put('/:productId', ensureAuthenticated, authorize('seller'), updateProduct);*/

//Get a single product by ID
router.get('/:productid', getSingleProduct); 




module.exports = router;