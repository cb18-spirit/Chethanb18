const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Create a new chat
router.post("/new", protect, async (req, res) => {
    const { userId } = req.body;

    if (!userId || req.user.id === userId) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        let chat = await Chat.findOne({ members: { $all: [req.user.id, userId] } }).populate("members", "name");

        if (!chat) {
            chat = await Chat.create({ members: [req.user.id, userId], messages: [] });
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error("Chat Creation Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all chats for the logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const chats = await Chat.find({ members: req.user.id }).populate("members", "name").sort({ updatedAt: -1 });
        res.json(chats);
    } catch (error) {
        console.error("Chat Fetch Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Send a message in a specific chat
router.post("/:chatId/message", protect, async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Message text is required" });
    }

    try {
        const chat = await Chat.findById(req.params.chatId);

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        chat.messages.push({
            sender: req.user.id,
            text,
            timestamp: new Date()
        });

        chat.updatedAt = new Date();
        await chat.save();

        res.status(200).json(chat);
    } catch (error) {
        console.error("Message Send Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
