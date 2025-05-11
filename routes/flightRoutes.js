const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { searchFlights } = require("../controllers/searchController");
const { bookFlight } = require("../controllers/bookingController");
const { signUp } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/search", auth, searchFlights);
router.post("/book", auth, bookFlight);

module.exports = router;
