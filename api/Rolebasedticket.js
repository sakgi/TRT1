const express = require('express');
const { fetchAllTicketsByRole } = require('../controllers/RolebasedticketController');
const router = express.Router();

// Define the route to fetch all tickets based on user roles
router.get('/', fetchAllTicketsByRole);

module.exports = router;
