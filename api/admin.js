const express = require('express');
const multer = require('multer');

// const { db, storage } = require('../config/adminSDK');
const { createAdminTicket, fetchAllTickets } = require('../controllers/adminController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }); // Use multer for handling file uploads

// POST request to create a ticket
router.post('/create', upload.single('attachment'), createAdminTicket);

// GET request to fetch all tickets
router.get('/get-list', fetchAllTickets);

module.exports = router;
