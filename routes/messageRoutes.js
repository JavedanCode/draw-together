const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const ensureAuthentication = require("../controllers/middleware/ensureAuthentication");
const ensureMessageOwner = require("../controllers/middleware/ensureMessageOwner");

//GET ALL MESSAGES
router.get("/", messageController.getAllMessages);
//GET USER MESSAGES
router.get("/mine", ensureAuthentication, messageController.getUserMessages);

//GET MESSAGE FORM
router.get("/new", ensureAuthentication, messageController.getMessageForm);

//GET UPDATE FORM
router.get(
  "/:id/update",
  ensureAuthentication,
  messageController.getUpdateMessageForm,
);

//POST NEW MESSAGE
router.post("/", ensureAuthentication, messageController.addMessage);

//POST UPDATED MESSAGE
router.post(
  "/:id/update",
  ensureAuthentication,
  ensureMessageOwner,
  messageController.updateMessage,
);

//DELETE
router.post(
  "/:id/delete",
  ensureAuthentication,
  ensureMessageOwner,
  messageController.deleteMessage,
);

module.exports = router;
