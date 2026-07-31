const membershipQueries = require("../db/queries/membershipQueries");

const getMembershipForm = (req, res) => {
  res.render("membership", { title: "Become a member" });
};

const makeUserMember = async (req, res, next) => {
  try {
    if (req.user?.featuredMember) {
      const err = new Error("You're already a member.");
      err.status = 409;
      throw err;
    }

    if (process.env.MEMBER_CODE !== req.body.memberCode) {
      const err = new Error("The code you entered is incorrect.");
      err.status = 409;
      throw err;
    }
    await membershipQueries.updateMembershipQuery(req.user.id);
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMembershipForm,
  makeUserMember,
};
