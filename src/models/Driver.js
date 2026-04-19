const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseExpiry: {
      type: Date,
      required: true,
    },
    licenseImage: {
      type: String,
      required: true,
    },
    nidNumber: {
      type: String,
      required: true,
      unique: true,
    },
    nidImage: {
      type: String,
      required: true,
    },
    bankAccount: {
      accountNumber: String,
      accountHolder: String,
      bankName: String,
      routingNumber: String,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    documents: [
      {
        type: String,
        url: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'on-ride', 'on-parcel'],
      default: 'offline',
    },
    totalRides: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    acceptanceRate: {
      type: Number,
      default: 100,
    },
    cancellationRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

driverSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Driver', driverSchema);
