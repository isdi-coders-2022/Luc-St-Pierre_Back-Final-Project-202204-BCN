const express = require("express");
const { userRegistration } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", userRegistration);

module.exports = router;
