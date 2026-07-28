const getLoginForm = (req, res) => {
  res.render("login", { title: "Login" });
};

const loginUser = async (req, res) => {
  res.redirect("/");
};

module.exports = {
  getLoginForm,
  loginUser,
};
