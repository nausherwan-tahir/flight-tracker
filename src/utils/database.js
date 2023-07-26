const mongoose = require("mongoose");
const username = "daniyallatif4";
const password = "RiVlsgUugt53VGuK";
const cluster = "clustertest1.ola3bpe";
const dbname = "flightTracker";

const run = () => {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};

module.exports = run;
