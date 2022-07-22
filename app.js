require("express-async-errors");
const error = require("./middlewares/error");
const app = require("express")();
const express = require("express");
const compression = require("compression");
const cors = require("cors");

require("./middlewares/")(app);
require("./middlewares/routes")(app);

app.use(error);
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression);

module.exports = app;
