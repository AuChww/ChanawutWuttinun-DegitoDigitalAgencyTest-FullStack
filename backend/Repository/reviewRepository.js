const reviews = require('../Seeder/review.json');

class ReviewRepository {
  getByRoomtypeId(roomtypeId) {
    return reviews.filter(r => r.roomtype_id === roomtypeId);
  }
}

module.exports = ReviewRepository;
