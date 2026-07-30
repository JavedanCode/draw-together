const ensureAdmin = (req, res, next) => {
  if (req.user?.admin) {
    return next();
  }

  const err = new Error("You're not permitted to perform this action.");
  err.status = 403;
  next(err);
};

module.exports = ensureAdmin;
