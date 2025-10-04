const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { triggerSOS } = require('../controllers/emergency.controller');

router.post('/sos', authMiddleware, triggerSOS);

module.exports = router;

