
const express = require('express');
const router = express.Router();


const { registerUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', authMiddleware, registerUser);

module.exports = router;

