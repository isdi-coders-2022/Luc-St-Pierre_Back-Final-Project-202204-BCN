const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const { createPlace } = require("../controllers/placeControllers");

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 3000000,
  },
});

router.post("/places", upload.single("image"), createPlace);

module.exports = router;
