const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Access denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.sub) {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        req.user = await User.findById(decoded.sub).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found, invalid token" });
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = { protect };
