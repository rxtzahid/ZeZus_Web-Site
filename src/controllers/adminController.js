const User = require('../models/User');
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const Parcel = require('../models/Parcel');
const Payment = require('../models/Payment');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDrivers = await Driver.countDocuments();
    const totalRides = await Ride.countDocuments();
    const totalParcels = await Parcel.countDocuments();
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const stats = {
      totalUsers,
      totalDrivers,
      totalRides,
      totalParcels,
      totalRevenue: totalRevenue[0]?.total || 0,
    };

    sendSuccessResponse(res, 'Dashboard stats retrieved successfully', stats, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve dashboard stats', error.message, 500);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query;

    const users = await User.find()
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('-password')
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    sendSuccessResponse(res, 'Users retrieved successfully', { users, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve users', error.message, 500);
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return sendErrorResponse(res, 'User not found', null, 404);
    }

    sendSuccessResponse(res, 'User details retrieved successfully', user, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve user details', error.message, 500);
  }
};

exports.suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return sendErrorResponse(res, 'User not found', null, 404);
    }

    sendSuccessResponse(res, 'User suspended successfully', user, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to suspend user', error.message, 500);
  }
};

exports.activateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    );

    if (!user) {
      return sendErrorResponse(res, 'User not found', null, 404);
    }

    sendSuccessResponse(res, 'User activated successfully', user, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to activate user', error.message, 500);
  }
};

exports.verifyDriver = async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { isVerified: true },
      { new: true }
    );

    if (!driver) {
      return sendErrorResponse(res, 'Driver not found', null, 404);
    }

    sendSuccessResponse(res, 'Driver verified successfully', driver, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to verify driver', error.message, 500);
  }
};

exports.getAllRides = async (req, res) => {
  try {
    const { limit = 20, skip = 0, status } = req.query;

    const query = status ? { status } : {};

    const rides = await Ride.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Ride.countDocuments(query);

    sendSuccessResponse(res, 'Rides retrieved successfully', { rides, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve rides', error.message, 500);
  }
};

exports.getAllParcels = async (req, res) => {
  try {
    const { limit = 20, skip = 0, status } = req.query;

    const query = status ? { status } : {};

    const parcels = await Parcel.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Parcel.countDocuments(query);

    sendSuccessResponse(res, 'Parcels retrieved successfully', { parcels, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve parcels', error.message, 500);
  }
};

exports.getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = { status: 'completed' };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const payments = await Payment.find(query);
    const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);

    const paymentMethods = {};
    payments.forEach((payment) => {
      paymentMethods[payment.paymentMethod] = (paymentMethods[payment.paymentMethod] || 0) + payment.amount;
    });

    sendSuccessResponse(res, 'Revenue report retrieved successfully', {
      totalRevenue,
      paymentCount: payments.length,
      paymentMethods,
    }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve revenue report', error.message, 500);
  }
};
