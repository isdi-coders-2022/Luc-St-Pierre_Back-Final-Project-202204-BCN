const express = require("express");
const getPlaceById = require("../../controllers/placeController/placeController");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/:placeId", auth, getPlaceById);

module.exports = router;
