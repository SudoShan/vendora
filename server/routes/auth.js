const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/auth-controllers');
const { sendOtp, verifyOtp } = require('../controllers/otp-controllers');
const {ensureAuthenticated} = require('../middlewares/auth-middlewares');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', ensureAuthenticated, logoutUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;

