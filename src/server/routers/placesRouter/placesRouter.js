const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createPlace,
  getAllPlaces,
  deletePlace,
  updatePlace,
} = require("../../controllers/placesControllers/placesControllers");
const auth = require("../../middlewares/auth");
const imagePlacesConverter = require("../../middlewares/imagePlacesConverter");

const router = express.Router();

const uploadPlace = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 5000000,
  },
});

router.get("/places", getAllPlaces);
router.post(
  "/places",
  auth,
  uploadPlace.array("image"),
  imagePlacesConverter,
  createPlace
);
router.delete("/places/:placeId", auth, deletePlace);
router.put(
  "/places/:placeId",
  auth,
  uploadPlace.array("image"),
  imagePlacesConverter,
  updatePlace
);

module.exports = router;
