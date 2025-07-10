const express = require('express');
const { Image } = require('../models/image');
const { ensureAuthenticated } = require('../middlewares/auth-middlewares');
const { uploadImageMiddleware } = require('../middlewares/upload-middlewares');
const { uploadImage } = require('../controllers/image-controllers');
const router = express.Router();

router.post('/upload', ensureAuthenticated, uploadImageMiddleware, uploadImage)

module.exports = router;