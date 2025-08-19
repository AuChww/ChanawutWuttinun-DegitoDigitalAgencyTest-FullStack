const rooms = require('../Seeder/room.json');
const hotels = require('../Seeder/hotel.json');

class RoomRepository {
  getRoomByHotelId(hotelId) {
    return rooms.filter(r => r.hotel_id === hotelId);
  }

  filterRooms({ location, checkin, checkout, capacity }) {
    let hotelIds = hotels
      .filter(h => !location || h.location === location)
      .map(h => h.hotel_id);

    return rooms.filter(r =>
      hotelIds.includes(r.hotel_id) &&
      r.capacity >= (capacity || 1)
    );
  }
}

module.exports = RoomRepository;
