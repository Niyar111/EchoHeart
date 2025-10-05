const express = require('express');
const router = express.Router();

const { getCurrentUserProfile, updateUserProfile } = require('../controllers/user.controller');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, getCurrentUserProfile);

router.put('/me', authMiddleware, updateUserProfile);

module.exports = router;

