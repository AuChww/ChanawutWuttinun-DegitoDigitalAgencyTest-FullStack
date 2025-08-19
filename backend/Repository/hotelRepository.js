const { hotels } = require('../Seeder/hotelSeeder');
const Hotel = require('../Entity/hotelEntity');

class HotelRepository {
  constructor() {
    this.hotels = hotels;
  }

  getAllHotels() {
    return this.hotels;
  }

  getHotelById(id) {
    return this.hotels.find(hotel => hotel.hotel_id === id);
  }

  addHotel(hotelData) {
    const newId = this.hotels.length > 0 
      ? this.hotels[this.hotels.length - 1].hotel_id + 1 
      : 1;
    const newHotel = new Hotel(newId, hotelData.hotel_name, hotelData.location);
    this.hotels.push(newHotel);
    return newHotel;
  }
}

module.exports = HotelRepository;
