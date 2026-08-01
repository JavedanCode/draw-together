const { body } = require("express-validator");
const prisma = require("../db/prisma");

const updateUsernameValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .bail()
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
];

module.exports = updateUsernameValidation;
