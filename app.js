require("express-async-errors");
const error = require("./middlewares/error");
const app = require("express")();
const express = require("express");

require("./middlewares/")(app);
require("./middlewares/routes")(app);

app.use("/test", (req, res) => {
	res.json({
		m: "mm",
	});
});

app.use(error);
app.use('/storages', express.static('storages'))
// app.use(express.static('public'))

module.exports = app;
