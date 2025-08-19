const express = require('express');
const router = express.Router();
const BookingService = require('../Service/bookingService');
const bookingService = new BookingService();

router.post('/api/addBooking', (req, res) => {
  const newBooking = bookingService.addBooking(req.body);
  res.status(201).json(newBooking);
});

module.exports = router;
