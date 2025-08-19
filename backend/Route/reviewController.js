const express = require('express');
const router = express.Router();
const ReviewService = require('../Service/reviewService');
const reviewService = new ReviewService();

router.get('/api/getReviewByRoomTypeId/:id', (req, res) => {
  const reviews = reviewService.getByRoomtypeId(parseInt(req.params.id));
  res.json(reviews);
});

module.exports = router;
