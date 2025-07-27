const cloudinary = require('../config/cloudinary');

const uploadToCloundinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'vendora/images',
            use_filename: true,
            unique_filename: false
        });
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Image upload failed');
    }
}

module.exports = {
    uploadToCloundinary
};