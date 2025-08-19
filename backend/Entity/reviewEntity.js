class Review {
  constructor(review_id, booking_id, rooming_id, user_id, house_keeping_rating, food_rating, service_rating, staff_rating) {
    this.review_id = review_id;
    this.booking_id = booking_id;
    this.roomtype_id = rooming_id;
    this.user_id = user_id;
    this.house_keeping_rating = house_keeping_rating;
    this.food_rating = food_rating;
    this.service_rating = service_rating;
    this.staff_rating = staff_rating;
  }
}

module.exports = Review;
