const messageQueries = require("../../db/queries/messageQueries");

const ensureMessageOwner = async (req, res, next) => {
  try {
    if (req.user.admin) {
      return next();
    }

    const drawing = await messageQueries.getMessageQuery(
      req.user.id,
      req.params.id,
    );

    if (!drawing) {
      const err = new Error("You're not permitted to perform this action.");
      err.status = 403;
      return next(err);
    }

    req.drawing = drawing;

    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = ensureMessageOwner;
