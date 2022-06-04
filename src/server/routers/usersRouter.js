const express = require("express");
const { userRegister, userLogin } = require("../controllers/userControllers");

const loginValidation = require("../middlewares/loginValidation copy");
const registerValidation = require("../middlewares/registerValidation");

const router = express.Router();

router.post("/register", registerValidation, userRegister);
router.post("/login", loginValidation, userLogin);

module.exports = router;
