const express = require("express");
const signupValidation = require("../validation/signupValidation");
const router = express.Router();

router.get("/signup", signUpController.getSignupForm);
router.post("/signup", signupValidation, signUpController.createUser);

module.exports = router;
