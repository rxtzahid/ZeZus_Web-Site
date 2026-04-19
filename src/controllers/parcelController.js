const Parcel = require('../models/Parcel');
const Driver = require('../models/Driver');
const User = require('../models/User');
const { calculateParcelFare } = require('../utils/calculateFare');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.createParcel = async (req, res) => {
  try {
    const { parcelDetails, pickup, delivery, deliveryType, scheduledDate } = req.body;

    const parcel = new Parcel({
      senderId: req.userId,
      parcelDetails,
      pickup,
      delivery,
      deliveryType,
      scheduledDate,
      status: 'pending',
    });

    await parcel.save();
    sendSuccessResponse(res, 'Parcel created successfully', parcel, 201);
  } catch (error) {
    sendErrorResponse(res, 'Failed to create parcel', error.message, 500);
  }
};

exports.acceptParcel = async (req, res) => {
  try {
    const { parcelId } = req.params;

    const parcel = await Parcel.findByIdAndUpdate(
      parcelId,
      { driverId: req.userId, status: 'accepted' },
      { new: true }
    );

    if (!parcel) {
      return sendErrorResponse(res, 'Parcel not found', null, 404);
    }

    sendSuccessResponse(res, 'Parcel accepted successfully', parcel, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to accept parcel', error.message, 500);
  }
};

exports.pickupParcel = async (req, res) => {
  try {
    const { parcelId } = req.params;

    const parcel = await Parcel.findByIdAndUpdate(
      parcelId,
      { status: 'picked-up', pickupTime: new Date() },
      { new: true }
    );

    if (!parcel) {
      return sendErrorResponse(res, 'Parcel not found', null, 404);
    }

    sendSuccessResponse(res, 'Parcel picked up successfully', parcel, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to pick up parcel', error.message, 500);
  }
};

exports.deliverParcel = async (req, res) => {
  try {
    const { parcelId, distance, weight, rating, comment } = req.body;

    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return sendErrorResponse(res, 'Parcel not found', null, 404);
    }

    // Calculate fare
    const fareDetails = calculateParcelFare(weight, distance, parcel.deliveryType);

    const updatedParcel = await Parcel.findByIdAndUpdate(
      parcelId,
      {
        status: 'delivered',
        deliveryTime: new Date(),
        fare: fareDetails,
        'rating.score': rating,
        'rating.comment': comment,
      },
      { new: true }
    );

    // Update sender total spent
    await User.findByIdAndUpdate(parcel.senderId, {
      $inc: { totalSpent: fareDetails.total },
    });

    // Update driver earnings
    await Driver.findByIdAndUpdate(parcel.driverId, {
      $inc: { totalEarnings: fareDetails.total, totalRides: 1 },
    });

    sendSuccessResponse(res, 'Parcel delivered successfully', updatedParcel, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to deliver parcel', error.message, 500);
  }
};

exports.cancelParcel = async (req, res) => {
  try {
    const { parcelId } = req.params;
    const { reason } = req.body;

    const parcel = await Parcel.findByIdAndUpdate(
      parcelId,
      { status: 'cancelled', cancelReason: reason },
      { new: true }
    );

    if (!parcel) {
      return sendErrorResponse(res, 'Parcel not found', null, 404);
    }

    sendSuccessResponse(res, 'Parcel cancelled successfully', parcel, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to cancel parcel', error.message, 500);
  }
};

exports.getParcelHistory = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const parcels = await Parcel.find({ senderId: req.userId })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Parcel.countDocuments({ senderId: req.userId });

    sendSuccessResponse(res, 'Parcel history retrieved successfully', { parcels, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve parcel history', error.message, 500);
  }
};

exports.getParcelDetails = async (req, res) => {
  try {
    const { parcelId } = req.params;

    const parcel = await Parcel.findById(parcelId)
      .populate('senderId driverId');

    if (!parcel) {
      return sendErrorResponse(res, 'Parcel not found', null, 404);
    }

    sendSuccessResponse(res, 'Parcel details retrieved successfully', parcel, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve parcel details', error.message, 500);
  }
};

exports.getNearbyParcels = async (req, res) => {
  try {
    // Get driver location and find nearby parcel requests
    const driver = await Driver.findOne({ userId: req.userId });

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    // Find pending parcels near driver location (5km radius)
    const nearbyParcels = await Parcel.find({
      status: 'pending',
      'pickup.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: driver.location.coordinates,
          },
          $maxDistance: 5000,
        },
      },
    }).limit(10);

    sendSuccessResponse(res, 'Nearby parcels retrieved successfully', nearbyParcels, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve nearby parcels', error.message, 500);
  }
};
