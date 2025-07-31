const { Order } = require('../models/order')


const addOrder = async (req, res) => {
    try{
        console.log("Adding order for user:", req.user.id);
        console.log("Request body:", req.body);
        const userId = req.user.id;
        const { products, totalAmount, address } = req.body;
        console.log("Products:", products);
        console.log("Total Amount:", totalAmount);  
        console.log("Address:", address);

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No products provided' });
        }

        if (totalAmount <= 0) {
            return res.status(400).json({ message: 'Total amount must be greater than zero' });
        }

        const newOrder = new Order({
            user: userId,
            products,
            totalAmount,
            address
        });

        await newOrder.save();
        res.status(201).json(newOrder);

    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ message: 'Error adding order', error });
    }
}

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('products.product', 'name price image');

        if (!orders || orders.length === 0) {
            return res.status(200).json({ orders: [] });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};


module.exports = {
    addOrder,
    getUserOrders
};
