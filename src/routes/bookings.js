var express = require("express");
var router = express.Router();
const bookingController = require("../controllers/bookings");
const auth = require("../middlewares/auth");

/* Add flight route */
router.post("/:flightId", auth, bookingController.addBooking);
/* Edit flight route */
router.patch("/:bookingId", auth, bookingController.updateBooking);
/* Remove flight route */
router.delete("/:bookingId", auth, bookingController.deleteBooking);
/* Get all flights */
router.get("/", bookingController.getAllBookings);

module.exports = router;
