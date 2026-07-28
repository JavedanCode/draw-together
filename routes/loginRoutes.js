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

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

module.exports = router;
