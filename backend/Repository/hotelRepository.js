const Hotel = require('../Entity/hotelEntity');
const hotelsData = require('../Seeder/hotel.json');

class HotelRepository {
  constructor() {
    this.hotels = hotelsData.map(
      h => new Hotel(h.hotel_id, h.hotel_name, h.location)
    );
  }

  getAllHotels() {
    return this.hotels;
  }

  getHotelById(id) {
    return this.hotels.find(h => h.hotel_id === id);
  }

  addHotel(hotelData) {
    const newId = this.hotels.length + 1;
    const newHotel = new Hotel(newId, hotelData.hotel_name, hotelData.location);
    this.hotels.push(newHotel);
    return newHotel;
  }
}

module.exports = HotelRepository;
