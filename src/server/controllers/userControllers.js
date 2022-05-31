const debug = require("debug")("airbnb:server:controllers:user");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = User.findOne({ username });

  if (!user) {
    debug(chalk.red("username or password invalid"));
    const error = customError(403, "Forbidden", "username or password invalid");
    next(error);
  }

  const userToken = {
    id: user.id,
    name: user.name,
    username: user.username,
    image: user.image,
  };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    debug(chalk.red("username or password invalid"));
    const error = customError(403, "Forbidden", "username or password invalid");
    next(error);
  }

  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).json({ token, id: user.id });
};

module.exports = { userRegister, userLogin };
