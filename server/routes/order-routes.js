const express = require('express');
const { addOrder, getUserOrders } = require('../controllers/order-controllers');
const { ensureAuthenticated } = require('../middlewares/auth-middlewares');
const router = express.Router();

router.post('/add', ensureAuthenticated, addOrder);
router.get('/user-orders', ensureAuthenticated, getUserOrders);

module.exports = router;