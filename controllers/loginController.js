const passport = require("passport");

const getLoginForm = (req, res) => {
  return res.render("login", {
    title: "Login",
    error: null,
  });
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).render("login", {
        title: "Login",
        error: info.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports = {
  getLoginForm,
  loginUser,
};
