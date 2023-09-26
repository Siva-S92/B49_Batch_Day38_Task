const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Customer = require("./models/Customer");
const Room = require("./models/Room");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const DB_URL =
  "mongodb+srv://sivagraphics4fashion:guvi123@mycluster1.600dfem.mongodb.net/";

mongoose
  .connect(DB_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));



app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(400).send("Ooops!!!!Error Occured", err);
  }
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(400).send("Ooops!!!!Error Occured", err);
  }
});

app.get("/rooms_with_customers_info", async (req, res) => {
  try {
    const room_booking_details = await Room.aggregate([ { $lookup: {from: "customers", localField: "id", foreignField: "room_Id", as: "Customer_info",}, } ]).exec();
    res.send(room_booking_details);
  } catch (err) {
    res.status(400).send("Ooops!!!!Error Occured", err);
  }
});




app.get("/booked_customers", async (req, res) => {
  try {
    const customer_booking_details = await Customer.aggregate([ { $lookup: {from: "rooms", localField: "room_Id", foreignField: "id", as: "Room_Details",}, }, {$match: {status: "booked"}} ]).exec();
    res.send(customer_booking_details);
  } catch (err) {
    res.status(400).send("Ooops!!!!Error Occured", err);
  }
});




app.get("/room_booked_customers", async (req, res) => {
  try {
    const bookedinfo = await Customer.find({status: "booked"});
    res.send(bookedinfo);
  } catch (err) {
    res.status(400).send("Ooops!!!!Error Occured", err);
  }
});

app.get("/booking_customers_count", async (req, res) => {
  try {
    const mani = await Customer.aggregate([  
      { $match: {name: "mani" } }, {$count: "mani"}, 
     ]);

     const ravi = await Customer.aggregate([  
      { $match: {name: "ravi" } }, {$count: "ravi"}, 
     ]);

     const ramya = await Customer.aggregate([  
      { $match: {name: "ramya" } }, {$count: "ramya"}, 
     ]);

     const reshma = await Customer.aggregate([  
      { $match: {name: "reshma" } }, {$count: "reshma"}, 
     ]);
    
    res.send([...mani, ...ravi, ...ramya, ...reshma] );
  } catch (err) {
    res.status(400).send("Ooops!!!!Error Occured", err);
  }
});




app.post("/all_customer", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.send(customer);
  } catch (err) {
    res.send("Ooops!!!!Error Occured", err);
  }
});

app.post("/all_room", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.send(room);
  } catch (err) {
    res.send("Ooops!!!!Error Occured", err);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
