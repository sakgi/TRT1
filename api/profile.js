const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const { verifyToken } = require('../middlewares/authorization');  // Import the middleware

const router = express.Router();

// Route to fetch the user profile (with token verification)
router.get('/', getUserProfile);

// Route to update the user profile (with token verification)
router.put('/', updateUserProfile);

module.exports = router;
