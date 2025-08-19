const BookingRepository = require('../Repository/bookingRepository');

class BookingService {
  constructor() { this.repo = new BookingRepository(); }

  addBooking(data) {
    const bookingId = this.repo.bookings?.length + 1 || 1;
    const newBooking = { booking_id: bookingId, ...data };
    return this.repo.addBooking(newBooking);
  }
}

module.exports = BookingService;
