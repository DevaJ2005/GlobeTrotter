const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.post('/avatar', authenticateToken, upload.single('avatar'), userController.updateAvatar);

module.exports = router;
