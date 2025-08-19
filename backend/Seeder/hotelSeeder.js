const Hotel = require('../Entity/hotelEntity');

let hotels = [
  new Hotel(1, 'Bangkok Palace Hotel', 'Bangkok'),
  new Hotel(2, 'Chiang Mai Riverside Resort', 'Chiang Mai'),
  new Hotel(3, 'Phuket Beach Resort', 'Phuket')
];

module.exports = {
  hotels
};
