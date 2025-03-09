const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(express.json());
app.use(cors());

// WebSocket Setup
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Join Chat Room
    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    // Send & Receive Messages
    socket.on("sendMessage", (messageData) => {
        const { chatId, sender, text } = messageData;
        io.to(chatId).emit("receiveMessage", messageData); // Broadcast to room
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
