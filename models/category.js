const { Schema, model } = require("mongoose");

module.exports.Category = model("Category", Schema({}, { timestamps: true }));
