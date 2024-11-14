// const express = require('express');
// const { updateUserRole } = require('../controllers/updateUserRoleController'); // Adjust the path as necessary

// const router = express.Router();

// // Route to update user role
// router.put('/upd', updateUserRole); // Use PUT method for updating

// module.exports = router;

const express = require('express');
const { updateUserRole } = require('../controllers/updateUserRoleController'); // Adjust the path as necessary

const router = express.Router();

// Route to update user role
router.put('/', updateUserRole); // Use PUT method for updating

module.exports = router; // Make sure this line is included
