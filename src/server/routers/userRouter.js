const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");

const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../../schemas/userSchemaValidation");

const { userRegister, userLogin } = require("../controllers/userControllers");

const router = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 3000000,
  },
});

router.post(
  "/register",
  upload.single("image"),
  validate(registerValidationSchema),
  userRegister
);
router.post("/login", validate(loginValidationSchema), userLogin);

module.exports = router;
