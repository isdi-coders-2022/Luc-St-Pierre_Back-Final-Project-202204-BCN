require("dotenv").config();
const debug = require("debug")("airbnb:src");
const chalk = require("chalk");

const connectDB = require("./db/index");

const initializeServer = require("./server");

const port = process.env.SERVER_PORT || 4040;
const mongoDbUri = process.env.MONGODB_URI;

(async () => {
  try {
    await connectDB(mongoDbUri);
    await initializeServer(port);
  } catch (error) {
    debug(chalk.red(`Error: ${error.message}`));
  }
})();
