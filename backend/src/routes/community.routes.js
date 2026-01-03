const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
const authenticateToken = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Public routes
router.get('/feed', communityController.getFeed);

// Protected routes
router.post('/posts', authenticateToken, upload.single('image'), communityController.createPost);
router.post('/posts/:id/like', authenticateToken, communityController.likePost);
router.get('/posts/:id/comments', communityController.getComments);
router.post('/posts/:id/comments', authenticateToken, communityController.addComment);

module.exports = router;
