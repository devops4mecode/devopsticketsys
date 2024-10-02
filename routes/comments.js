const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Fetch comments for a ticket
router.get('/:ticketId/comments', async (req, res) => {
    const { ticketId } = req.params;
    const comments = await Comment.findAll({ where: { ticketId } });
    res.json(comments);
});

// Add a new comment to a ticket
router.post('/:ticketId/comments', async (req, res) => {
    const { ticketId } = req.params;
    const { text } = req.body;
    const comment = await Comment.create({ ticketId, text });
    res.json(comment);
});

module.exports = router;
