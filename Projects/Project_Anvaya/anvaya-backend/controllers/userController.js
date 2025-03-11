const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwtUtils");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt for:", email); // Log email received
        console.log("Password received:", password); // Log password received

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        console.log("User found:", user); // Log user details

        // Compare entered password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password); // Direct comparison using bcrypt.compare
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        console.log("Password match successful");

        // Generate JWT tokens (access & refresh tokens)
        const accessToken = generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        // Save refresh token in the user document
        user.refreshToken = refreshToken;
        await user.save();

        // Set refresh token in a secure cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to 'true' for production
            sameSite: "strict",
        });

        // Return the access token and user details
        res.json({
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send("Server error");
    }
};

module.exports = { loginUser };
