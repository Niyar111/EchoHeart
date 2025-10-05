const express = require('express');
const router = express.Router();

const { createBusiness, getAllBusinesses } = require('../controllers/business.controller');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createBusiness);

router.get('/', getAllBusinesses);

module.exports = router;

