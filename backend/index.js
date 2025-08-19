const express = require('express');
const app = express();
const PORT = 3000;

const hotelController = require('./route/hotelController');
const roomController = require('./route/roomController');

app.use(express.json());

app.get('/', (req,res)=> res.send('Booking API'));

app.use('/hotels', hotelController);
app.use('/rooms', roomController);

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
