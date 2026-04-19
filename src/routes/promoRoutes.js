const express = require('express');
const promoController = require('../controllers/promoController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Get all active promo codes
router.get('/', auth, promoController.getAllPromoCodes);

// Validate promo code
router.post('/validate', auth, promoController.validatePromoCode);

// Apply promo code
router.post('/apply', auth, promoController.applyPromoCode);

// Admin routes
// Create promo code
router.post('/admin/create', auth, roleCheck('admin'), promoController.createPromoCode);

// Update promo code
router.put('/admin/:promoCodeId', auth, roleCheck('admin'), promoController.updatePromoCode);

// Delete promo code
router.delete('/admin/:promoCodeId', auth, roleCheck('admin'), promoController.deletePromoCode);

module.exports = router;
