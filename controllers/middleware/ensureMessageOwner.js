const messageQueries = require("../../db/queries/messageQueries");

const ensureMessageOwner = async (req, res, next) => {
  try {
    const drawing = await messageQueries.getMessageQuery(req.params.id);

    if (!drawing) {
      const err = new Error("Drawing not found.");
      err.status = 404;
      return next(err);
    }

    if (!req.user.admin && drawing.authorId !== req.user.id) {
      const err = new Error("You're not permitted to perform this action.");
      err.status = 403;
      return next(err);
    }

    req.drawing = drawing;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = ensureMessageOwner;
