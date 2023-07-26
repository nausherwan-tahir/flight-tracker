const Booking = require("../models/booking");
const Flight = require("../models/flight");
const User = require("../models/user");

//Get all bookings
exports.getAllBookings = (req, res, next) => {
  Booking.find()
    .then((bookings) => {
      if (!bookings || bookings.length === 0)
        return res.status(404).json({ message: "bookings not found" });
      else return res.status(200).json(bookings);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to get booking data" });
    });
};

//Add new booking
exports.addBooking = (req, res, next) => {
  const currentUser = req?.user;
  const { flightId } = req?.params;
  const { seatsReserved } = req?.body;
  Flight.findById(flightId)
    .then((flight) => {
      if (!flight) return res.status(404).json({ message: "no flight found" });
      User?.findById(currentUser?.id)
        .then((user) => {
          if (user?.role === "user") {
            Booking.create({
              flightId,
              userId: currentUser?.id,
              seatsReserved,
            })
              .then((booking) => {
                flight.flightCount += 1;
                flight
                  .save()
                  .then(() => {
                    return res.status(201).json(booking);
                  })
                  .catch((error) => {
                    console.log(error);
                    return res
                      .status(500)
                      .json({ error: "unable to update flight count" });
                  });
              })
              .catch((error) => {
                console.log(error);
                return res
                  .status(500)
                  .json({ error: "unable to create new booking" });
              });
          } else return res.status(401).json({ error: "unauthorized user" });
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(500)
            .json({ error: "unable to create new booking" });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to create new booking" });
    });
};

//Remove booking
exports.deleteBooking = (req, res, next) => {
  const { bookingId } = req?.params;
  const currentUser = req?.user;
  Booking.findById(bookingId)
    .then((booking) => {
      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      Flight.findById(booking?.flightId)
        .then((flight) => {
          if (booking?.userId === currentUser?.id)
            booking
              .deleteOne()
              .then(() => {
                flight.flightCount -= 1;
                flight
                  .save()
                  .then(() => {
                    return res.status(204).json({ message: "Data deleted" });
                  })
                  .catch((error) => {
                    console.log(error);
                    return res
                      .status(500)
                      .json({ error: "unable to update flight count" });
                  });
              })
              .catch((error) => {
                console.log(error);
                return res
                  .status(500)
                  .json({ error: "unable to delete flight" });
              });
          else return res.status(401).json({ message: "unauthorized access" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: "unable to delete flight" });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to delete flight" });
    });
};

//Edit Booking
exports.updateBooking = (req, res, next) => {
  const { bookingId } = req?.params;
  const currentUser = req?.user;
  const data = req?.body;
  Booking.findById(bookingId)
    .then((booking) => {
      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      if (booking?.userId === currentUser?.id)
        booking
          .updateOne(data, { new: true })
          .then((response) => {
            if (response?.acknowledged)
              return res.status(200).json({ message: "Updated" });
            else
              return res.status(500).json({ error: "unable to update flight" });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: "unable to update flight" });
          });
      else return res.status(401).json({ message: "unauthorized access" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "unable to update flight" });
    });
};
