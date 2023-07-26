var express = require("express");
var router = express.Router();
const flightController = require("../controllers/flights");
const auth = require("../middlewares/auth");

/* Add flight route */
router.post("/", auth, flightController.addFlight);
/* Edit flight route */
router.patch("/:flightId", auth, flightController.updateFlight);
/* Remove flight route */
router.delete("/:flightId", auth, flightController.deleteFlight);
/* Get all flights */
router.get("/", flightController.getAllFlights);

module.exports = router;
