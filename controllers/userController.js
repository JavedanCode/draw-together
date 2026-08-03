const userQueries = require("../db/queries/userQueries");
const bcrypt = require("bcryptjs");

const getUserInfo = async (req, res, next) => {
  try {
    const user = await userQueries.getUserInfoQuery(req.user.id);

    return res.render("profile", {
      title: "Account Information",
      user,
      errors: [],
      oldInput: {},
      openSection: null,
    });
  } catch (err) {
    next(err);
  }
};

const updateUsername = async (req, res, next) => {
  try {
    await userQueries.updateUserInfoQuery(req.user.id, {
      username: req.body.username,
    });
    return res.redirect("/user");
  } catch (err) {
    next(err);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    await userQueries.updateUserInfoQuery(req.user.id, {
      email: req.body.email,
    });
    return res.redirect("/user");
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userQueries.updateUserInfoQuery(req.user.id, {
      password: hashedPassword,
    });
    return res.redirect("/user");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!(await bcrypt.compare(req.body.password, req.user.password))) {
      return res.status(401).render("profile", {
        title: "Account Information",
        user: req.user,
        errors: [
          {
            path: "deletePassword",
            msg: "Incorrect password.",
          },
        ],
        oldInput: {},
        openSection: "delete",
      });
    }

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
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
};
