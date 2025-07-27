const { Cart, cartSchema } = require('../models/cart');

const addToCart = async (req, res) => {
    try {
        console.log("REQ HEADERS:", req.headers);

        const { productId, quantity, size } = req.body;

        // Step 1: Find the user's cart
        let cart = await Cart.findOne({ user: req.user.id });
        let add = []
        if(productId && quantity && size)
            add = [{ product: productId, quantity, size }];
        else if(productId && quantity)
            add = [{ product: productId, quantity }];

        if (!cart) {
        // Step 2: No cart exists → create one
        cart = new Cart({
            user: req.user.id,
            products: add
        });

        } else {
        // Step 3: Check if product already exists (any size)
        const existingIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingIndex > -1) {
            // Step 4: Overwrite quantity and size
            cart.products[existingIndex].quantity = quantity;
            if (typeof size === "string" && size.length > 0) {
                cart.products[existingIndex].size = size;
            } else {
                // Remove size if not provided
                delete cart.products[existingIndex].size;
            }
        } else {
            // Step 5: Add new product entry
            cart.products.push({ product: productId, quantity, ...(size ? { size } : {}) });
        }
        }
        // Step 6: Save the cart
        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const getCart = async (req, res) => {
    try {
        // Step 1: Find the user's cart
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Step 2: Return the cart
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = {
    addToCart,
    getCart
}