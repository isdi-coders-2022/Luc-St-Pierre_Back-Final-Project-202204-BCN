const debug = require("debug")("airbnb:server:controllers:user");
const chalk = require("chalk");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/User");
const customError = require("../../utils/customError");
const encryptPassword = require("../../utils/encryptPassword");

const userRegister = async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const { file, newImageName, firebaseFileURL } = req;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const error = customError(
        409,
        "bad request",
        `Username ${username} already exists!`
      );
      next(error);
      return;
    }

    const encryptedPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      username,
      email,
      image: file ? path.join("images", newImageName) : "",
      imageBackup: file ? firebaseFileURL : "",
      password: encryptedPassword,
    });

    debug(chalk.green(`user has been created with username: ${username}`));

    res.status(201).json(newUser);
  } catch {
    const error = customError(400, "Bad request", "invalid user data");
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
      return;
    }

    const userToken = {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
      imageBackup: user.imageBackup,
    };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
      return;
    }

    const token = jwt.sign(userToken, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister, userLogin };
