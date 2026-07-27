const express = require("express");
const router = express.Router();

router.get("/signup", signUpController.getSignupForm);
router.post("/signup", signUpController.createUser);

module.exports = router;
