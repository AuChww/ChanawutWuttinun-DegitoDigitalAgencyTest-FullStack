class Booking {
  constructor(booking_id, hotel_id, room_id, user_id, check_in, check_out, people) {
    this.booking_id = booking_id;
    this.hotel_id = hotel_id;
    this.room_id = room_id;
    this.user_id = user_id;
    this.check_in = check_in;
    this.check_out = check_out;
    this.people = people;
  }
}

module.exports = Booking;