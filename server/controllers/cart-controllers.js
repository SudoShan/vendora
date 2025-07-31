const { Cart, cartSchema } = require('../models/cart');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;

        // Step 1: Find the user's cart
        let cart = await Cart.findOne({ user: req.user.id });
        let add = []
        if(productId && quantity && size)
            add = [{ product: productId, quantity, size }];
        else if(productId && quantity)
            add = [{ product: productId, quantity }];

        if (!cart) {

            cart = new Cart({
                user: req.user.id,
                products: add
            });

        } else {
            const existingIndex = cart.products.findIndex(
                (item) => item.product.toString() === productId
            );

            if (existingIndex > -1) {
                cart.products[existingIndex].quantity = quantity;
                if (typeof size === "string" && size.length > 0) {
                    cart.products[existingIndex].size = size;
                } else {
                    delete cart.products[existingIndex].size;
                }
            } else {
                cart.products.push({ product: productId, quantity, ...(size ? { size } : {}) });
            }
        }
        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        // Step 1: Find the user's cart
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Step 2: Remove the product from the cart
        cart.products = cart.products.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
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
    getCart,
    removeFromCart
}