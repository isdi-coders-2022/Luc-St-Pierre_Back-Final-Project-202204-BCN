const express = require("express");
const { createPlace } = require("../controllers/placeControllers");

const router = express.Router();

router.post("/places", createPlace);

module.exports = router;
