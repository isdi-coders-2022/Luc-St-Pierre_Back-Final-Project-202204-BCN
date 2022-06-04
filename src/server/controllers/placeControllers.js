/* eslint-disable consistent-return */
const debug = require("debug")("airbnb:server:controllers:place");
const chalk = require("chalk");
const { default: mongoose } = require("mongoose");

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createdPlace = await Place.create(
      [
        {
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
        },
      ],
      { session }
    );

    debug(chalk.green(`A place has been created with creator: ${creator}`));

    const user = await User.findById(creator, { creator }, { session });

    user.places = user.places.concat(createdPlace.id);
    await user.save({ session });

    await session.commitTransaction();

    if (!user) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
    }

    return res.status(201).json({ place: createdPlace });
  } catch (error) {
    await session.abortTransaction();
    // console.log(error);
    error.code = 400;
    error.message = "bad request";
    next(error);
  }
  session.endSession();
};

module.exports = { createPlace };
