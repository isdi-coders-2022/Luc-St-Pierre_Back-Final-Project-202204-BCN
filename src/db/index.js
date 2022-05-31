const debug = require("debug")("airbnb:src:db");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (mongoUriString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        const newReturnedJSON = { ...ret };
        // eslint-disable-next-line no-underscore-dangle
        delete newReturnedJSON._id;
        // eslint-disable-next-line no-underscore-dangle
        delete newReturnedJSON.__v;

        return newReturnedJSON;
      },
    });
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
