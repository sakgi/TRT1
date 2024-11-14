const express = require('express');
const { getEngineers } = require('../controllers/totalEngineersController');
const router = express.Router();

router.get('/', getEngineers);

module.exports = router;

