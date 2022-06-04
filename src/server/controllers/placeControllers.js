/* eslint-disable consistent-return */
const debug = require("debug")("airbnb:server:controllers:place");
const chalk = require("chalk");

const Place = require("../../db/models/Place");
const User = require("../../db/models/User");
const customError = require("../../utils/customError");

const createPlace = async (req, res, next) => {
  const {
    title,
    description,
    address,
    city,
    placeType,
    price,
    numberOfRooms,
    numberOfbeds,
    numberOfGuests,
    creator,
  } = req.body;

  try {
    const place = await Place.findOne({ creator });

    if (place) {
      const error = customError(
        409,
        "bad request",
        `Place ${place} already exists!`
      );
      next(error);
    }

    const createdPlace = await Place.create({
      title,
      description,
      location: { lat: 41.390205, lng: 2.154007 },
      address,
      city,
      placeType,
      price,
      numberOfRooms,
      numberOfbeds,
      numberOfGuests,
      image: "",
      creator,
    });

    const user = await User.findOne({ creator });

    if (!user) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
    }

    debug(chalk.green(`A place has been created with creator: ${creator}`));

    return res.status(201).json(createdPlace);
  } catch (error) {
    error.code = 400;
    error.message = "bad request";
    next(error);
  }
};

module.exports = { createPlace };
