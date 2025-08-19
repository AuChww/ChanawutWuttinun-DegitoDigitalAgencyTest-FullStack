const HotelRepository = require('../Repository/hotelRepository');

class HotelService {
  constructor() {
    this.hotelRepository = new HotelRepository();
  }

  getAllHotels() {
    return this.hotelRepository.getAllHotels();
  }

  getHotelById(id) {
    return this.hotelRepository.getHotelById(id);
  }

  addHotel(hotelData) {
    return this.hotelRepository.addHotel(hotelData);
  }
}

module.exports = HotelService;
