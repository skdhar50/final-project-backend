const { Schema, model } = require("mongoose");

module.exports.Brand = model("Brand", Schema({}, { timestamps: true }));
