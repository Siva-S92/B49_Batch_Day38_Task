const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    id: Number,
    No_of_seats: Number,
    room_name: String,
    price_per_hours: String,
  
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;