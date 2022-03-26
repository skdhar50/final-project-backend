const { Schema, model } = require("mongoose");

module.exports.Review = model("Review", Schema({}, { timestamps: true }));
