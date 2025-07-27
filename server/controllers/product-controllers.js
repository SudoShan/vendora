const {Product} = require('../models/product');

const addProduct = async (req, res) => {
    try{
        const {name, description, price, discount, category, brand, quantity, sizes, images} = req.body;
        const userId = req.user.id;
        // Validate required fields
        if (!name || !description || !price || !category || !brand || !quantity) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            discount: discount || 0, // Default to 0 if not provided
            category,
            brand: brand || 'Unknown', // Default to 'Unknown' if not provided
            sizes: sizes || [], // Default to empty array if not provided
            quantity,
            images: images || [], // Default to empty array if not provided
            user: userId
        });
        // Save the product to the database
        await newProduct.save();
        return res.status(201).json({ message: 'Product added successfully', product: newProduct });
    }
    catch(error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}
// Update an existing product

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, discount, category, brand, sizes, images } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !brand) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) { 
            return res.status(404).json({ message: 'Product not found' });
        }
        // Update product fields
        product.name = name;
        product.description = description;
        product.price = price;
        product.discount = discount || 0; // Default to 0 if not provided
        product.category = category;
        product.brand = brand;
        product.sizes = sizes || []; // Default to empty array if not provided
        product.images = images || []; // Default to empty array if not provided
        // Save the updated product
        await product.save();
        return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getProds = async (req, res) => {
    try {
        console.log('Fetching products with filters:', req.query);
        let { category, brand, minPrice, maxPrice } = req.query;
        const filters = {};

        if (category) {
            const categories = Array.isArray(category)
                ? category
                : String(category).split(',');
            filters.category = { $in: categories };
        }
        if (brand) {
            const brands = Array.isArray(brand)
                ? brand
                : String(brand).split(',');
            filters.brand = { $in: brands };
        }
        // Price filter
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice);
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
        }
        console.log('Filters:', filters);
        // Find products matching filters
        const products = await Product.find(filters);  
        console.log('Products found:', products);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { productid } = req.params;
        // Find the product by ID
        const product = await Product.findById(productid);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    addProduct,
    updateProduct,
    getProds,
    getSingleProduct
};