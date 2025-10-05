const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/authMiddleware');

const uploadMiddleware = require('../middleware/uploadMiddleware');

router.post('/', authMiddleware, uploadMiddleware, createPost);

router.get('/', getAllPosts);

module.exports = router;

