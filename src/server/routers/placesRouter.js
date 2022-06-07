const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createPlace,
  getAllPlaces,
} = require("../controllers/placeControllers");
const auth = require("../middlewares/auth");

const router = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 3000000,
  },
});

router.get("/places", auth, getAllPlaces);
router.post("/places", auth, upload.single("image"), createPlace);

module.exports = router;
