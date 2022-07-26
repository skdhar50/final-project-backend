require("express-async-errors");
const error = require("./middlewares/error");
const app = require("express")();
const express = require("express");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

require("./middlewares/")(app);
require("./middlewares/routes")(app);


app.use("/test", (req, res) => {
	res.json({
		data: req.body.photo,
	});
});

app.use(error);
// app.use('/storages', express.static('storages'))
app.use("/public", express.static("public"));

module.exports = app;
