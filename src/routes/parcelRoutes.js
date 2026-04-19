const express = require('express');
const parcelController = require('../controllers/parcelController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a parcel
router.post('/create', auth, parcelController.createParcel);

// Accept a parcel (driver)
router.post('/:parcelId/accept', auth, parcelController.acceptParcel);

// Pickup a parcel
router.post('/:parcelId/pickup', auth, parcelController.pickupParcel);

// Deliver a parcel
router.post('/:parcelId/deliver', auth, parcelController.deliverParcel);

// Cancel a parcel
router.post('/:parcelId/cancel', auth, parcelController.cancelParcel);

// Get parcel history
router.get('/history', auth, parcelController.getParcelHistory);

// Get parcel details
router.get('/:parcelId', auth, parcelController.getParcelDetails);

// Get nearby parcels (driver)
router.get('/nearby-parcels', auth, parcelController.getNearbyParcels);

module.exports = router;
