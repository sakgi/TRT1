
// /api/fetchAssignedTaskRoutes.js

const express = require('express');
const { fetchAssignedTickets } = require('../controllers/fetchAssignedTicketsController');
const router = express.Router();

// Define route for fetching assigned tickets
router.get('/fetchAssignedTickets', fetchAssignedTickets);

module.exports = router;
