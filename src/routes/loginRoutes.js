const express = require("express");
const router = express.Router();

router.get("/login", loginController.getLoginForm);
router.post("/login", loginController.loginUser);

module.exports = router;
