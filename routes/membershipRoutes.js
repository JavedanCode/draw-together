const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");
const ensureAuthentication = require("../controllers/authMiddleware");

router.get("/", ensureAuthentication, membershipController.getMembershipForm);
router.post("/", ensureAuthentication, membershipController.makeUserMember);

module.exports = router;
