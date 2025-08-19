const express = require('express');
const router = express.Router();
const HotelService = require('../Service/hotelService');
const hotelService = new HotelService();

router.get('/api/getAllHotels', (req, res) => {
  const hotels = hotelService.getAllHotels();
  res.json(hotels);
});

router.get('/api/getHotelById/:id', (req, res) => {
  const hotel = hotelService.getHotelById(parseInt(req.params.id));
  if (!hotel) {
    return res.status(404).json({ message: 'Hotel not found' });
  }
  res.json(hotel);
});

router.post('/api/addHotel', (req, res) => {
  const { hotel_name, location } = req.body;

  if (!hotel_name || !location) {
    return res.status(400).json({ message: 'hotel_name and location are required' });
  }

  const newHotel = hotelService.addHotel({ hotel_name, location });
  res.status(201).json(newHotel);
});


module.exports = router;