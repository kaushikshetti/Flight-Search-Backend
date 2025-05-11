const express = require("express");
const flightRoutes = require("./routes/flightRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// const corsOptions = {
//   origin: "http://localhost:3001/", // Allow only specific origins
//   methods: ["GET", "POST", "PUT"], // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"], // Allowed headers
// };

// Use the CORS middleware with the specified options
app.use(cors()); 

mongoose
  .connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", flightRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
