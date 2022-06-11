const Place = require("../../../db/models/Place");
const customError = require("../../../utils/customError");

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;

  try {
    const placeDetail = await Place.findById(placeId);

    res.status(200).json({ placeDetail });
  } catch {
    const error = customError(404, "Not found", "User Id not found");
    next(error);
  }
};

module.exports = getPlaceById;
