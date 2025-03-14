
require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

// Import Middleware & Routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { protect } = require("./middleware/authMiddleware");
const { loginLimiter, registerLimiter } = require("./middleware/rateLimitMiddleware");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());

// Routes with Rate Limiting
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// WebSocket Setup
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Join Chat Room
    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    // Send & Receive Messages
    socket.on("sendMessage", (messageData) => {
        io.to(messageData.chatId).emit("receiveMessage", messageData);
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
        server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
