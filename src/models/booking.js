const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create booking Schema
const BookingSchema = new Schema({
  flightId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  seatsReserved: {
    type: Number,
    required: true,
  },
});
module.exports = Booking = mongoose.model("booking", BookingSchema);
