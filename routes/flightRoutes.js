const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const searchController = require("../controllers/searchController");
const bookingController = require("../controllers/bookingController");

const auth = require("../middleware/auth");

router.post("/login", authController.login);
router.get("/search", auth, searchController.searchFlights);
router.post("/book", auth, bookingController.bookFlight);

module.exports = router;
