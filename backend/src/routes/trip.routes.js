const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const authenticateToken = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(authenticateToken);

// Trips
router.get('/', tripController.getTrips);
router.post('/', tripController.createTrip);
router.get('/:id', tripController.getTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

// Sections
router.get('/:id/sections', tripController.getSections);
router.post('/:id/sections', tripController.addSection);
router.put('/:id/sections/:sectionId', tripController.updateSection);
router.delete('/:id/sections/:sectionId', tripController.deleteSection);

// Activities
router.get('/:id/activities', tripController.getActivities);
router.post('/:id/activities', tripController.addActivity);

// Itinerary (combined view)
router.get('/:id/itinerary', tripController.getItinerary);

module.exports = router;
