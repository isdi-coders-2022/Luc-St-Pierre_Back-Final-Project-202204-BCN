const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const userRouter = require("./routers/userRouter");
const usersRouter = require("./routers/usersRouter");
const placesRouter = require("./routers/placesRouter");

const { notFoundError, generalError } = require("./middlewares/errors");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static("uploads"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/users", usersRouter);
app.use("/places", placesRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
