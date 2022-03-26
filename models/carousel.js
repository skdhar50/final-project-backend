const { Schema, model } = require("mongoose");

module.exports.Carousel = model("Carousel", Schema({}, { timestamps: true }));
