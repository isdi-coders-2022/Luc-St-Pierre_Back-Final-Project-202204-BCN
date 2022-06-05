/* eslint-disable consistent-return */
const debug = require("debug")("airbnb:server:controllers:place");
const chalk = require("chalk");

const fs = require("fs");
const path = require("path");

const Place = require("../../db/models/Place");
const User = require("../../db/models/User");
const customError = require("../../utils/customError");

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
  const { userId: id } = req;

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

  const { file } = req;
  const prefixImage = Date.now();

  try {
    const newImageName = `${prefixImage}-${file.originalname}`;

    if (file) {
      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newImageName),
        async (error) => {
          if (error) {
            next(error);
          }
        }
      );
    }

    const createdPlace = new Place({
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
      image: file ? path.join("images", newImageName) : "",
      creator,
    });

    const user = await User.findOne({ id });

    if (!user) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
    }

    const savedCreatedPlace = await createdPlace.save();
    debug(chalk.green(`A place has been created with creator: ${creator}`));

    user.places = user.places.concat(savedCreatedPlace.id);

    debug(chalk.green(`Added newly created place to user: ${user.name}`));
    await user.save();

    return res.status(201).json({ place: createdPlace });
  } catch (error) {
    error.code = 400;
    error.message = "bad request";
    next(error);
  }
};

module.exports = { createPlace, getAllPlaces };