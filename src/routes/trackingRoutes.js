const express = require('express');
const trackingController = require('../controllers/trackingController');
const auth = require('../middleware/auth');

const router = express.Router();

// Track a ride
router.get('/ride/:rideId', auth, trackingController.trackRide);

// Track a parcel
router.get('/parcel/:parcelId', auth, trackingController.trackParcel);

// Update driver location
router.post('/location', auth, trackingController.updateLocation);

// Get driver location
router.get('/driver/:driverId/location', auth, trackingController.getDriverLocation);

// Get tracking history
router.get('/history', auth, trackingController.getTrackingHistory);

module.exports = router;
