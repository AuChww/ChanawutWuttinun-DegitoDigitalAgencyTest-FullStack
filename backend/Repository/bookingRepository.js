const Booking = require('../Entity/bookingEntity');
const bookingsData = require('../Seeder/booking.json');

class BookingRepository {
  constructor() {
    this.bookings = bookingsData.map(
      b => new Booking(
        b.booking_id,
        b.hotel_id,
        b.room_id,
        b.user_id,
        b.check_in,
        b.check_out,
        b.people
      )
    );
  }

  getAllBookings() {
    return this.bookings;
  }

  getBookingById(id) {
    return this.bookings.find(b => b.booking_id === id);
  }

  addBooking(bookingData) {
    const newId = this.bookings.length + 1;
    const newBooking = new Booking(
      newId,
      bookingData.hotel_id,
      bookingData.room_id,
      bookingData.user_id,
      bookingData.check_in,
      bookingData.check_out,
      bookingData.people
    );
    this.bookings.push(newBooking);
    return newBooking;
  }
}

module.exports = BookingRepository;
