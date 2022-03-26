const { Schema, model } = require("mongoose");

module.exports.User = model("User", Schema({}, { timestamps: true }));
