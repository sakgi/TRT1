// src/api/ticket.js
const express = require('express');
const multer = require('multer');
const { createTicket } = require('../controllers/ticketController');
const { verifyToken } = require('../middlewares/authorization');
const router = express.Router();

// Multer config for file upload
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Route to create ticket with file upload
router.post('/raise-ticket', upload.single('attachment'), verifyToken, createTicket);

module.exports = router;
