const express = require('express');
const router = express.Router();

const { 
    getCurrentUserProfile, 
    updateUserProfile,
    updateLocation 
} = require('../controllers/user.controller');

const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/users/me
// @desc    Get the current authenticated user's profile data
// @access  Private
router.get('/me', authMiddleware, getCurrentUserProfile);

// @route   PUT /api/users/me
// @desc    Update the current authenticated user's profile details (e.g., name, email)
// @access  Private
router.put('/me', authMiddleware, updateUserProfile);

// ------------------------------------------------------------------
// 🚨 NEW ROUTE: Location Update
// ------------------------------------------------------------------
// @route   PUT /api/users/location
// @desc    Authenticated user updates their current GPS location for SOS/mapping
// @access  Private
router.put('/location', authMiddleware, updateLocation);

module.exports = router;