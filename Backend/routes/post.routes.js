const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
} = require('../controllers/post.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllPosts);

router.post('/', authMiddleware, createPost);

module.exports = router;

