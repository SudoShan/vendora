const { Image } = require('../models/image');
const fs = require('fs');

const {uploadToCloundinary} = require('../helpers/cloudinary-helper');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload the image to Cloudinary
        const {url, publicId} = await uploadToCloundinary(req.file.path);

        // Create a new image document
        const image = new Image({
            url,
            publicId,
            uploadedBy: req.user.id
        });
        await image.save();
        console.log('Image uploaded successfully:', image);
        // Delete the local file after uploading to Cloudinary
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting local file:', err);
            }
        });

        res.status(201).json({
            message: 'Image uploaded successfully',
            url: image.url,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Image upload failed', error });
    }
};

module.exports = {
    uploadImage
};