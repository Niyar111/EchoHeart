const express = require('express');
const router = express.Router();

const { createSos, getAllSos } = require('../controllers/sos.controller');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createSos);

router.get('/', getAllSos);

module.exports = router;
