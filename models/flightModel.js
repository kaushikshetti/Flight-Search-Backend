const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    airline: String,
    airlineCode: String,
    flightNumber: Number,
    origin: String,
    destination: String,
    price: Number,
    departure: Date,
    arrival: Date,
    duration: String,
    availableSeats: Number,
    operationalDays: [Number],
  },
  {
    collection: "flight",
  }
);

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
