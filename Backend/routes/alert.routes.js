
const express = require('express');
const router = express.Router();

const {
  createAlert,
  getAllAlerts,
} = require('../controllers/alert.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllAlerts);

router.post('/', authMiddleware, createAlert);

module.exports = router;

