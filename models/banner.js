const { Schema, model } = require("mongoose");

module.exports.Banner = model("Banner", Schema({}, { timestamps: true }));
