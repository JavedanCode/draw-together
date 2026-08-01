const { body } = require("express-validator");

const updatePasswordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password.")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }

      return true;
    }),
];

module.exports = updatePasswordValidation;
