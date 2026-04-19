const express = require('express');
const rideController = require('../controllers/rideController');
const auth = require('../middleware/auth');

const router = express.Router();

// Request a ride
router.post('/request', auth, rideController.requestRide);

// Accept a ride (driver)
router.post('/:rideId/accept', auth, rideController.acceptRide);

// Start a ride (driver)
router.post('/:rideId/start', auth, rideController.startRide);

// Complete a ride
router.post('/:rideId/complete', auth, rideController.completeRide);

// Cancel a ride
router.post('/:rideId/cancel', auth, rideController.cancelRide);

// Get ride history
router.get('/history', auth, rideController.getRideHistory);

// Get ride details
router.get('/:rideId', auth, rideController.getRideDetails);

module.exports = router;
