const express = require("express");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwtUtils"); // Import JWT utilities
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
    const { name, email, password, usn, phone, course, branch, year } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, usn, phone, course, branch, year });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const accessToken = jwtUtils.generateAccessToken(user._id);
        const refreshToken = await jwtUtils.generateRefreshToken(user._id);

        res.json({ accessToken, refreshToken, user });

    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const accessToken = jwtUtils.generateAccessToken(user._id);
        const refreshToken = await jwtUtils.generateRefreshToken(user._id);

        res.json({ accessToken, refreshToken });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Server error");
    }
});

// Get User Data (Protected Route)
router.get("/me", protect, (req, res) => {
    res.json(req.user);
});

// Refresh Token Route
router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        const newAccessToken = jwtUtils.generateAccessToken(decoded.id);
        const newRefreshToken = await jwtUtils.generateRefreshToken(decoded.id);

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

    } catch (err) {
        console.error("Error refreshing token:", err.message);
        res.status(500).json({ message: "Error refreshing token" });
    }
});

module.exports = router;
