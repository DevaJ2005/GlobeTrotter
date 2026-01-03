const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
const authenticateToken = require('../middleware/auth.middleware');

// Protected routes? Feed might be public, but liking definitely auth.
// Spec doesn't strictly say, but usually Feed is visible. Interactions need auth.
// I'll secure all for now or just interactions.
// Securing all is safer for "me" text in comments.

router.get('/feed', communityController.getFeed);
router.post('/posts/:id/like', authenticateToken, communityController.likePost);
router.get('/posts/:id/comments', communityController.getComments);
router.post('/posts/:id/comments', authenticateToken, communityController.addComment);

module.exports = router;
