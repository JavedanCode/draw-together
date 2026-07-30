const { body } = require("express-validator");
const prisma = require("../db/prisma");

const updateUserValidation = [
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .bail()
    .custom(async (email, { req }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== req.user.id) {
        throw new Error("User with this email already exists.");
      }

      return true;
    }),

  body("username")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters.")
    .isAlphanumeric()
    .withMessage("Username may only contain letters and numbers.")
    .bail()
    .custom(async (username, { req }) => {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== req.user.id) {
        throw new Error("Username already exists.");
      }

      return true;
    }),

  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("confirmPassword").custom((value, { req }) => {
    if (req.body.password || value) {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
    }

    return true;
  }),
];

module.exports = updateUserValidation;
