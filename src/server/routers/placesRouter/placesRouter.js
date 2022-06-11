const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createPlace,
  getAllPlaces,
  deletePlace,
} = require("../../controllers/placesControllers/placesControllers");
const auth = require("../../middlewares/auth");
const imageConverter = require("../../middlewares/imageConverter");

const router = express.Router();

const uploadPlace = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 5000000,
  },
});

router.get("/places", auth, getAllPlaces);
router.post(
  "/places",
  auth,
  uploadPlace.single("image"),
  imageConverter,
  createPlace
);
router.delete("/places/:placeId", auth, deletePlace);

module.exports = router;
