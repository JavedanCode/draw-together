const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const passport = require("passport");

router.get("/", loginController.getLoginForm);
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  loginController.loginUser,
);

module.exports = router;
