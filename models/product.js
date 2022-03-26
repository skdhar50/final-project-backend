const { Schema, model } = require("mongoose");

module.exports.Product = model("Product", Schema({}, { timestamps: true }));
