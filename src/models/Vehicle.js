const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    vin: {
      type: String,
      unique: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    registrationExpiry: {
      type: Date,
      required: true,
    },
    registrationImage: {
      type: String,
      required: true,
    },
    insuranceProvider: String,
    insurancePolicyNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    insuranceExpiry: Date,
    insuranceImage: String,
    category: {
      type: String,
      enum: ['economy', 'comfort', 'premium'],
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair'],
      default: 'good',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalRides: {
      type: Number,
      default: 0,
    },
    maintenanceHistory: [
      {
        date: Date,
        description: String,
        cost: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
