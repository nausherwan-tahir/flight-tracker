var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./src/routes/users");
const flightsRouter = require("./src/routes/flights");
const bookingsRouter = require("./src/routes/bookings");
const run = require("./src/utils/database");

// Importing all models
const User = require("./src/models/user");

var app = express();

// Database Configuration
run();

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

// Calling routes
app.use("/api/users", usersRouter);
app.use("/api/flights", flightsRouter);
app.use("/api/bookings", bookingsRouter);

module.exports = app;
