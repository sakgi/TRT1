const express = require('express');
const { getAssignedTasks } = require('../controllers/assignedTasksController');
const router = express.Router();

// Define the route to fetch assigned tasks
router.get('/', getAssignedTasks);

module.exports = router;
