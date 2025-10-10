const express = require('express');
const router = express.Router();

// 1. Import the controller function that contains the logic for sending the broadcast.
const { sendBroadcastAlert } = require('../controllers/notification.controller');

// 2. Import our authentication middleware to protect this powerful feature.
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/notifications/broadcast
// @desc    Send a broadcast SMS alert to a specific district.
// @access  Private
// 3. Define the route.
// - It responds to POST requests at the '/broadcast' path.
// - It is a protected route. The 'authMiddleware' runs first to verify the user.
//   (For a real app, you would create a special 'adminMiddleware' to ensure only
//    authorized officials can send broadcasts).
// - If the user is valid, it then calls the 'sendBroadcastAlert' function.
router.post('/broadcast', authMiddleware, sendBroadcastAlert);

module.exports = router;

