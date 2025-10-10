const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescue.controller'); // You will need to create this file
const authMiddleware = require('../middleware/authMiddleware'); // Your JWT middleware
const adminMiddleware = require('../middleware/adminMiddleware'); // Recommended for management routes

// NOTE: You will need to create the adminMiddleware to ensure only authorized users 
// (role: 'admin' or role: 'organization' with special permissions) can manage this list.

// @route   POST /api/rescue/add
// @desc    Add a new rescue organization contact (SDRF, NDRF, etc.)
// @access  Private (Admin/Organization only)
router.post('/add', authMiddleware, adminMiddleware, rescueController.addContact);

// @route   GET /api/rescue/all
// @desc    Get all active rescue contacts (Filtered by isActive=true)
// @access  Private (Any authenticated user) or Public (depending on app logic)
router.get('/all', authMiddleware, rescueController.getAllContacts);

// @route   GET /api/rescue/:district
// @desc    Get rescue contacts relevant to a specific district
// @access  Private (Any authenticated user)
router.get('/:district', authMiddleware, rescueController.getContactsByDistrict);

// @route   PUT /api/rescue/:id
// @desc    Update a specific rescue contact's details or activation status
// @access  Private (Admin/Organization only)
router.put('/:id', authMiddleware, adminMiddleware, rescueController.updateContact);

// @route   DELETE /api/rescue/:id
// @desc    Deactivate a rescue contact (soft delete)
// @access  Private (Admin/Organization only)
router.delete('/:id', authMiddleware, adminMiddleware, rescueController.deactivateContact);

module.exports = router;