const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ride',
    },
    parcelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parcel',
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'wallet', 'bank-transfer', 'mobile-money'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    gateway: {
      type: String,
      enum: ['stripe', 'sslcommerz', 'bkash', 'nagad', 'manual'],
    },
    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    cardDetails: {
      last4: String,
      brand: String,
      expiryMonth: Number,
      expiryYear: Number,
    },
    refund: {
      isRefunded: {
        type: Boolean,
        default: false,
      },
      amount: Number,
      date: Date,
      reason: String,
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
