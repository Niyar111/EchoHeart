const express = require('express');
const router = express.Router();

// --- THE FIX ---
// This line ensures all three functions are correctly imported from the controller.
// Make sure all these function names (`createSos`, `getAllSos`, `requestRescue`)
// exactly match the export names in your `sos.controller.js` file.
const {
  createSos,
  getAllSos,
  requestRescue
} = require('../controllers/sos.controller');

// Import our authentication middleware to protect the routes
const authMiddleware = require('../middleware/authMiddleware');

// --- CRITICAL ROUTE FOR PERSONAL EMERGENCIES ---
// @route   POST /api/sos/request-rescue
// @desc    A user sends a distress signal to local rescue teams
// @access  Private
router.post('/request-rescue', authMiddleware, requestRescue);


// --- Routes for general, area-wide alerts ---
// @route   POST /api/sos
// @desc    Create a general area alert (e.g., "river is rising")
// @access  Private
router.post('/', authMiddleware, createSos);

// @route   GET /api/sos
// @desc    Get all active SOS alerts
// @access  Public
router.get('/', getAllSos);

module.exports = router;

