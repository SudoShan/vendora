const mongoose = require('mongoose');

const invalidTokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expirationTime: {
        type: Date,
        required: true
    }
});

const InvalidToken = mongoose.model('InvalidToken', invalidTokenSchema);

module.exports = InvalidToken;
