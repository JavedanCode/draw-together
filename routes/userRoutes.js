const express = require("express");
const router = express.Router();

const ensureAuthentication = require("../controllers/middleware/ensureAuthentication");
const userController = require("../controllers/userController");
const updateUsernameValidation = require("../validation/updateUsernameValidation");
const updateEmailValidation = require("../validation/updateEmailValidation");
const updatePasswordValidation = require("../validation/updatePasswordValidation");
const handleValidationErrors = require("../controllers/middleware/handleValidationErrors");

router.get("/", ensureAuthentication, userController.getUserInfo);

//Removed get user update form
//Separated routes for updating user details.

router.post(
  "/update-username",
  ensureAuthentication,
  updateUsernameValidation,
  handleValidationErrors("profile", "Account Information", "username"),
  userController.updateUsername,
);

router.post(
  "/update-email",
  ensureAuthentication,
  updateEmailValidation,
  handleValidationErrors("profile", "Account Information", "email"),
  userController.updateEmail,
);

router.post(
  "/update-password",
  ensureAuthentication,
  updatePasswordValidation,
  handleValidationErrors("profile", "Account Information", "password"),
  userController.updatePassword,
);

router.post("/delete", ensureAuthentication, userController.deleteUser);

module.exports = router;
