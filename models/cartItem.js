const { Schema, model } = require("mongoose");

module.exports.CartItem = model("CartItem", Schema({}, { timestamps: true }));

