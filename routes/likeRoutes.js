const express = require("express");
const router = express.Router();

const ensureAuthentication = require("../controllers/middleware/ensureAuthentication");
const likeController = require("../controllers/likeController");

router.post("/:id", ensureAuthentication, likeController.toggleLike);

module.exports = router;
