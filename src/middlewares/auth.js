const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../utils/default");
// const config = require("config");

module.exports = function (req, res, next) {
  // Get Token from header
  const token = req.header("x-auth-token");
  // Check if Token does not exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify Token
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded.user; //The user requesting is equal to the id of payload
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
};
