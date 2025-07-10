const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/auth-controllers');
const { sendOtp } = require('../controllers/otp-controllers');
const {ensureAuthenticated} = require('../middlewares/auth-middlewares');

const router = express.Router();
router.use(express.json());

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', ensureAuthenticated, logoutUser);
router.post('/send-otp', sendOtp);

module.exports = router;

