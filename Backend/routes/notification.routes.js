const express = require('express');
const router = express.Router();

const { sendBroadcastAlert } = require('../controllers/notification.controller');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); 


router.post('/broadcast', authMiddleware, adminMiddleware, sendBroadcastAlert);

module.exports = router;

