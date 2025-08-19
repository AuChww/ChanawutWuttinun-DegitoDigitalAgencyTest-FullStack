const ReviewRepository = require('../Repository/reviewRepository');

class ReviewService {
  constructor() { this.repo = new ReviewRepository(); }
  getByRoomtypeId(id) { return this.repo.getByRoomtypeId(id); }
}

module.exports = ReviewService;
