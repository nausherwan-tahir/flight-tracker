const Flight = require("../models/flight");
const User = require("../models/user");

//Get all flights
exports.getAllFlights = (req, res, next) => {
  Flight.find()
    .then((flights) => {
      if (!flights || flights.length === 0)
        return res.status(404).json({ message: "flights not found" });
      else return res.status(200).json(flights);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to get flight data" });
    });
};

//Add new flight
exports.addFlight = (req, res, next) => {
  const currentUser = req?.user;
  const { name, flyingFrom, flyingTo, departureDate, returnDate } = req?.body;
  User?.findById(currentUser?.id)
    .then((user) => {
      if (user?.role === "flight") {
        Flight.create({
          name,
          flyingFrom,
          flyingTo,
          departureDate,
          returnDate,
        })
          .then((flight) => {
            return res.status(201).json(flight);
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(500)
              .json({ error: "unable to create new flight" });
          });
      } else return res.status(401).json({ error: "unauthorized user" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to create new flight" });
    });
};

//Remove flight
exports.deleteFlight = (req, res, next) => {
  const { flightId } = req?.params;
  const currentUser = req?.user;
  User?.findById(currentUser?.id)
    .then((user) => {
      if (user?.role === "flight") {
        Flight.findByIdAndRemove(flightId)
          .then(() => {
            console.log("flight removed");
            return res.status(204).json({ message: "Data deleted" });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: "unable to delete flight" });
          });
      } else return res.status(401).json({ error: "unauthorized access" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to delete flight" });
    });
};

//Edit flight
exports.updateFlight = (req, res, next) => {
  const { flightId } = req?.params;
  const currentUser = req?.user;
  const data = req?.body;
  User?.findById(currentUser?.id)
    .then((user) => {
      console.log("user", user);
      if (user?.role === "flight") {
        Flight.findByIdAndUpdate(flightId, data, { new: true })
          .then((flight) => {
            console.log(flight);
            return res.status(200).json(flight);
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: "unable to update flight" });
          });
      } else return res.status(401).json({ error: "unauthorized access" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to update flight" });
    });
};
