const debug = require("debug")("airbnb:server:controllers:user");
const chalk = require("chalk");

const User = require("../../db/models/User");
const customError = require("../../utils/customError");
const encryptPassword = require("../../utils/encryptPassword");

const userRegister = async (req, res, next) => {
  const { name, username, password, email, image } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    const error = customError(
      409,
      "bad request",
      `Username ${username} already exists!`
    );
    next(error);
  }

  try {
    const encryptedPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      username,
      password: encryptedPassword,
      email,
      image,
    });

    debug(chalk.green(`user has been created with username: $${username}`));

    res.status(201).json(newUser);
  } catch (error) {
    error.code = 400;
    error.message = "bad request";
    next(error);
  }
};

module.exports = { userRegister };
