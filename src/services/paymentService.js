const Payment = require('../models/Payment');

class PaymentService {
  async createPayment(userId, amount, paymentMethod, rideId = null, parcelId = null) {
    try {
      const payment = new Payment({
        userId,
        amount,
        paymentMethod,
        status: 'pending',
        rideId,
        parcelId,
      });

      await payment.save();
      return payment;
    } catch (error) {
      console.error('Payment Service Error:', error.message);
      throw error;
    }
  }

  async updatePaymentStatus(paymentId, status, transactionId = null, gatewayResponse = null) {
    try {
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          status,
          transactionId,
          gatewayResponse,
        },
        { new: true }
      );

      return payment;
    } catch (error) {
      console.error('Payment Service Error:', error.message);
      throw error;
    }
  }

  async refundPayment(paymentId, reason) {
    try {
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          status: 'refunded',
          'refund.isRefunded': true,
          'refund.date': new Date(),
          'refund.reason': reason,
        },
        { new: true }
      );

      return payment;
    } catch (error) {
      console.error('Payment Service Error:', error.message);
      throw error;
    }
  }

  async getPaymentHistory(userId, limit = 10, skip = 0) {
    try {
      const payments = await Payment.find({ userId })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      const total = await Payment.countDocuments({ userId });

      return { payments, total };
    } catch (error) {
      console.error('Payment Service Error:', error.message);
      throw error;
    }
  }
}

module.exports = new PaymentService();
