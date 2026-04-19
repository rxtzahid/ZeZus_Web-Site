const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Dashboard stats
router.get('/dashboard', auth, roleCheck('admin'), adminController.getDashboardStats);

// User management
router.get('/users', auth, roleCheck('admin'), adminController.getAllUsers);
router.get('/users/:userId', auth, roleCheck('admin'), adminController.getUserDetails);
router.put('/users/:userId/suspend', auth, roleCheck('admin'), adminController.suspendUser);
router.put('/users/:userId/activate', auth, roleCheck('admin'), adminController.activateUser);

// Driver verification
router.put('/drivers/:driverId/verify', auth, roleCheck('admin'), adminController.verifyDriver);

// Rides management
router.get('/rides', auth, roleCheck('admin'), adminController.getAllRides);

// Parcels management
router.get('/parcels', auth, roleCheck('admin'), adminController.getAllParcels);

// Revenue report
router.get('/revenue', auth, roleCheck('admin'), adminController.getRevenueReport);

module.exports = router;
