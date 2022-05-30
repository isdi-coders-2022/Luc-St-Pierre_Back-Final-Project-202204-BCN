const debug = require("debug")("airbnb:db");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (mongoUriString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoUriString, (error) => {
      if (error) {
        debug(chalk.red("Error while connecting to database"));
        reject(error);
        return;
      }
      debug(chalk.green("Successfull database connection"));
      resolve();
    });
  });

module.exports = connectDB;
