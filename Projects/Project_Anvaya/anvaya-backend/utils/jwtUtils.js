const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    try {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        });
    } catch (err) {
        console.error("Error generating access token:", err.message);
        return null;
    }
};

const generateRefreshToken = (userId) => {
    try {
        return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
        });
    } catch (err) {
        console.error("Error generating refresh token:", err.message);
        return null;
    }
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error("Error verifying access token:", err.message);
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        console.error("Error verifying refresh token:", err.message);
        return null;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
