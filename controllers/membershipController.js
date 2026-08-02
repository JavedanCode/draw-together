const membershipQueries = require("../db/queries/membershipQueries");

const getMembershipForm = (req, res) => {
  res.render("membership", {
    title: "Become a Member",
    user: req.user,
    error: null,
    oldInput: {},
  });
};

const makeUserMember = async (req, res, next) => {
  try {
    if (req.user.featuredMember) {
      return res.render("membership", {
        title: "Become a Member",
        user: req.user,
        error: "You're already a Featured Member.",
        oldInput: {},
      });
    }

    if (process.env.MEMBER_CODE !== req.body.memberCode) {
      return res.status(400).render("membership", {
        title: "Become a Member",
        user: req.user,
        error: "The member code is incorrect.",
        oldInput: req.body,
      });
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
