const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    date: String,
    booking_from: String,
    booking_to: String,
    room_Id: Number,
    status: String,
    
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;