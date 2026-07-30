const express = require("express");
const router = express.Router();

const ensureAuthentication = require("../controllers/middleware/ensureAuthentication");
const userController = require("../controllers/userController");
const updateUserValidation = require("../validation/updateUserValidation");

router.get("/", ensureAuthentication, userController.getUserInfo);

router.get("/update", ensureAuthentication, userController.getUpdateUserForm);

router.post(
  "/update",
  ensureAuthentication,
  updateUserValidation,
  userController.updateUserInfo,
);

router.post("/delete", ensureAuthentication, userController.deleteUser);

module.exports = router;
