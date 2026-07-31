const signupQueries = require("../db/queries/signupQueries");
const { validationResult } = require("express-validator");

const getSignupForm = (req, res) => {
  res.render("signup", { title: "Signup", errors: [], oldInput: {} });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      title: "Signup",
      errors: errors.array(),
      oldInput: req.body,
    });
  }
  const { email, username, password } = req.body;

  const user = {
    email,
    username,
    password,
  };

  try {
    await signupQueries.createUserQuery(user);
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSignupForm,
  createUser,
};
