const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const { paymentLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Create payment
router.post('/create', auth, paymentLimiter, paymentController.createPayment);

// Process payment
router.post('/process', auth, paymentLimiter, paymentController.processPayment);

// Refund payment
router.post('/refund', auth, paymentController.refundPayment);

// Add to wallet
router.post('/wallet/add', auth, paymentLimiter, paymentController.addToWallet);

// Get payment history
router.get('/history', auth, paymentController.getPaymentHistory);

// Get wallet
router.get('/wallet', auth, paymentController.getWallet);

// Get payment details
router.get('/:paymentId', auth, paymentController.getPaymentDetails);

module.exports = router;
