const Flight = require("../models/flightModel");

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, departureDate, passengers } = req.query;

    if (!origin || !destination || !departureDate || !passengers) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const date = new Date(departureDate);
    if (isNaN(date))
      return res.status(400).json({ error: "Invalid departureDate" });

    let day = date.getDay(); 
    if (day === 0) day = 7;

    const allFlights = await Flight.find();
    console.log("All flights:", allFlights);
  
    const flights = await Flight.find({
      origin,
      destination,
      availableSeats: { $gte: Number(passengers) },
      operationalDays: day,
    });

    res.status(200).json(flights);
  } catch (err) {
    console.error("Flight search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};