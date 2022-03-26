const { Schema, model } = require("mongoose");

module.exports.Offer = model("Offer", Schema({}, { timestamps: true }));

