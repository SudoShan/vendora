const {Address} = require('../models/address');


const getUserAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const doc = await Address.findOne({ user: userId });
        if (!doc) {
            return res.status(200).json({ addresses: [] });
        }
        res.status(200).json({ addresses: doc.addresses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses', error });
    }
};

const addUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, label } = req.body;

        const existingAddress = await Address.findOne({ user: userId, 'addresses.label': label });
        if (existingAddress) {
            return res.status(400).json({ message: 'Address with this label already exists' });
        }

        const userAddress = await Address.findOne({ user: userId });
        if (userAddress) {
            userAddress.addresses.push({ address, label });
            await userAddress.save();
            return res.status(200).json(userAddress);
        } else {
            const newAddress = new Address({
                user: userId,
                addresses: [{ address, label }]
            });
            await newAddress.save();
            res.status(201).json(newAddress);
        }

    } catch (error) {
        res.status(500).json({ message: 'Error adding address', error });
    }
};

const updateUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { label, newAddress } = req.body;

        const existingAddress = await Address.findOne({ user: userId, 'addresses.label': label });
        if (!existingAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        existingAddress.addresses = existingAddress.addresses.map(addr =>
            addr.label === label ? { label: label, address: newAddress } : addr
        );
        await existingAddress.save();
        res.status(200).json(existingAddress);
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error });
    }
};

const deleteUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { label } = req.body;

        const userAddress = await Address.findOne({ user: userId });
        if (!userAddress) {
            return res.status(404).json({ message: 'No addresses found for this user' });
        }

        userAddress.addresses = userAddress.addresses.filter(addr => addr.label !== label);
        await userAddress.save();

        res.status(200).json(userAddress);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address', error });
    }
};

module.exports = {
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress
};