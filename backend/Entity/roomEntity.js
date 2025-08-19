class Room {
  constructor(room_id, room_name, capacity, price, hotel_id, roomtype_id) {
    this.room_id = room_id;
    this.room_name = room_name;
    this.capacity = capacity;
    this.price = price;
    this.hotel_id = hotel_id;
    this.roomtype_id = roomtype_id;
  }
}

module.exports = Room;
