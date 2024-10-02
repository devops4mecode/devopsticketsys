

// routes/tickets.js
const express = require('express');
const app = express();
const router = express.Router();
const Ticket = require('../models/ticket');
const Comment = require('../models/comment')
// Middleware to parse JSON bodies
app.use(express.json());

// Get all tickets
router.get('/', async (req, res) => {
    const tickets = await Ticket.findAll();
    res.json(tickets);
});

// Get a specific ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Ensure that comments are parsed before sending to the frontend
        let comments = [];
        if (ticket.comments) {
            try {
                comments = JSON.parse(ticket.comments); // Parse the JSON string into an array
            } catch (error) {
                console.error('Error parsing comments:', error.message);
                comments = []; // Fallback to an empty array if parsing fails
            }
        }

        res.json({ ...ticket.toJSON(), comments });
    } catch (error) {
        console.error('Error fetching ticket:', error.message);
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
});

// // Create a new ticket
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if the title and description are provided
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        const ticket = await Ticket.create({ title, description });
        res.json({ success: true, ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

// Update a ticket
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        ticket.title = title;
        ticket.description = description;

        await ticket.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating ticket:', error.message);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});


// Delete a ticket
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Ticket.destroy({ where: { id } });
    res.json({ success: true });
});

// Get comments for a ticket
// Ensure comments are an array
router.get('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    let comments = [];
    try {
        // Parse comments if they are stored as a string
        comments = JSON.parse(ticket.comments || '[]');
        if (!Array.isArray(comments)) {
            comments = [];
        }
    } catch (error) {
        console.error('Error parsing comments:', error);
    }

    res.json(comments);
});

// Add a comment to a ticket
router.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    console.log('Received comment:', comment); // Debugging log

    if (!comment) {
        return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        let comments = [];
        if (ticket.comments) {
            try {
                comments = JSON.parse(ticket.comments);
            } catch (error) {
                console.error('Error parsing comments:', error.message);
                // If parsing fails, reset comments to an empty array
                comments = [];
            }
        }

        // Add the new comment
        comments.push(comment);

        // Update the ticket with the new comments array
        ticket.comments = JSON.stringify(comments);

        await ticket.save();

        res.json({ success: true, comments });
    } catch (error) {
        console.error('Error updating comments:', error.message);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

module.exports = router;
