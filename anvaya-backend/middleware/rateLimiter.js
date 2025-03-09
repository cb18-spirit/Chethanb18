const rateLimit = require("express-rate-limit");

// Limit login attempts to 5 within a 10-minute window
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { msg: "Too many login attempts. Please try again in 10 minutes." },
    headers: true, // Send rate limit info in response headers
});

module.exports = { loginLimiter };
