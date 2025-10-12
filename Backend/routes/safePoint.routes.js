const express = require('express');
const router = express.Router();

// Import middleware and controller
const authMiddleware = require('../middleware/authMiddleware');
// 🚨 NEW: Import the adminMiddleware which is required for moderation routes
const adminMiddleware = require('../middleware/adminMiddleware'); 
const safePointController = require('../controllers/safePoint.controller');

// ------------------------------------------------------------------
// Route 1: POST /api/safe-points
// User adds a new Safe Point
// ------------------------------------------------------------------
// @route   POST /api/safe-points
// @desc    User creates a new Safe Point on the map
// @access  Private (Must be an authenticated user)
router.post('/', authMiddleware, safePointController.addSafePoint);

// ------------------------------------------------------------------
// Route 2: GET /api/safe-points/nearby
// Users search for verified Safe Points near their location
// ------------------------------------------------------------------
// @route   GET /api/safe-points/nearby
// @desc    Get verified Safe Points near the user's current location (using query params: lat, lon)
// @access  Public (Allows non-logged-in users to see safe spots, which is good for quick access)
router.get('/nearby', safePointController.getNearbySafePoints);

// ------------------------------------------------------------------
// Route 3: GET /api/safe-points/unverified (Admin/Org route for moderation)
// ------------------------------------------------------------------
// @route   GET /api/safe-points/unverified
// @desc    Get all unverified points for official review
// @access  Private (Admin/Organization only)
router.get('/unverified', authMiddleware, adminMiddleware, safePointController.getUnverifiedPoints);


module.exports = router;