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

    res.status(200).json({ places });
  } catch {
    const error = customError(400, "Bad request");
    next(error);
  }
};

const createPlace = async (req, res, next) => {
  const { userId: id, firebaseFileURL, uploadedFiles } = req;

  const { lat, lon, ...place } = req.body;
  const { file } = req;
  try {
    const user = await User.findById(id);
    const newCreatedPlace = {
      ...place,
      location: {
        type: "Point",
        coordinates: [lat, lon],
      },
      creator: user.id,
      image: uploadedFiles.map((uploadedFile) => ({
        ...uploadedFile,
        fileName: path.join("images", uploadedFile.fileName),
      })),
      imageBackup: file ? firebaseFileURL : "",
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
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Error while trying to create a place"
    );
    next(error);
  }
};

const deletePlace = async (req, res, next) => {
  const { userId } = req;
  const { placeId } = req.params;

  try {
    const deletedPlace = await Place.findByIdAndDelete(placeId);

    if (deletedPlace) {
      const updatedPlaces = await User.findByIdAndUpdate(
        userId,
        { $pull: { places: placeId } },
        { new: true }
      );
      if (updatedPlaces) {
        debug(chalk.green(`Place ${placeId} deleted from user database`));
      }
    }
    res.status(204).json(deletedPlace);
    return;
  } catch {
    const error = customError(404, "Bad request", "Place id not found");
    next(error);
  }
};

const updatePlace = async (req, res, next) => {
  const { placeId } = req.params;
  const { lat, lon } = req.body;
  let place = req.body;
  delete place.lat;
  delete place.lon;
  const { file, uploadedFiles, firebaseFileURL } = req;
  debug(chalk.greenBright(`Request to update ${placeId} place Id`));

  try {
    if (file) {
      place = {
        ...place,
        image: uploadedFiles
          ? uploadedFiles.map((uploadedFile) => ({
              ...uploadedFile,
              fileName: path.join("images", uploadedFile.fileName),
            }))
          : place.image,
        imageBackup: file ? firebaseFileURL : "",
      };
    }

    delete place.image;

    const updatedPlace = await Place.findByIdAndUpdate(placeId, place, {
      new: true,
    });

    if (lat && lon) {
      updatedPlace.location = {
        type: "Point",
        coordinates: [lat, lon],
      };
    }

    debug(chalk.green(`Place ${placeId} Id updated`));
    res.status(200).json({ updatedPlace });
  } catch {
    const error = customError(404, "Bad request", "Place Id not found");
    next(error);
  }
};

module.exports = { createPlace, getAllPlaces, deletePlace, updatePlace };
