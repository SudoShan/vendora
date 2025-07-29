const express = require('express');
const { getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress } = require('../controllers/address-controllers');
const { ensureAuthenticated } = require('../middlewares/auth-middlewares');

const router = express.Router();

router.get('/', ensureAuthenticated, getUserAddresses);
router.post('/', ensureAuthenticated, addUserAddress);
router.put('/', ensureAuthenticated, updateUserAddress);
router.delete('/', ensureAuthenticated, deleteUserAddress);

module.exports = router;