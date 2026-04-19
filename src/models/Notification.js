const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['ride-request', 'ride-accepted', 'ride-started', 'ride-completed', 'parcel-pickup', 'parcel-delivered', 'payment-received', 'rating-received', 'promo-code', 'system-notification'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedId: {
      rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride',
      },
      parcelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parcel',
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    data: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
