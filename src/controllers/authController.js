const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Driver = require('../models/Driver');
const { generateToken } = require('../utils/generateToken');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return sendErrorResponse(res, 'Email or phone number already exists', null, 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: role || 'user',
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    sendSuccessResponse(res, 'User registered successfully', { user, token }, 201);
  } catch (error) {
    sendErrorResponse(res, 'Registration failed', error.message, 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 'Invalid email or password', null, 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendErrorResponse(res, 'Invalid email or password', null, 401);
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    sendSuccessResponse(res, 'Login successful', { user, token }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Login failed', error.message, 500);
  }
};

exports.logout = async (req, res) => {
  try {
    sendSuccessResponse(res, 'Logged out successfully', null, 200);
  } catch (error) {
    sendErrorResponse(res, 'Logout failed', error.message, 500);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendErrorResponse(res, 'User not found', null, 404);
    }

    sendSuccessResponse(res, 'Profile retrieved successfully', user, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve profile', error.message, 500);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, emergencyContact } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phone, address, emergencyContact },
      { new: true }
    );

    sendSuccessResponse(res, 'Profile updated successfully', user, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to update profile', error.message, 500);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 'Invalid old password', null, 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    sendSuccessResponse(res, 'Password changed successfully', null, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to change password', error.message, 500);
  }
};
