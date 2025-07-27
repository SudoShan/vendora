const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imageUploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append original file extension
    }
});

//Check file filter to accept only images
const checkFileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
}); // 'image' is the field name in the form

module.exports = {
    uploadImageMiddleware: upload.single('image'), // Middleware to handle single image upload
};