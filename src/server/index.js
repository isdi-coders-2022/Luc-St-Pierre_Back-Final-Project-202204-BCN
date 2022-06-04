const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const usersRouter = require("./routers/usersRouter");
const placesRouter = require("./routers/placesRouter");

const { notFoundError, generalError } = require("./middlewares/errors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/hosts", placesRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
