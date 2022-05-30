const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

module.exports = app;
