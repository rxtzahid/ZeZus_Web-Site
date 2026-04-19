const mongoose = require('mongoose');

const promoCodSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    description: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    maxDiscount: Number,
    minRideAmount: {
      type: Number,
      default: 0,
    },
    maxUsagePerUser: {
      type: Number,
      default: 1,
    },
    totalUsageLimit: Number,
    totalUsageCount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    applicableTo: {
      type: String,
      enum: ['all', 'rides', 'parcels'],
      default: 'all',
    },
    applicableRideTypes: [String],
    userType: {
      type: String,
      enum: ['all', 'new', 'existing'],
      default: 'all',
    },
    applicableUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    usedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        usedAt: Date,
        rideId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ride',
        },
        parcelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Parcel',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('PromoCode', promoCodSchema);
