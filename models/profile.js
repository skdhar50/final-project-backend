const { Schema, model } = require("mongoose");

module.exports.Profile = model("Profile", Schema({}, { timestamps: true }));
