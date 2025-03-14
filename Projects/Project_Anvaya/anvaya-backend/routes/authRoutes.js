const express = require("express");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwtUtils");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwtUtils");

// 🔹 Nodemailer Setup
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS,  // Your app password
    },
});

// 🔹 Registration Route (With Email Verification)
// Registration Route (Fix for Missing Verification Token)
router.post("/register", async (req, res) => {
    const { name, email, password, usn, phone, course, branch, year } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // 🔹 Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        user = new User({
            name, email, password, usn, phone, course, branch, year,
            verificationToken,  // ✅ Save the token in the database
            isVerified: false
        });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();  // ✅ Ensure token is saved in DB

        // Send verification email
        const verifyURL = `http://localhost:3000/verify-email/${verificationToken}`;
        const mailOptions = {
            to: user.email,
            subject: "Verify Your Email",
            text: `Click the link to verify your email: ${verifyURL}`,
        };
        await transporter.sendMail(mailOptions);

        res.status(201).json({ msg: "Verification email sent. Please check your inbox." });

    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).send("Server error");
    }
});


// 🔹 Email Verification Route
router.get("/verify-email/:token", async (req, res) => {
    const { token } = req.params;
    console.log("Received Token:", token);

    const user = await User.findOne({ verificationToken: token });
    console.log("User Found:", user);

    if (!user) {
        return res.status(400).json({ msg: "Invalid or expired verification token" });
    }

    user.verificationToken = null;
    await user.save();

    res.json({ msg: "Email verified successfully!" });
});


// 🔹 Login Route (Prevents Unverified Users)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({ msg: "Please verify your email before logging in." });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Store refresh token in user DB
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.json({ accessToken, user });

    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
