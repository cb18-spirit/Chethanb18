const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Security Headers Middleware
app.use(helmet());

// ✅ CORS Configuration
const allowedOrigins = ["http://localhost:3000", "https://yourfrontend.com"]; // Update with your frontend URL
app.use(cors({
    origin: allowedOrigins,
    credentials: true,  // Allows cookies
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
}));

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Rate Limiting for Login Route (5 requests in 15 minutes)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many login attempts. Please try again later.",
});

app.use("/api/auth/login", loginLimiter);  // Apply rate limiting to login route

// ✅ Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Invalid input data" });
    }
    res.status(500).json({ message: "Something went wrong" });
});
const logger = require('./utils/logger');

// Log a successful server startup
logger.info('Server is running on port 5000');

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
