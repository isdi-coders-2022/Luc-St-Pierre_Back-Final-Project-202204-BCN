const User = require("../../db/models/User");
const customError = require("../../utils/customError");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    const usersList = users.map((user) => {
      const { id, username, email, location, image, places, wishlists } = user;
      return { id, username, email, location, image, places, wishlists };
    });

    res.status(200).json(usersList);
  } catch {
    const error = customError(404, "Not found");
    next(error);
  }
};

module.exports = { getAllUsers };
