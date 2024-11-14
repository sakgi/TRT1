const express = require('express');
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');
const router = express.Router();

// Registration endpoint
router.post('/register', registerUser);

// Login and forgot-password routes
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;