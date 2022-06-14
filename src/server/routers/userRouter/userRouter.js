const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");

const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../../../schemas/userSchemaValidation");
const {
  userRegister,
  userLogin,
} = require("../../controllers/userControllers/userControllers");

const imageConverter = require("../../middlewares/imageConverter");

const router = express.Router();

const uploadUser = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 3000000,
  },
});

router.post(
  "/register",
  uploadUser.array("image"),
  imageConverter,
  validate(registerValidationSchema),
  userRegister
);
router.post("/login", validate(loginValidationSchema), userLogin);

module.exports = router;
