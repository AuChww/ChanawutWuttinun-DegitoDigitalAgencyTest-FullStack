const RoomRepository = require('../Repository/roomRepository');

class RoomService {
  constructor() {
    this.repo = new RoomRepository();
  }

  getRoomByHotelId(hotelId) {
    return this.repo.getRoomByHotelId(hotelId);
  }

  getRoomById(roomId) {
    return this.repo.getRoomById(roomId);
  }

  filterRooms(filters) {
    return this.repo.filterRooms(filters);
  }
}

module.exports = RoomService;
