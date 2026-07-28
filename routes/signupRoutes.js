const express = require("express");
const router = express.Router();

const signupValidation = require("../validation/signupValidation");
const signupController = require("../controllers/signupController");

router.get("/signup", signupController.getSignupForm);
router.post("/signup", signupValidation, signupController.createUser);

module.exports = router;
