/* eslint-disable consistent-return */
const debug = require("debug")("airbnb:server:controllers:user");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/User");
const customError = require("../../utils/customError");
const encryptPassword = require("../../utils/encryptPassword");

const userRegister = async (req, res, next) => {
  const { name, username, email, location, password } = req.body;
  const { file } = req;

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
    const prefixImage = Date.now();
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

    const encryptedPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      username,
      email,
      location,
      image: file ? path.join("images", newImageName) : "",
      password: encryptedPassword,
    });

    debug(chalk.green(`user has been created with username: ${username}`));

    res.status(201).json({ new_user: { username: newUser.username } });
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
    }

    const userToken = {
      id: user.id,
      name: user.name,
      username,
    };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    debug(chalk.red(`isPasswordCorrect ${isPasswordCorrect}`));

    if (!isPasswordCorrect) {
      debug(chalk.red("username or password invalid"));
      const error = customError(
        403,
        "Forbidden",
        "username or password invalid"
      );
      next(error);
    }

    const token = jwt.sign(userToken, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    debug(chalk.red(`token ${token}`));

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister, userLogin };
