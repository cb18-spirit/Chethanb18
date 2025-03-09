const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { protect } = require("../middleware/authMiddleware");

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
        res.status(500).json({ message: error.message });
    }
});

router.get("/", protect, async (req, res) => {
    try {
        const chats = await Chat.find({ members: req.user.id }).populate("members", "name").sort({ updatedAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
