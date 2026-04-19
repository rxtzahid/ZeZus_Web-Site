const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.becomeDriver = async (req, res) => {
  try {
    const { licenseNumber, licenseExpiry, nidNumber, bankAccount } = req.body;

    // Check if already a driver
    const existingDriver = await Driver.findOne({ userId: req.userId });
    if (existingDriver) {
      return sendErrorResponse(res, 'User is already a driver', null, 400);
    }

    const driver = new Driver({
      userId: req.userId,
      licenseNumber,
      licenseExpiry,
      nidNumber,
      bankAccount,
      status: 'offline',
    });

    await driver.save();

    // Update user role
    await User.findByIdAndUpdate(req.userId, { role: 'driver' });

    sendSuccessResponse(res, 'Driver profile created successfully', driver, 201);
  } catch (error) {
    sendErrorResponse(res, 'Failed to create driver profile', error.message, 500);
  }
};

exports.updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const driver = await Driver.findOne({ userId: req.userId });
    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    driver.status = status;
    await driver.save();

    sendSuccessResponse(res, 'Driver status updated successfully', driver, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to update driver status', error.message, 500);
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const { make, model, year, color, licensePlate, registrationNumber, registrationExpiry, category, seatingCapacity } = req.body;

    const driver = await Driver.findOne({ userId: req.userId });
    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    const vehicle = new Vehicle({
      driverId: driver._id,
      make,
      model,
      year,
      color,
      licensePlate,
      registrationNumber,
      registrationExpiry,
      category,
      seatingCapacity,
    });

    await vehicle.save();

    // Update driver with vehicle reference
    driver.vehicle = vehicle._id;
    await driver.save();

    sendSuccessResponse(res, 'Vehicle added successfully', vehicle, 201);
  } catch (error) {
    sendErrorResponse(res, 'Failed to add vehicle', error.message, 500);
  }
};

exports.getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.userId })
      .populate('userId vehicle');

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    sendSuccessResponse(res, 'Driver profile retrieved successfully', driver, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve driver profile', error.message, 500);
  }
};

exports.updateDriverProfile = async (req, res) => {
  try {
    const { location, bankAccount } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { userId: req.userId },
      { location, bankAccount },
      { new: true }
    );

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    sendSuccessResponse(res, 'Driver profile updated successfully', driver, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to update driver profile', error.message, 500);
  }
};

exports.getDriverStats = async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.userId });

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    const stats = {
      totalRides: driver.totalRides,
      totalEarnings: driver.totalEarnings,
      rating: driver.rating,
      acceptanceRate: driver.acceptanceRate,
      cancellationRate: driver.cancellationRate,
    };

    sendSuccessResponse(res, 'Driver stats retrieved successfully', stats, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve driver stats', error.message, 500);
  }
};

exports.getNearbyRides = async (req, res) => {
  try {
    // Get driver location and find nearby ride requests
    const driver = await Driver.findOne({ userId: req.userId });

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    // Find pending rides near driver location (5km radius)
    const Ride = require('../models/Ride');
    const nearbyRides = await Ride.find({
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

    sendSuccessResponse(res, 'Nearby rides retrieved successfully', nearbyRides, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve nearby rides', error.message, 500);
  }
};
