const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createPlace,
  getAllPlaces,
} = require("../controllers/placeControllers");
const auth = require("../middlewares/auth");
const imageConverter = require("../middlewares/imageConverter");

const router = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 3000000,
  },
});

router.get("/", auth, getAllPlaces);
router.post("/", auth, upload.single("image"), imageConverter, createPlace);

module.exports = router;
