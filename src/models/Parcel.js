const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    parcelDetails: {
      weight: {
        value: Number,
        unit: 'kg',
      },
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: 'cm',
      },
      description: String,
      fragile: Boolean,
      contents: String,
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
      contact: {
        name: String,
        phone: String,
      },
    },
    delivery: {
      address: String,
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: [Number],
      },
      contact: {
        name: String,
        phone: String,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'picked-up', 'in-transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    fare: {
      baseFare: Number,
      distanceFare: Number,
      weightFare: Number,
      discount: {
        type: Number,
        default: 0,
      },
      tax: Number,
      total: Number,
    },
    deliveryType: {
      type: String,
      enum: ['standard', 'express', 'scheduled'],
      default: 'standard',
    },
    scheduledDate: Date,
    pickupTime: Date,
    deliveryTime: Date,
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

parcelSchema.index({ 'pickup.coordinates': '2dsphere', 'delivery.coordinates': '2dsphere' });

module.exports = mongoose.model('Parcel', parcelSchema);
