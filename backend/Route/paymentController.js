const express = require('express');
const router = express.Router();
const PaymentService = require('../Service/paymentService');
const paymentService = new PaymentService();

router.post('/api/addPayment', (req, res) => {
  const newPayment = paymentService.addPayment(req.body);
  res.status(201).json(newPayment);
});

module.exports = router;
