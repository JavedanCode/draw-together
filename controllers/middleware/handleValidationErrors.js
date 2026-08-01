const { validationResult } = require("express-validator");

const handleValidationErrors = (view, title, openSection) => {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(view, {
        title,

        errors: errors.array(),

        oldInput: req.body,

        user: req.user,

        openSection,
      });
    }

    next();
  };
};

module.exports = handleValidationErrors;
