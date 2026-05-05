const express = require('express');
const router = express.Router();
const { createPayment,getAllPaymentsByStudents,monthlyTotals } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPayment);
router.get('/all-payments', getAllPaymentsByStudents);
router.get('/summary',monthlyTotals);
module.exports = router;
