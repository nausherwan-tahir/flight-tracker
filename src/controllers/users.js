const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET_KEY } = require("../utils/default");

//Add new user
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, email, password, role, country } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ email })
    .then((user) => {
      // See if user already exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // create a new user
      user = new User({
        name,
        email,
        password,
        role,
        country,
      });
      // Encrypt Password
      bcrypt.genSalt(10).then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((hash) => {
            user.password = hash;
            user.save();
            // Return JWT
            const payload = {
              user: {
                id: user.id,
              },
            };
            jwt.sign(
              payload,
              JWT_SECRET_KEY,
              { expiresIn: 3600000000000000 },
              (err, token) => {
                if (err) throw err;
                return res.status(201).json({ token });
              }
            );
          })
          .catch((err) => {
            console.log(err.message);
            return res.status(500).send("Server error");
          });
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("Server error");
    });
};

//Authenticate user & sing in
exports.signIn = (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ email })
    .then((user) => {
      // See if user does not exist
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Compare Password with encrypted one
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        // Return JWT
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          JWT_SECRET_KEY,
          { expiresIn: 3600000000000000 },
          (err, token) => {
            if (err) throw err;
            console.log(token);
            return res.json({ token });
          }
        );
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server error");
    });
};
