const express = require('express');
const driverController = require('../controllers/driverController');
const auth = require('../middleware/auth');

const router = express.Router();

// Become a driver
router.post('/become-driver', auth, driverController.becomeDriver);

// Update driver status
router.put('/status', auth, driverController.updateDriverStatus);

// Add vehicle
router.post('/vehicle', auth, driverController.addVehicle);

// Get driver profile
router.get('/profile', auth, driverController.getDriverProfile);

// Update driver profile
router.put('/profile', auth, driverController.updateDriverProfile);

// Get driver stats
router.get('/stats', auth, driverController.getDriverStats);

// Get nearby rides
router.get('/nearby-rides', auth, driverController.getNearbyRides);

module.exports = router;
