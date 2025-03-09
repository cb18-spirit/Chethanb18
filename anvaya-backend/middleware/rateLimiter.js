const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: { msg: "Too many login attempts. Try again in 10 minutes." },
    headers: true,
});

module.exports = { loginLimiter };
