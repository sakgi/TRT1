const express = require('express');
const { fetchUserTickets } = require('../controllers/UserTicketTableController');
const router = express.Router();

// Route to fetch tickets for the logged-in user
router.get('/:userId', fetchUserTickets);

module.exports = router; // Ensure this is exporting the router correctly
