require("dotenv").config();
const debug = require("debug")("airbnb:server:initializeServer");
const chalk = require("chalk");
const app = require(".");

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

module.exports = initializeServer;
