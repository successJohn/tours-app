const express = require("express");
const morgan = require("morgan");


const app = express();

const tourRouter = require("./routes/tourRoutes");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", tourRouter);

module.exports = app;