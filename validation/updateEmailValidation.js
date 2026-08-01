const { body } = require("express-validator");
const prisma = require("../db/prisma");

const updateEmailValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
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
];

module.exports = updateEmailValidation;
