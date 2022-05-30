require("dotenv").config();
const debug = require("debug")("airbnb:server");
const chalk = require("chalk");
const cors = require("cors");

const express = require("express");
const morgan = require("morgan");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening on port ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug(chalk.red("Error on server"));
      reject(error);

      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} already in use `));
      }
    });
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

module.exports = initializeServer;
