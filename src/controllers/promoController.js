const PromoCode = require('../models/PromoCode');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.getAllPromoCodes = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const promoCodes = await PromoCode.find({ isActive: true })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await PromoCode.countDocuments({ isActive: true });

    sendSuccessResponse(res, 'Promo codes retrieved successfully', { promoCodes, total }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to retrieve promo codes', error.message, 500);
  }
};

exports.validatePromoCode = async (req, res) => {
  try {
    const { code, rideAmount } = req.body;

    const promoCode = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promoCode) {
      return sendErrorResponse(res, 'Invalid promo code', null, 404);
    }

    // Check if expired
    if (new Date() > new Date(promoCode.endDate)) {
      return sendErrorResponse(res, 'Promo code has expired', null, 400);
    }

    // Check if minimum amount is met
    if (rideAmount < promoCode.minRideAmount) {
      return sendErrorResponse(res, `Minimum ride amount of ${promoCode.minRideAmount} not met`, null, 400);
    }

    // Check usage limit
    if (promoCode.totalUsageLimit && promoCode.totalUsageCount >= promoCode.totalUsageLimit) {
      return sendErrorResponse(res, 'Promo code usage limit reached', null, 400);
    }

    // Calculate discount
    let discount = 0;
    if (promoCode.discountType === 'percentage') {
      discount = (rideAmount * promoCode.discountValue) / 100;
      if (promoCode.maxDiscount && discount > promoCode.maxDiscount) {
        discount = promoCode.maxDiscount;
      }
    } else {
      discount = promoCode.discountValue;
    }

    sendSuccessResponse(res, 'Promo code is valid', { discount, promoCode }, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to validate promo code', error.message, 500);
  }
};

exports.applyPromoCode = async (req, res) => {
  try {
    const { code, rideId, parcelId } = req.body;

    const promoCode = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promoCode) {
      return sendErrorResponse(res, 'Invalid promo code', null, 404);
    }

    // Check if user has already used this code
    const userUsage = promoCode.usedBy.filter(
      (u) => u.userId.toString() === req.userId
    );

    if (userUsage.length >= promoCode.maxUsagePerUser) {
      return sendErrorResponse(res, 'You have already used this promo code', null, 400);
    }

    // Add user to usedBy array
    promoCode.usedBy.push({
      userId: req.userId,
      usedAt: new Date(),
      rideId,
      parcelId,
    });

    promoCode.totalUsageCount += 1;
    await promoCode.save();

    sendSuccessResponse(res, 'Promo code applied successfully', promoCode, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to apply promo code', error.message, 500);
  }
};

exports.createPromoCode = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      maxDiscount,
      minRideAmount,
      maxUsagePerUser,
      totalUsageLimit,
      startDate,
      endDate,
      applicableTo,
    } = req.body;

    const promoCode = new PromoCode({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      maxDiscount,
      minRideAmount,
      maxUsagePerUser,
      totalUsageLimit,
      startDate,
      endDate,
      applicableTo,
    });

    await promoCode.save();
    sendSuccessResponse(res, 'Promo code created successfully', promoCode, 201);
  } catch (error) {
    sendErrorResponse(res, 'Failed to create promo code', error.message, 500);
  }
};

exports.updatePromoCode = async (req, res) => {
  try {
    const { promoCodeId } = req.params;
    const updateData = req.body;

    const promoCode = await PromoCode.findByIdAndUpdate(promoCodeId, updateData, {
      new: true,
    });

    if (!promoCode) {
      return sendErrorResponse(res, 'Promo code not found', null, 404);
    }

    sendSuccessResponse(res, 'Promo code updated successfully', promoCode, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to update promo code', error.message, 500);
  }
};

exports.deletePromoCode = async (req, res) => {
  try {
    const { promoCodeId } = req.params;

    const promoCode = await PromoCode.findByIdAndDelete(promoCodeId);

    if (!promoCode) {
      return sendErrorResponse(res, 'Promo code not found', null, 404);
    }

    sendSuccessResponse(res, 'Promo code deleted successfully', null, 200);
  } catch (error) {
    sendErrorResponse(res, 'Failed to delete promo code', error.message, 500);
  }
};
