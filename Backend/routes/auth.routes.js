const express = require('express');
const router = express.Router();
const { register, requestLoginOtp, verifyOtp } = require('../controllers/auth.controller');

// complete registration (submit profile after phone verification)
const { completeRegistration } = require('../controllers/auth.controller');

// @route   POST /api/auth/register
// @desc    1. Registers new user data & sends initial OTP
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    2. Requests OTP for an existing, verified user
// @access  Public
router.post('/login', requestLoginOtp);

// @route   POST /api/auth/verify
// @desc    3. Verifies the OTP, clears OTP fields, and returns the JWT
// @access  Public
router.post('/verify', verifyOtp);
// @route   POST /api/auth/complete
// @desc    Complete the registration by submitting profile details after phone verification
// @access  Public (requires phone to be verified)
router.post('/complete', completeRegistration);

module.exports = router;