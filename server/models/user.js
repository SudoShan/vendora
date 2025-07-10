const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user',
        required: true
    }
},
{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};
