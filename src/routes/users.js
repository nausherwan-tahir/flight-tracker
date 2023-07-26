var express = require("express");
var router = express.Router();
const userController = require("../controllers/users");
const { check } = require("express-validator");

/* Signin route */
router.post("/signin", userController.signIn);

/* Signup route */
router.post(
  "/",
  [
    check("email", "Invalid Email").isEmail(),
    check("name", "First Name is required").not().isEmpty(),
    check("password", "Please enter a password with atleast 6 digits").isLength(
      { min: 6 }
    ),
  ],
  userController.signUp
);

module.exports = router;
