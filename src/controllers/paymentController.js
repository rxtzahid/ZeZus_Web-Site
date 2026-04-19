const Payment = require('../models/Payment');
const User = require('../models/User');
const paymentService = require('../services/paymentService');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.createPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, rideId, parcelId } = req.body;

    const payment = await paymentService.createPayment(
      req.userId,
      amount,
      paymentMethod,
      rideId,
      parcelId
    );

    sendSuccessResponse(res, 'Payment created successfully', payment, 201);
  } catch (error) {
    sendErrorResponse(res, 'Failed to create payment', error.message, 500);
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { paymentId, transactionId, cardDetails } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return sendErrorResponse(res, 'Payment not found', null, 404);
    }

    // Update payment status
    const updatedPayment = await paymentService.updatePaymentStatus(
      paymentId,
      'completed',
      transactionId
    );

    // Add to user wallet if needed
    if (payment.paymentMethod === 'wallet') {
      await User.findByIdAndUpdate(
        req.userId,
        { $inc: { 'wallet.balance': -payment.amount } }
      );
    }

    sendSuccessResponse(res, 'Payment processed successfully', updatedPayment, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to process payment', error.message, 500);
  }
};

exports.refundPayment = async (req, res) => {
  try {
    const { paymentId, reason } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return sendErrorResponse(res, 'Payment not found', null, 404);
    }

    const refundedPayment = await paymentService.refundPayment(paymentId, reason);

    // Add refund amount back to wallet
    await User.findByIdAndUpdate(
      req.userId,
      { $inc: { 'wallet.balance': payment.amount } }
    );

    sendSuccessResponse(res, 'Payment refunded successfully', refundedPayment, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to refund payment', error.message, 500);
  }
};

exports.addToWallet = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;

    // Create payment
    const payment = await paymentService.createPayment(req.userId, amount, paymentMethod);

    // Update to completed
    const completedPayment = await paymentService.updatePaymentStatus(
      payment._id,
      'completed'
    );

    // Add to wallet
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { 'wallet.balance': amount } },
      { new: true }
    );

    sendSuccessResponse(res, 'Amount added to wallet successfully', { payment: completedPayment, wallet: user.wallet }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to add to wallet', error.message, 500);
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const { payments, total } = await paymentService.getPaymentHistory(
      req.userId,
      parseInt(limit),
      parseInt(skip)
    );

    sendSuccessResponse(res, 'Payment history retrieved successfully', { payments, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve payment history', error.message, 500);
  }
};

exports.getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return sendErrorResponse(res, 'Payment not found', null, 404);
    }

    sendSuccessResponse(res, 'Payment details retrieved successfully', payment, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve payment details', error.message, 500);
  }
};

exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendErrorResponse(res, 'User not found', null, 404);
    }

    sendSuccessResponse(res, 'Wallet retrieved successfully', user.wallet, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve wallet', error.message, 500);
  }
};
