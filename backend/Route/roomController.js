const express = require('express');
const router = express.Router();
const RoomService = require('../Service/roomService');
const roomService = new RoomService();

// GET rooms by hotel id
router.get('/api/getRoomByHotelId/:id', (req, res) => {
  const rooms = roomService.getRoomByHotelId(parseInt(req.params.id));
  res.json(rooms);
});

router.get('/api/getRoomById/:id', (req, res) => {
  const rooms = roomService.getRoomById(parseInt(req.params.id));
  res.json(rooms);
});

// GET rooms with filter
router.get('/', (req, res) => {
  const { location, checkin, checkout, capacity } = req.query;
  const rooms = roomService.filterRooms({
    location,
    checkin,
    checkout,
    capacity: parseInt(capacity)
  });
  res.json(rooms);
});

module.exports = router;
