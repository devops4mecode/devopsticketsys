const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../config/auth');
const Ticket = require('../models/ticket'); // Assuming you have a Ticket model

// Route to create a new ticket
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTicket = await Ticket.create({
            title,
            description,
            userId: req.user.id
        });
        res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'An error occurred while creating the ticket.' });
    }
});

module.exports = router;
