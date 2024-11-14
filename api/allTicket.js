const express = require('express');
const { fetchUserTickets } = require('../controllers/allTicketController');
const router = express.Router();

// Define route to fetch all tickets
router.get('/', fetchUserTickets);

module.exports = router;
