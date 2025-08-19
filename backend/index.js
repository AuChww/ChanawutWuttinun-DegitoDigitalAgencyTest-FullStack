const express = require('express');
const app = express();
const PORT = 3000;

const hotelController = require('./Route/hotelController');
const roomController = require('./Route/roomController');
const reviewController = require('./Route/reviewController');
const bookingController = require('./Route/bookingController');
const paymentController = require('./Route/paymentController');

app.use(express.json());
app.get('/', (req,res)=> res.send('Booking API'));

// Routes
app.use('/hotels', hotelController);
app.use('/rooms', roomController);
app.use('/reviews', reviewController);
app.use('/bookings', bookingController);
app.use('/payments', paymentController);

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
