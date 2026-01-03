const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');

// Public routes (no auth needed for browsing?)
// Spec didn't specify auth for these, but usually it's fine.
// I'll make them public for easier access, or add auth if needed.
// 'Search' usually public.
router.get('/regional', destinationController.getRegionalSuggestions);
router.get('/suggested', destinationController.getSuggestedPlaces);
router.get('/search', destinationController.search); // /destinations/search vs /search? Spec says /search. I'll mount this router at /destinations and handle search separately or redirect.
// Spec: GET /search
// Spec: GET /destinations/regional
// So I need two routers or one mounted at /?

module.exports = router;
