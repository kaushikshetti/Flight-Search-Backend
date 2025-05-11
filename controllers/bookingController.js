const Flight = require("../models/flightModel");

exports.bookFlight = async (req, res) => {
  const { flightId, passengers } = req.body;

  if (!flightId || !passengers) {
    return res.status(400).json({ message: "Missing booking information" });
  }

  const flight = await Flight.findById(flightId);
  if (!flight || flight.availableSeats < passengers) {
    return res
      .status(400)
      .json({ message: "Insufficient seats or flight not found" });
  }

  flight.availableSeats -= passengers;
  await flight.save();

  res.json({ message: "Booking successful", flight });
};