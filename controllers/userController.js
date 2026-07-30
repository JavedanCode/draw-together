const userQueries = require("../db/queries/userQueries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const getUserInfo = async (req, res, next) => {
  try {
    const user = await userQueries.getUserInfoQuery(req.user.id);

    return res.render("userDetails", { title: "Account Information", user });
  } catch (err) {
    next(err);
  }
};

const getUpdateUserForm = (req, res) => {
  return res.render("updateUser", {
    title: "Update User Info",
    errors: [],
    oldInput: {},
  });
};

const updateUserInfo = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("updateUser", {
      title: "Update User Info",
      errors: errors.array(),
      oldInput: req.body,
    });
  }
  const { email, username, password } = req.body;

  const data = {};

  if (email) {
    data.email = email;
  }

  if (username) {
    data.username = username;
  }

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  if (Object.keys(data).length === 0) {
    return res.redirect("/user");
  }
  try {
    await userQueries.updateUserInfoQuery(req.user.id, data);
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userQueries.deleteUserQuery(req.user.id);
    req.logout((err) => {
      if (err) return next(err);

      return res.redirect("/login");
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserInfo,
  getUpdateUserForm,
  updateUserInfo,
  deleteUser,
};
