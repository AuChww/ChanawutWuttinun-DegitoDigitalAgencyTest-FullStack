const RoomRepository = require('../Repository/roomRepository');

class RoomService {
  constructor() {
    this.repo = new RoomRepository();
  }

  getRoomByHotelId(hotelId) {
    return this.repo.getRoomByHotelId(hotelId);
  }

  filterRooms(filters) {
    return this.repo.filterRooms(filters);
  }
}

module.exports = RoomService;
