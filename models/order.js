const { Schema, model } = require("mongoose");

module.exports.Order = model("Order", Schema({}, { timestamps: true }));

