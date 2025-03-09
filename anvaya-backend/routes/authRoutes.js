const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const { loginUser, getProfile } = require("../controllers/userController"); // ✅ Ensure correct import
const { protect } = require('../middleware/authMiddleware'); // ✅ Ensure correct import
const { generateToken } = require('../utils/jwtUtils'); // ✅ Ensure correct import
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const router = express.Router();

// @route    POST /api/auth/register
// @desc     Register new user
// @access   Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('usn', 'USN is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('branch', 'Branch is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, usn, phone, course, branch, year } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, usn, phone, course, branch, year });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // ✅ Generate JWT token properly
        const token = generateToken(user.id);
        res.json({ token, user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST /api/auth/login
// @desc     Login user & get token
// @access   Public
router.post("/login", loginUser);

// @route    GET /api/auth/me
// @desc     Get logged-in user details
// @access   Private (Requires JWT)
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// 🔹 Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click this link to reset your password: ${resetURL}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ msg: "Reset link sent to email" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route    GET /api/auth/profile
// @desc     Get user profile
// @access   Private
router.get('/profile', protect, getProfile);

// @route    POST /api/auth/reset-password/:token
// @desc     Reset password
// @access   Public
router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() } // Ensure token is valid
        });

        if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

        // ✅ LOG: Check incoming password
        console.log("Entered New Password:", password);

        // ✅ LOG: Check old hashed password
        console.log("Old Hashed Password:", user.password);

        // Hash the new password properly
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // ✅ LOG: Check new hashed password
        console.log("New Hashed Password:", user.password);

        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.json({ msg: "Password reset successful" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route    POST /api/auth/refresh-token
// @desc     Refresh access token
// @access   Public
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        const user = await verifyRefreshToken(refreshToken);

        if (!user) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        const newAccessToken = generateAccessToken(user.id);
        res.json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// @route    POST /api/auth/logout
// @desc     Logout user & revoke refresh token
// @access   Private
router.post('/logout', protect, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { refreshToken: null }); // Clear stored refresh token
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
