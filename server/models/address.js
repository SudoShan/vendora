const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addresses: [
        {
            address: {
                type: String,
                required: true,
                trim: true
            },
            label: {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
});

const Address = mongoose.model('Address', addressSchema);
module.exports = { Address, addressSchema };