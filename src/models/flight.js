const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create flight Schema
const FlightSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  flyingFrom: {
    type: String,
    required: true,
  },
  flyingTo: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  returnDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  flightCount: {
    type: Number,
    default: 0,
  },
});
module.exports = Flight = mongoose.model("flight", FlightSchema);
