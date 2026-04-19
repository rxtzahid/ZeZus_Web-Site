const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    pickup: {
      address: String,
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: [Number],
      },
    },
    dropoff: {
      address: String,
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: [Number],
      },
    },
    distance: {
      type: Number,
      unit: 'km',
    },
    duration: {
      type: Number,
      unit: 'minutes',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    fare: {
      baseFare: Number,
      distanceFare: Number,
      timeFare: Number,
      discount: {
        type: Number,
        default: 0,
      },
      tax: Number,
      total: Number,
    },
    rideType: {
      type: String,
      enum: ['economy', 'comfort', 'premium'],
      default: 'economy',
    },
    passengers: {
      type: Number,
      default: 1,
      min: 1,
      max: 6,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'wallet'],
      default: 'cash',
    },
    startTime: Date,
    endTime: Date,
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
    },
  },
  { timestamps: true }
);

rideSchema.index({ 'pickup.coordinates': '2dsphere', 'dropoff.coordinates': '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
