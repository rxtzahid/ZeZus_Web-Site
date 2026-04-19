const Ride = require('../models/Ride');
const Parcel = require('../models/Parcel');
const Driver = require('../models/Driver');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.trackRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findById(rideId)
      .populate('driverId', 'location')
      .select('+driverId.location');

    if (!ride) {
      return sendErrorResponse(res, 'Ride not found', null, 404);
    }

    // Check if user is authorized to track this ride
    if (ride.userId.toString() !== req.userId && ride.driverId._id.toString() !== req.userId) {
      return sendErrorResponse(res, 'Not authorized to track this ride', null, 403);
    }

    const trackingData = {
      rideId: ride._id,
      status: ride.status,
      pickup: ride.pickup,
      dropoff: ride.dropoff,
      driverLocation: ride.driverId.location,
      estimatedArrival: ride.duration,
    };

    sendSuccessResponse(res, 'Ride tracking data retrieved successfully', trackingData, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to track ride', error.message, 500);
  }
};

exports.trackParcel = async (req, res) => {
  try {
    const { parcelId } = req.params;

    const parcel = await Parcel.findById(parcelId)
      .populate('driverId', 'location')
      .select('+driverId.location');

    if (!parcel) {
      return sendErrorResponse(res, 'Parcel not found', null, 404);
    }

    // Check if user is authorized to track this parcel
    if (parcel.senderId.toString() !== req.userId && parcel.driverId._id.toString() !== req.userId) {
      return sendErrorResponse(res, 'Not authorized to track this parcel', null, 403);
    }

    const trackingData = {
      parcelId: parcel._id,
      status: parcel.status,
      pickup: parcel.pickup,
      delivery: parcel.delivery,
      driverLocation: parcel.driverId.location,
      estimatedDelivery: parcel.deliveryTime,
    };

    sendSuccessResponse(res, 'Parcel tracking data retrieved successfully', trackingData, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to track parcel', error.message, 500);
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { userId: req.userId },
      {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    sendSuccessResponse(res, 'Location updated successfully', driver.location, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to update location', error.message, 500);
  }
};

exports.getDriverLocation = async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await Driver.findById(driverId).select('location');

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    sendSuccessResponse(res, 'Driver location retrieved successfully', driver.location, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve driver location', error.message, 500);
  }
};

exports.getTrackingHistory = async (req, res) => {
  try {
    const { type, limit = 20, skip = 0 } = req.query;

    if (type === 'ride') {
      const rides = await Ride.find({
        $or: [{ userId: req.userId }, { driverId: req.userId }],
        status: { $in: ['completed', 'cancelled'] },
      })
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort({ createdAt: -1 });

      return sendSuccessResponse(res, 'Tracking history retrieved successfully', rides, 200);
    } else if (type === 'parcel') {
      const parcels = await Parcel.find({
        $or: [{ senderId: req.userId }, { driverId: req.userId }],
        status: { $in: ['delivered', 'cancelled'] },
      })
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort({ createdAt: -1 });

      return sendSuccessResponse(res, 'Tracking history retrieved successfully', parcels, 200);
    }

    sendErrorResponse(res, 'Invalid tracking type', null, 400);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve tracking history', error.message, 500);
  }
};
