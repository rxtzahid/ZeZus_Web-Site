const Ride = require('../models/Ride');
const Driver = require('../models/Driver');
const User = require('../models/User');
const { calculateFare } = require('../utils/calculateFare');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.requestRide = async (req, res) => {
  try {
    const { pickup, dropoff, rideType, passengers, paymentMethod } = req.body;

    const ride = new Ride({
      userId: req.userId,
      pickup,
      dropoff,
      rideType,
      passengers,
      paymentMethod,
      status: 'pending',
    });

    await ride.save();
    sendSuccessResponse(res, 'Ride requested successfully', ride, 201);
  } catch (error) {
    sendErrorResponse(res, 'Failed to request ride', error.message, 500);
  }
};

exports.acceptRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { driverId: req.userId, status: 'accepted', startTime: new Date() },
      { new: true }
    );

    if (!ride) {
      return sendErrorResponse(res, 'Ride not found', null, 404);
    }

    sendSuccessResponse(res, 'Ride accepted successfully', ride, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to accept ride', error.message, 500);
  }
};

exports.startRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status: 'in-progress' },
      { new: true }
    );

    if (!ride) {
      return sendErrorResponse(res, 'Ride not found', null, 404);
    }

    sendSuccessResponse(res, 'Ride started successfully', ride, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to start ride', error.message, 500);
  }
};

exports.completeRide = async (req, res) => {
  try {
    const { rideId, distance, duration, rating, comment } = req.body;

    // Calculate fare
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return sendErrorResponse(res, 'Ride not found', null, 404);
    }

    const fareDetails = calculateFare(distance, duration, ride.rideType);

    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      {
        status: 'completed',
        endTime: new Date(),
        distance,
        duration,
        fare: fareDetails,
        'rating.score': rating,
        'rating.comment': comment,
      },
      { new: true }
    );

    // Update user total spent
    await User.findByIdAndUpdate(ride.userId, {
      $inc: { totalSpent: fareDetails.total, totalRides: 1 },
    });

    // Update driver earnings
    await Driver.findByIdAndUpdate(ride.driverId, {
      $inc: { totalEarnings: fareDetails.total, totalRides: 1 },
    });

    sendSuccessResponse(res, 'Ride completed successfully', updatedRide, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to complete ride', error.message, 500);
  }
};

exports.cancelRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { reason } = req.body;

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status: 'cancelled', cancelReason: reason },
      { new: true }
    );

    if (!ride) {
      return sendErrorResponse(res, 'Ride not found', null, 404);
    }

    sendSuccessResponse(res, 'Ride cancelled successfully', ride, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to cancel ride', error.message, 500);
  }
};

exports.getRideHistory = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const rides = await Ride.find({ userId: req.userId })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Ride.countDocuments({ userId: req.userId });

    sendSuccessResponse(res, 'Ride history retrieved successfully', { rides, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve ride history', error.message, 500);
  }
};

exports.getRideDetails = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findById(rideId)
      .populate('userId driverId');

    if (!ride) {
      return sendErrorResponse(res, 'Ride not found', null, 404);
    }

    sendSuccessResponse(res, 'Ride details retrieved successfully', ride, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve ride details', error.message, 500);
  }
};
