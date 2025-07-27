const {User, userSchema} = require('../models/user');
const RefreshToken = require('../models/refresh-token');
const InvalidToken = require('../models/invalid-tokens');
const transporter = require('../config/nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try{
        const { email, password, fullName, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            role: role || 'user' // Default to 'user' if no role is provided
        });

        // Save the user to the database
        await newUser.save();
        // Send a welcome email
        await transporter.sendMail({
            to: email,
            subject: 'Welcome to Vendora',
            text: `Hello ${fullName},\n\nThank you for registering on Vendora! We're excited to have you on board.\n\nBest regards,\nThe Vendora Team`
        });
        
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}
const loginUser = async (req, res) => {
    try {
        console.log('Received body:', req.body);
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);  
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        accessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_ACC_SECRET,
            { expiresIn: '3d' }
        );
        refreshToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_ACC_SECRET,
            { expiresIn: '1d' }
        );
        // Save the refresh token in the database
        const newRefreshToken = new RefreshToken({
            refreshToken,
            userId: user._id
        });
        await newRefreshToken.save();
        // Return the access token and refresh token
        return res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            id: user._id,
            fullName: user.fullName,
            role: user.role
        });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const logoutUser = async (req, res) => {
    try {

        await InvalidToken.insertOne({
            accessToken: req.accessToken.value,
            userId: req.user.id,
            expirationTime: req.accessToken.exp
        })


        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ 
            place: "logoutUser",
            message: error.message }) 
    }
}

module.exports = {
    registerUser, loginUser, logoutUser
};