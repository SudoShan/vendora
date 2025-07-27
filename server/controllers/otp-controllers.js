// controllers/authController.js
const Otp = require('../models/otp');
const {User, userSchema} = require('../models/user');
const transporter = require('../config/nodemailer');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: 'Email already registered' });

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await Otp.deleteMany({ email }); // Remove old OTPs
  await Otp.create({ email, otp, expiresAt });
  try {
    await transporter.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Hello! You are just one step away from entering the world of Vendora. Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email });

  if (!record || record.otp !== otp || record.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  await Otp.deleteMany({ email }); // Invalidate OTP
  res.json({ verified: true });
};
