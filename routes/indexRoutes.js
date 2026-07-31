const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const ensureAuthentication = require("../controllers/middleware/ensureAuthentication");

//GET dashboard
router.get("/", ensureAuthentication, messageController.getAllMessages);

module.exports = router;
