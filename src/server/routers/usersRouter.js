const express = require("express");
const { validate } = require("express-validation");
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../../schemas/userSchemaValidation");

const { userRegister, userLogin } = require("../controllers/userControllers");
const { getAllUsers } = require("../controllers/usersControllers");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", validate(registerValidationSchema), userRegister);
router.post("/login", validate(loginValidationSchema), userLogin);

module.exports = router;
