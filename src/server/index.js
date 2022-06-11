const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const userRouter = require("./routers/userRouter/userRouter");
const usersRouter = require("./routers/usersRouter/usersRouter");
const placesRouter = require("./routers/placesRouter/placesRouter");
const placeRouter = require("./routers/placeRouter/placeRouter");

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
app.use("/hosts", placesRouter);
app.use("/places", placeRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
