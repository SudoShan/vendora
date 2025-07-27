const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth-middlewares');
const { uploadImage } = require('../controllers/image-controllers');
const { uploadImageMiddleware } = require('../middlewares/upload-middlewares');

const router = express.Router();
router.post('/upload', ensureAuthenticated, uploadImageMiddleware, uploadImage);

module.exports = router;