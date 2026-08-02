const likeQueries = require("../db/queries/likeQueries");

const toggleLike = async (req, res, next) => {
  try {
    const result = await likeQueries.toggleLikeQuery(
      req.user.id,
      req.params.id,
    );

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  toggleLike,
};
