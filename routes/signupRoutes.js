const express = require("express");
const router = express.Router();

const signupValidation = require("../validation/signupValidation");
const signupController = require("../controllers/signupController");

router.get("/", signupController.getSignupForm);
router.post("/", signupValidation, signupController.createUser);

module.exports = router;
