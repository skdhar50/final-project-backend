require("express-async-errors");
const error = require("./middlewares/error");
const app = require("express")();
const express = require("express");
const compression = require("compression");
const cors = require("cors");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

require("./middlewares/")(app);
require("./middlewares/routes")(app);

app.use(error);
app.use("/public", express.static("public"));
app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(compression);

module.exports = app;
