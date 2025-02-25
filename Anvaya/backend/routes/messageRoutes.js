const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// Send a message
router.post('/', async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;

        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get chat history between two users
router.get('/:user1/:user2', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.params.user1, receiver: req.params.user2 },
                { sender: req.params.user2, receiver: req.params.user1 }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
