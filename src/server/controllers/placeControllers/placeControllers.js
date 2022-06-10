/* eslint-disable consistent-return */
const debug = require("debug")("airbnb:server:controllers:place");
const chalk = require("chalk");
const path = require("path");

const Place = require("../../../db/models/Place");
const User = require("../../../db/models/User");
const customError = require("../../../utils/customError");

const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({});
    debug(chalk.green(`Here's all the places: ${places}`));

    res.status(200).json({ places });
  } catch {
    const error = customError(400, "Bad request");
    next(error);
  }
};

const createPlace = async (req, res, next) => {
  const { userId: id, newImageName, firebaseFileURL } = req;

  const { file } = req;

  const {
    title,
    description,
    address,
    city,
    placeType,
    placeDescription,
    price,
    numberOfRooms,
    numberOfBeds,
    numberOfGuests,
    country,
    rating,
    kilometers,
    category,
  } = req.body;

  try {
    const user = await User.findById(id);

    const newCreatedPlace = {
      title,
      description,
      image: file ? path.join("images", newImageName) : "",
      imageBackup: file ? firebaseFileURL : "",
      address,
      city,
      placeType,
      placeDescription,
      price,
      numberOfRooms,
      numberOfBeds,
      numberOfGuests,
      country,
      creator: user.id,
      rating,
      kilometers,
      category,
    };

    if (!user) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
    }

    const newAddedPlace = await Place.create(newCreatedPlace);

    debug(
      chalk.green(
        `A place has been created with creator: ${newCreatedPlace.creator}`
      )
    );

    user.places.push(newAddedPlace);

    const userUpdated = await User.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (userUpdated) {
      debug(chalk.green(`Added newly created place to user: ${user.name}`));
    }

    res.status(201).json(newAddedPlace);
  } catch (error) {
    error.code = 400;
    error.message = "bad request";
    next(error);
  }
};

module.exports = { createPlace, getAllPlaces };
